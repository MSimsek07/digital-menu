'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting drink pairings for a meal.
 *
 * - suggestDrinkPairing - A function that suggests a drink pairing for a given meal.
 * - SuggestDrinkPairingInput - The input type for the suggestDrinkPairing function.
 * - SuggestDrinkPairingOutput - The return type for the suggestDrinkPairing function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestDrinkPairingInputSchema = z.object({
  mealName: z.string().describe('The name of the meal.'),
});
export type SuggestDrinkPairingInput = z.infer<typeof SuggestDrinkPairingInputSchema>;

const SuggestDrinkPairingOutputSchema = z.object({
  pairingSuggestion: z.string().describe('The suggested drink pairing for the meal, including a brief explanation.'),
});
export type SuggestDrinkPairingOutput = z.infer<typeof SuggestDrinkPairingOutputSchema>;

export async function suggestDrinkPairing(input: SuggestDrinkPairingInput): Promise<SuggestDrinkPairingOutput> {
  return suggestDrinkPairingFlow(input);
}

const suggestDrinkPairingPrompt = ai.definePrompt({
  name: 'suggestDrinkPairingPrompt',
  input: {schema: SuggestDrinkPairingInputSchema},
  output: {schema: SuggestDrinkPairingOutputSchema},
  prompt: `You are an expert sommelier. A customer is asking for a drink pairing for the meal "{{{mealName}}}".

  Suggest an ideal drink (alcoholic or non-alcoholic) that would complement this dish.
  
  Provide a brief, one or two sentence explanation for your suggestion. For example: "For Adana Kebab, I recommend a classic Şalgam. Its sharp, tangy flavor cuts through the richness of the meat."`,
});

const suggestDrinkPairingFlow = ai.defineFlow(
  {
    name: 'suggestDrinkPairingFlow',
    inputSchema: SuggestDrinkPairingInputSchema,
    outputSchema: SuggestDrinkPairingOutputSchema,
  },
  async input => {
    const {output} = await suggestDrinkPairingPrompt(input);
    return output!;
  }
);
