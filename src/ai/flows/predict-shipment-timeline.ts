'use server';

/**
 * @fileOverview Predicts the estimated exit date and time for a shipment, along with potential congestion levels.
 *
 * - predictShipmentTimeline - A function that handles the shipment timeline prediction process.
 * - PredictShipmentTimelineInput - The input type for the predictShipmentTimeline function.
 * - PredictShipmentTimelineOutput - The return type for the predictShipmentTimeline function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictShipmentTimelineInputSchema = z.object({
  shipmentDetails: z
    .string()
    .describe('Details of the shipment including type of goods, vessel name, and current location.'),
  workflowTimeline: z
    .string()
    .describe('Current status of the shipment in the workflow timeline.'),
});
export type PredictShipmentTimelineInput = z.infer<typeof PredictShipmentTimelineInputSchema>;

const PredictShipmentTimelineOutputSchema = z.object({
  estimatedExitDate: z.string().describe('The estimated date and time of shipment exit.'),
  congestionLevel: z.string().describe('The predicted congestion level at the exit point.'),
  readyForPickup: z.boolean().describe('Whether the shipment is ready for pickup.'),
});
export type PredictShipmentTimelineOutput = z.infer<typeof PredictShipmentTimelineOutputSchema>;

export async function predictShipmentTimeline(input: PredictShipmentTimelineInput): Promise<PredictShipmentTimelineOutput> {
  return predictShipmentTimelineFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictShipmentTimelinePrompt',
  input: {schema: PredictShipmentTimelineInputSchema},
  output: {schema: PredictShipmentTimelineOutputSchema},
  prompt: `You are an expert logistics operator predicting shipment timelines.

  Based on the shipment details and current workflow timeline, predict the estimated exit date and time, potential congestion levels, and if the shipment is ready for pickup.

  Shipment Details: {{{shipmentDetails}}}
  Workflow Timeline: {{{workflowTimeline}}}

  Provide the output in JSON format.
  `,
});

const predictShipmentTimelineFlow = ai.defineFlow(
  {
    name: 'predictShipmentTimelineFlow',
    inputSchema: PredictShipmentTimelineInputSchema,
    outputSchema: PredictShipmentTimelineOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
