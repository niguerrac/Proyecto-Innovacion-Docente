import { availableModules } from './data';

export interface ModuleProgress {
    moduleId: string;
    expandedAccordions: string[]; // IDs of expanded accordion items
    completedActivities: string[]; // Indices or texts of checked items
    isCompleted: boolean; // Final button clicked
    isRecommended?: boolean; // Recommended by AI
    calculatedPercentage: number;
    lastUpdated: number;
}

const STORAGE_KEY = 'edu_app_progress';

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

export const getAllProgress = getStoredProgress;

export const saveProgress = (moduleId: string, updates: Partial<ModuleProgress>) => {
    if (typeof window === 'undefined') return;

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

        // Interactive button or final completion counts as 1 significant step if no checklist, 
        // or we can just count "isCompleted" as the final 100% override or a weighted step.
        // Requirement: "todos tienen un boton al final de modulo completado para llegar al 100%"
        // So if isCompleted is true, progress is 100%.

        if (updatedProgress.isCompleted) {
            updatedProgress.calculatedPercentage = 100;
        } else {
            // Calculate partial progress
            // We add 1 for the final completion action itself as a "step" to reach 100%
            const totalPoints = totalSteps + 1;

            let earnedPoints = 0;
            earnedPoints += updatedProgress.expandedAccordions.length;
            earnedPoints += updatedProgress.completedActivities.length;

            updatedProgress.calculatedPercentage = Math.min(Math.round((earnedPoints / totalPoints) * 100), 99);
            // Cap at 99% until they click the finish button
        }
    }

    allProgress[moduleId] = updatedProgress;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));

    // Dispatch a custom event to notify listeners (like the dashboard if it's open, or same page components)
    window.dispatchEvent(new Event('progressUpdated'));

    return updatedProgress;
};

export const getModuleProgress = (moduleId: string): ModuleProgress | null => {
    const all = getStoredProgress();
    return all[moduleId] || null;
};
