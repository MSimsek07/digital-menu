'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting food pairings for a meal.
 *
 * - suggestPairing - A function that suggests a pairing for a given meal.
 * - SuggestPairingInput - The input type for the suggestPairing function.
 * - SuggestPairingOutput - The return type for the suggestPairing function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestPairingInputSchema = z.object({
  mealName: z.string().describe('The name of the meal.'),
  availableItems: z.array(z.string()).describe('A list of all available menu items to choose from.'),
});
export type SuggestPairingInput = z.infer<typeof SuggestPairingInputSchema>;

const SuggestPairingOutputSchema = z.object({
  pairingSuggestion: z.string().describe('The suggested pairing for the meal, including a brief explanation.'),
});
export type SuggestPairingOutput = z.infer<typeof SuggestPairingOutputSchema>;

export async function suggestPairing(input: SuggestPairingInput): Promise<SuggestPairingOutput> {
  return suggestPairingFlow(input);
}

const suggestPairingPrompt = ai.definePrompt({
  name: 'suggestPairingPrompt',
  input: {schema: SuggestPairingInputSchema},
  output: {schema: SuggestPairingOutputSchema},
  prompt: `Sen uzman bir gurmesin. Bir müşteri "{{{mealName}}}" yemeğinin yanına ne iyi gideceğini soruyor.

  Bu yemeği tamamlayacak ideal bir ürün (başka bir yemek, tatlı, veya içecek) öner. Önerini SADECE aşağıdaki listeden seçebilirsin:
  {{#each availableItems}}
  - {{{this}}}
  {{/each}}
  
  Önerin için kısa, bir veya iki cümlelik bir açıklama yap. Örneğin: "Adana Kebabı için klasik bir Şalgam suyu öneririm. Keskin ve mayhoş tadı, etin zenginliğini dengeler." veya "Mercimek çorbasından sonra ana yemek olarak İskender Kebabı harika gider."`,
});

const suggestPairingFlow = ai.defineFlow(
  {
    name: 'suggestPairingFlow',
    inputSchema: SuggestPairingInputSchema,
    outputSchema: SuggestPairingOutputSchema,
  },
  async input => {
    const {output} = await suggestPairingPrompt(input);
    return output!;
  }
);
