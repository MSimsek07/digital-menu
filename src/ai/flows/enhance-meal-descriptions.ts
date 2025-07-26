'use server';

/**
 * @fileOverview This file defines a Genkit flow for enhancing meal descriptions using AI.
 *
 * - enhanceMealDescription - A function that enhances a given meal description or suggests ingredient pairings.
 * - EnhanceMealDescriptionInput - The input type for the enhanceMealDescription function.
 * - EnhanceMealDescriptionOutput - The return type for the enhanceMealDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceMealDescriptionInputSchema = z.object({
  existingDescription: z.string().describe('The current description of the meal.'),
  mealName: z.string().describe('The name of the meal.'),
});
export type EnhanceMealDescriptionInput = z.infer<typeof EnhanceMealDescriptionInputSchema>;

const EnhanceMealDescriptionOutputSchema = z.object({
  enhancedDescription: z.string().describe('The enhanced description of the meal, adhering to regulations.'),
});
export type EnhanceMealDescriptionOutput = z.infer<typeof EnhanceMealDescriptionOutputSchema>;

export async function enhanceMealDescription(input: EnhanceMealDescriptionInput): Promise<EnhanceMealDescriptionOutput> {
  return enhanceMealDescriptionFlow(input);
}

const checkRegulationsTool = ai.defineTool({
  name: 'checkRegulations',
  description: 'Checks if a given text adheres to local food regulations and health standards.',
  inputSchema: z.object({
    text: z.string().describe('The text to check for regulatory compliance.'),
  }),
  outputSchema: z.boolean().describe('True if the text complies with regulations, false otherwise.'),
}, async (input) => {
  // Placeholder implementation: In a real application, this would involve calling an external API
  // or using a local database to check for compliance.
  // For this example, we'll just return true to simulate compliance.
  return true;
});

const enhanceMealDescriptionPrompt = ai.definePrompt({
  name: 'enhanceMealDescriptionPrompt',
  input: {schema: EnhanceMealDescriptionInputSchema},
  output: {schema: EnhanceMealDescriptionOutputSchema},
  tools: [checkRegulationsTool],
  prompt: `You are a creative marketing expert specializing in food. Your goal is to create an appealing and informative description for the meal "{{{mealName}}}".

  Here is the existing description: "{{{existingDescription}}}".

  Improve this description to make it more engaging for customers, or suggest ingredient pairings that would complement the dish. Ensure that the description is accurate, appetizing, and adheres to all local food regulations and health standards by using the checkRegulations tool before finalizing the description.
  `,
});

const enhanceMealDescriptionFlow = ai.defineFlow(
  {
    name: 'enhanceMealDescriptionFlow',
    inputSchema: EnhanceMealDescriptionInputSchema,
    outputSchema: EnhanceMealDescriptionOutputSchema,
  },
  async input => {
    const {output} = await enhanceMealDescriptionPrompt(input);
    return output!;
  }
);
