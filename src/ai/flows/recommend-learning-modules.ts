// src/ai/flows/recommend-learning-modules.ts
'use server';

/**
 * @fileOverview Recomienda módulos de aprendizaje personalizados basados en los resultados de la evaluación de habilidades.
 *
 * - recommendLearningModules - Una función que recomienda módulos de aprendizaje.
 * - RecommendLearningModulesInput - El tipo de entrada para la función recommendLearningModules.
 * - RecommendLearningModulesOutput - El tipo de retorno para la función recommendLearningModules.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendLearningModulesInputSchema = z.object({
  assessmentResults: z.record(z.number()).describe('Un mapa de categorías de habilidades a puntajes de evaluación.'),
  availableModules: z.array(z.object({
    moduleId: z.string().describe('El identificador único para el módulo.'),
    title: z.string().describe('El título del módulo.'),
    description: z.string().describe('Una breve descripción del módulo.'),
    skillCategory: z.string().describe('La categoría de habilidad que aborda el módulo.'),
  })).describe('Una lista de módulos de aprendizaje disponibles con sus detalles.'),
});
export type RecommendLearningModulesInput = z.infer<typeof RecommendLearningModulesInputSchema>;

const RecommendLearningModulesOutputSchema = z.array(z.object({
  moduleId: z.string().describe('El identificador único para el módulo recomendado.'),
  title: z.string().describe('El título del módulo recomendado.'),
  description: z.string().describe('Una breve descripción del módulo recomendado.'),
  skillCategory: z.string().describe('La categoría de habilidad que aborda el módulo.'),
  reason: z.string().describe('La razón por la que se recomienda el módulo en función de los resultados de la evaluación.'),
}));
export type RecommendLearningModulesOutput = z.infer<typeof RecommendLearningModulesOutputSchema>;

export async function recommendLearningModules(input: RecommendLearningModulesInput): Promise<RecommendLearningModulesOutput> {
  return recommendLearningModulesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendLearningModulesPrompt',
  input: {
    schema: RecommendLearningModulesInputSchema,
  },
  output: {
    schema: RecommendLearningModulesOutputSchema,
  },
  prompt: `Basado en los resultados de la evaluación de habilidades del usuario, recomienda una lista de módulos de aprendizaje que le ayudarán a mejorar sus habilidades.

Estos son los resultados de la evaluación del usuario:
{{#each assessmentResults}}
  - {{@key}}: {{this}}
{{/each}}

Estos son los módulos de aprendizaje disponibles:
{{#each availableModules}}
  - ID del Módulo: {{this.moduleId}}
    Título: {{this.title}}
    Descripción: {{this.description}}
    Categoría de Habilidad: {{this.skillCategory}}
{{/each}}

Recomienda módulos que aborden las brechas de habilidades del usuario y explica por qué se recomienda cada módulo. Centra las recomendaciones en las áreas donde los resultados de la evaluación son más bajos.
Asegúrate de que las recomendaciones se adapten a los resultados específicos de la evaluación proporcionados.
`,
});

const recommendLearningModulesFlow = ai.defineFlow(
  {
    name: 'recommendLearningModulesFlow',
    inputSchema: RecommendLearningModulesInputSchema,
    outputSchema: RecommendLearningModulesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

