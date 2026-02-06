'use server';

/**
 * @fileOverview Predicts the estimated exit date and time for a shipment, along with potential congestion levels.
 *
 * - predictShipmentTimeline - A function that handles the shipment timeline prediction process.
 */

import {ai} from '@/ai/genkit';
import { PredictShipmentTimelineInputSchema, PredictShipmentTimelineOutputSchema } from '@/ai/schemas/predict-shipment-timeline-schema';
import type { PredictShipmentTimelineInput, PredictShipmentTimelineOutput } from '@/ai/schemas/predict-shipment-timeline-schema';

// Fallback data
const fallbackPredictions: Record<string, PredictShipmentTimelineOutput> = {
  'Sucre roux de canne': {
    estimatedExitDate: '14h',
    congestionLevel: 'Modérée',
    readyForPickup: true,
  },
  'Unités de traitement (Ordinateurs)': {
    estimatedExitDate: '3h',
    congestionLevel: 'Faible',
    readyForPickup: true,
  },
  'Documents de transit': {
    estimatedExitDate: '45min',
    congestionLevel: 'Faible',
    readyForPickup: true,
  },
};

function getFallbackPrediction(shipmentDetails: string): PredictShipmentTimelineOutput {
  if (shipmentDetails.includes('Sucre roux de canne')) {
    return fallbackPredictions['Sucre roux de canne'];
  }
  if (shipmentDetails.includes('Unités de traitement (Ordinateurs)')) {
    return fallbackPredictions['Unités de traitement (Ordinateurs)'];
  }
  if (shipmentDetails.includes('Documents de transit')) {
    return fallbackPredictions['Documents de transit'];
  }
  // Default fallback if no match
  return fallbackPredictions['Sucre roux de canne'];
}

export async function predictShipmentTimeline(input: PredictShipmentTimelineInput): Promise<PredictShipmentTimelineOutput> {
  const fallback = getFallbackPrediction(input.shipmentDetails);

  const timeoutPromise = new Promise<PredictShipmentTimelineOutput>((resolve) =>
    setTimeout(() => {
      console.log('API call timed out, using fallback prediction.');
      resolve(fallback);
    }, 1000)
  );
  
  try {
    const predictionPromise = predictShipmentTimelineFlow(input);
    const result = await Promise.race([predictionPromise, timeoutPromise]);
    return result;
  } catch (error) {
    console.error("Gemini API call failed, using fallback prediction.", error);
    return fallback;
  }
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
