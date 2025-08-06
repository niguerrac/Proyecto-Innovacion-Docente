// src/ai/flows/recommend-learning-modules.ts
'use server';

/**
 * @fileOverview Recommends personalized learning modules based on skill assessment results.
 *
 * - recommendLearningModules - A function that recommends learning modules.
 * - RecommendLearningModulesInput - The input type for the recommendLearningModules function.
 * - RecommendLearningModulesOutput - The return type for the recommendLearningModules function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendLearningModulesInputSchema = z.object({
  assessmentResults: z.record(z.number()).describe('A map of skill categories to assessment scores.'),
  availableModules: z.array(z.object({
    moduleId: z.string().describe('The unique identifier for the module.'),
    title: z.string().describe('The title of the module.'),
    description: z.string().describe('A brief description of the module.'),
    skillCategory: z.string().describe('The skill category the module addresses.'),
  })).describe('A list of available learning modules with their details.'),
});
export type RecommendLearningModulesInput = z.infer<typeof RecommendLearningModulesInputSchema>;

const RecommendLearningModulesOutputSchema = z.array(z.object({
  moduleId: z.string().describe('The unique identifier for the recommended module.'),
  title: z.string().describe('The title of the recommended module.'),
  description: z.string().describe('A brief description of the recommended module.'),
  skillCategory: z.string().describe('The skill category the module addresses.'),
  reason: z.string().describe('The reason why the module is recommended based on the assessment results.'),
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
  prompt: `Based on the user's skill assessment results, recommend a list of learning modules that will help them improve their skills.

Here are the user's assessment results:
{{#each assessmentResults}}
  - {{@key}}: {{this}}
{{/each}}

Here are the available learning modules:
{{#each availableModules}}
  - Module ID: {{this.moduleId}}
    Title: {{this.title}}
    Description: {{this.description}}
    Skill Category: {{this.skillCategory}}
{{/each}}

Recommend modules that address the user's skill gaps, and explain why each module is recommended. Focus recommendations on the areas where the assessment results are lowest.
Ensure the recommendations are tailored to the specific assessment results provided.
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
