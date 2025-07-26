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
  availableDrinks: z.array(z.string()).describe('A list of available drinks to choose from.'),
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
  prompt: `Sen uzman bir sommelier'sin. Bir müşteri "{{{mealName}}}" yemeği için içecek önerisi istiyor.

  Bu yemeği tamamlayacak ideal bir içecek öner. Önerini SADECE aşağıdaki listeden seçebilirsin:
  {{#each availableDrinks}}
  - {{{this}}}
  {{/each}}
  
  Önerin için kısa, bir veya iki cümlelik bir açıklama yap. Örneğin: "Adana Kebabı için klasik bir Şalgam suyu öneririm. Keskin ve mayhoş tadı, etin zenginliğini dengeler."`,
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
