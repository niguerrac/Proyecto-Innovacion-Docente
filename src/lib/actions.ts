'use server';

import { recommendLearningModules, RecommendLearningModulesInput } from '@/ai/flows/recommend-learning-modules';
import { availableModules } from '@/lib/data';
import { sleep } from './utils';

export async function getRecommendedModules(assessmentResults: Record<string, number>) {
    try {
        const input: RecommendLearningModulesInput = {
            assessmentResults,
            availableModules: availableModules.map(({ moduleId, title, description, skillCategory }) => ({
                moduleId,
                title,
                description,
                skillCategory
            }))
        };
        // Simulate network delay for better UX on loading states
        await sleep(1500); 
        const recommendations = await recommendLearningModules(input);
        return recommendations;
    } catch (error) {
        console.error("Error getting recommendations:", error);
        return { error: 'Failed to get recommendations. Please try again later.' };
    }
}
