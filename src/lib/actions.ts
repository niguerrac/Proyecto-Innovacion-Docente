'use server';

import { recommendLearningModules, RecommendLearningModulesInput } from '@/ai/flows/recommend-learning-modules';
import { availableModules } from '@/lib/data';
import { sleep } from './utils';

export async function getRecommendedModules(assessmentResults: Record<string, number>) {
    try {
        if (!process.env.GOOGLE_GENAI_API_KEY) {
            console.error("GOOGLE_GENAI_API_KEY no está definida");
            return { error: "Configuration Error: Falta la API Key. Asegúrate de haber reiniciado el servidor luego de crear el archivo .env.local." };
        }

        const input: RecommendLearningModulesInput = {
            assessmentResults,
            availableModules: availableModules.map(({ moduleId, title, description, skillCategory }) => ({
                moduleId,
                title,
                description,
                skillCategory
            }))
        };

        const recommendations = await recommendLearningModules(input);
        return recommendations;
    } catch (error) {
        console.error("Error getting recommendations:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        return { error: `Error obteniendo recomendaciones: ${errorMessage}` };
    }
}
