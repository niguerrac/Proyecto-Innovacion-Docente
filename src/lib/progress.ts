import { availableModules, SkillCategory } from './data';
import { db, auth } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { getDeviceInfo } from './utils';

export interface ModuleProgress {
    moduleId: string;
    expandedAccordions: string[]; // IDs of expanded accordion items
    completedActivities: string[]; // Indices or texts of checked items
    isCompleted: boolean; // Final button clicked
    isRecommended?: boolean; // Recommended by AI
    calculatedPercentage: number;
    lastUpdated: number;
}

export type AssessmentScores = Record<SkillCategory, { score: number; total: number }>;

export interface AssessmentHistoryItem {
    id: string;
    date: string;
    scores: AssessmentScores;
    deviceInfo?: any;
}

const STORAGE_KEY = 'edu_app_progress';
const HISTORY_KEY = 'assessment_history';

// Firestore Sync Logic
let currentUserId: string | null = null;
let isSyncing = false;
let authInitialized = false;

// Helper to wait for auth
const getUserId = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (currentUserId) return resolve(currentUserId);

        // Timeout after 10 seconds
        const timeout = setTimeout(() => {
            reject(new Error("Auth timeout: Firebase didn't initialize in time. Check if your domain is authorized in Firebase Console."));
        }, 10000);

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                currentUserId = user.uid;
                clearTimeout(timeout);
                unsubscribe();
                resolve(user.uid);
            }
        }, (error) => {
            clearTimeout(timeout);
            unsubscribe();
            console.error("Auth state observer error:", error);
            reject(error);
        });
    });
};

if (typeof window !== 'undefined') {
    onAuthStateChanged(auth, async (user) => {
        authInitialized = true;
        if (user) {
            currentUserId = user.uid;
            await syncData();
        } else {
            signInAnonymously(auth).catch((e) => {
                console.error("Firebase Anonymous Auth Error:", e.code, e.message);
                if (e.code === 'auth/unauthorized-domain') {
                    console.error("IMPORTANT: This domain is not authorized in Firebase Console -> Auth -> Settings -> Authorized Domains.");
                }
            });
        }
    });
}

const syncData = async () => {
    if (!currentUserId || isSyncing) return;
    isSyncing = true;
    try {
        const userDocRef = doc(db, 'users', currentUserId);
        const docSnap = await getDoc(userDocRef);

        const localProgress = getStoredProgress();
        const localHistory = getStoredHistory();

        if (docSnap.exists()) {
            const remoteData = docSnap.data();

            // Merge Progress
            const mergedProgress = { ...(remoteData.progress || {}), ...localProgress };

            // Merge History
            const remoteHistory = remoteData.history || [];
            const historyMap = new Map();
            remoteHistory.forEach((h: any) => historyMap.set(h.id, h));
            localHistory.forEach(h => historyMap.set(h.id, h));
            const mergedHistory = Array.from(historyMap.values());

            // Save merged back to both
            await setDoc(userDocRef, {
                progress: mergedProgress,
                history: mergedHistory,
                lastDeviceInfo: getDeviceInfo(),
                updatedAt: new Date().toISOString()
            }, { merge: true });

            localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedProgress));
            localStorage.setItem(HISTORY_KEY, JSON.stringify(mergedHistory));

            // Notify UI
            window.dispatchEvent(new Event('progressUpdated'));
            window.dispatchEvent(new Event('historyUpdated'));
        } else {
            // First time user, push local to remote
            await setDoc(userDocRef, {
                progress: localProgress,
                history: localHistory,
                deviceInfo: getDeviceInfo(),
                createdAt: new Date().toISOString()
            });
        }
    } catch (e: any) {
        console.error("Firestore Sync failed:", e.code, e.message);
        if (e.code === 'permission-denied') {
            console.error("IMPORTANT: Firestore rules are preventing writes. Check your rules in Firebase Console.");
        }
    } finally {
        isSyncing = false;
    }
};

