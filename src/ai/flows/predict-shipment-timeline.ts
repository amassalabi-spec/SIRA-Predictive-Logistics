
'use server';

/**
 * @fileOverview Predicts the estimated exit date and time for a shipment, along with potential congestion levels.
 *
 * - predictShipmentTimeline - A function that handles the shipment timeline prediction process.
 */

import {ai} from '@/ai/genkit';
import { PredictShipmentTimelineInputSchema, PredictShipmentTimelineOutputSchema } from '@/ai/schemas/predict-shipment-timeline-schema';
import type { PredictShipmentTimelineInput, PredictShipmentTimelineOutput } from '@/ai/schemas/predict-shipment-timeline-schema';

// Base prediction times in hours for the fallback mechanism
const baseFallbackTimes: Record<string, number> = {
  'Sucre roux de canne': 14,
  'Ordinateurs portables': 3,
  'Documents de transit': 0.75, // 45 minutes
  'Huile moteur': 6.75, // 6h 45m
};

function getFallbackPrediction(shipmentDetails: string, clientTimeMultiplier: number = 1.0): PredictShipmentTimelineOutput {
  let baseHours: number | undefined;

  // Find the matching base time
  for (const [key, value] of Object.entries(baseFallbackTimes)) {
    if (shipmentDetails.includes(key)) {
      baseHours = value;
      break;
    }
  }

  // Default if no match
  if (baseHours === undefined) {
    baseHours = baseFallbackTimes['Sucre roux de canne'];
  }

  const finalTotalMinutes = baseHours * 60 * clientTimeMultiplier;
  
  let estimatedExitDate: string;
  if (finalTotalMinutes < 60) {
    estimatedExitDate = `${Math.round(finalTotalMinutes)}min`;
  } else {
    const hours = Math.floor(finalTotalMinutes / 60);
    const minutes = Math.round(finalTotalMinutes % 60);
    estimatedExitDate = minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }

  return {
    estimatedExitDate: estimatedExitDate,
    congestionLevel: 'Modérée', // This can be enhanced later
    readyForPickup: true,
  };
}

export async function predictShipmentTimeline(input: PredictShipmentTimelineInput): Promise<PredictShipmentTimelineOutput> {
  const fallback = getFallbackPrediction(input.shipmentDetails, input.clientTimeMultiplier);

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
  
  Take the client's historical performance (clientTimeMultiplier) into account. A multiplier > 1.0 means they have a history of delays, so the predicted time should be longer. A multiplier of 1.0 means they are reliable.

  If the current workflow stage is 'Contrôle (IA/Douane)' or later, the shipment should be considered ready for pickup.

  Shipment Details: {{{shipmentDetails}}}
  Workflow Timeline: {{{workflowTimeline}}}
  Client Time Multiplier: {{{clientTimeMultiplier}}}

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
