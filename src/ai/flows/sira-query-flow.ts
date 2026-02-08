'use server';
/**
 * @fileOverview A flow for handling SIRA queries.
 *
 * - askSira - A function that handles the SIRA query process.
 */

import {ai} from '@/ai/genkit';
import { SiraQueryInputSchema, SiraQueryOutputSchema } from '@/ai/schemas/sira-query-schema';
import type { SiraQueryInput, SiraQueryOutput } from '@/ai/schemas/sira-query-schema';

export async function askSira(input: SiraQueryInput): Promise<SiraQueryOutput> {
  return siraQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'siraQueryPrompt',
  input: {schema: SiraQueryInputSchema},
  output: {schema: SiraQueryOutputSchema},
  prompt: `You are SIRA, an expert AI assistant for the SIRA dashboard. Your purpose is to provide concise and accurate information regarding port logistics, shipments, demurrage (surestaries), and customs procedures.

Answer the following user query based on your expertise.

User Query: {{{query}}}

Provide the response in a clear, direct, and helpful manner.
`,
});

const siraQueryFlow = ai.defineFlow(
  {
    name: 'siraQueryFlow',
    inputSchema: SiraQueryInputSchema,
    outputSchema: SiraQueryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