export const getStoredProgress = (): Record<string, ModuleProgress> => {
    if (typeof window === 'undefined') return {};
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    } catch (error) {
        console.error('Error loading progress:', error);
        return {};
    }
};

export const getStoredHistory = (): AssessmentHistoryItem[] => {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(HISTORY_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error loading history:', error);
        return [];
    }
};

export const getAllProgress = getStoredProgress;

export const saveProgress = async (moduleId: string, updates: Partial<ModuleProgress>): Promise<ModuleProgress> => {
    if (typeof window === 'undefined') {
        return {
            moduleId,
            expandedAccordions: [],
            completedActivities: [],
            isCompleted: false,
            calculatedPercentage: 0,
            lastUpdated: Date.now(),
            ...updates
        } as ModuleProgress;
    }

    const allProgress = getStoredProgress();
    const currentModuleProgress = allProgress[moduleId] || {
        moduleId,
        expandedAccordions: [],
        completedActivities: [],
        isCompleted: false,
        isRecommended: false,
        calculatedPercentage: 0,
        lastUpdated: Date.now(),
    };

    const updatedProgress = {
        ...currentModuleProgress,
        ...updates,
        lastUpdated: Date.now(),
    };

    // Recalculate percentage
    const moduleInfo = availableModules.find(m => m.moduleId === moduleId);
    if (moduleInfo) {
        let totalSteps = 0;

        // Count accordions/steps
        if (moduleInfo.content && typeof moduleInfo.content === 'object' && moduleInfo.content.steps) {
            totalSteps += moduleInfo.content.steps.length;
        }

        // Count interactive checklist items
        if (moduleInfo.content && typeof moduleInfo.content === 'object' && moduleInfo.content.interactive?.checklist) {
            totalSteps += moduleInfo.content.interactive.checklist.length;
        }

        if (updatedProgress.isCompleted) {
            updatedProgress.calculatedPercentage = 100;
        } else {
            // Calculate partial progress
            const totalPoints = totalSteps + 1;

            let earnedPoints = 0;
            earnedPoints += updatedProgress.expandedAccordions.length;
            earnedPoints += updatedProgress.completedActivities.length;

            updatedProgress.calculatedPercentage = Math.min(Math.round((earnedPoints / totalPoints) * 100), 99);
        }
    }

    allProgress[moduleId] = updatedProgress;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
    } catch (e) {
        console.error("Storage error", e);
    }

    // Dispatch a custom event to notify listeners (like the dashboard if it's open, or same page components)
    window.dispatchEvent(new Event('progressUpdated'));

    // Push to Firestore (Wait for auth if needed)
    try {
        const uid = await getUserId();
        const userDocRef = doc(db, 'users', uid);
        await setDoc(userDocRef, {
            progress: allProgress,
            lastDeviceInfo: getDeviceInfo(),
            updatedAt: new Date().toISOString()
        }, { merge: true });
    } catch (e) {
        console.error("Failed to sync progress to Firestore:", e);
    }

    return updatedProgress;
};

export const saveAssessmentHistory = async (newHistoryItem: AssessmentHistoryItem) => {
    if (typeof window === 'undefined') return [];

    // 1. Save locally first
    const history = getStoredHistory();
    const newHistory = [...history, newHistoryItem];
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    window.dispatchEvent(new Event('historyUpdated'));

    // 2. Save to Firestore (Wait for auth if needed)
    try {
        const uid = await getUserId();
        const userDocRef = doc(db, 'users', uid);
        const deviceInfo = getDeviceInfo();

        await setDoc(userDocRef, {
            history: newHistory,
            lastDeviceInfo: deviceInfo,
            updatedAt: new Date().toISOString()
        }, { merge: true });

        console.log("Assessment history saved to Firestore successfully for user:", uid);
    } catch (e) {
        console.error("Failed to save assessment to Firestore:", e);
    }

    return newHistory;
};

export const getModuleProgress = (moduleId: string): ModuleProgress | null => {
    const all = getStoredProgress();
    return all[moduleId] || null;
};
