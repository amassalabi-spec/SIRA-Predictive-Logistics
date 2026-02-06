import {z} from 'zod';

export const SiraQueryInputSchema = z.object({
  query: z.string().describe("The user's query to SIRA."),
});
export type SiraQueryInput = z.infer<typeof SiraQueryInputSchema>;

export const SiraQueryOutputSchema = z.object({
  response: z.string().describe("SIRA's response to the query."),
});
export type SiraQueryOutput = z.infer<typeof SiraQueryOutputSchema>;
