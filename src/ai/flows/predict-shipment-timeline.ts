'use server';

/**
 * @fileOverview Predicts the estimated exit date and time for a shipment, along with potential congestion levels.
 *
 * - predictShipmentTimeline - A function that handles the shipment timeline prediction process.
 */

import {ai} from '@/ai/genkit';
import { PredictShipmentTimelineInputSchema, PredictShipmentTimelineOutputSchema } from '@/ai/schemas/predict-shipment-timeline-schema';
import type { PredictShipmentTimelineInput, PredictShipmentTimelineOutput } from '@/ai/schemas/predict-shipment-timeline-schema';

export async function predictShipmentTimeline(input: PredictShipmentTimelineInput): Promise<PredictShipmentTimelineOutput> {
  return predictShipmentTimelineFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictShipmentTimelinePrompt',
  input: {schema: PredictShipmentTimelineInputSchema},
  output: {schema: PredictShipmentTimelineOutputSchema},
  prompt: `You are an expert logistics operator predicting shipment timelines.

  Based on the shipment details and current workflow timeline, predict the estimated exit date and time, potential congestion levels, and if the shipment is ready for pickup.

  If the current workflow stage is 'Contrôle (IA/Douane)' or later, the shipment should be considered ready for pickup.

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
