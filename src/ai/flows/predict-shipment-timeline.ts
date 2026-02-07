
'use server';

/**
 * @fileOverview Predicts the estimated exit date and time for a shipment, along with potential congestion levels.
 *
 * - predictShipmentTimeline - A function that handles the shipment timeline prediction process.
 */

import {ai} from '@/ai/genkit';
import { PredictShipmentTimelineInputSchema, PredictShipmentTimelineOutputSchema } from '@/ai/schemas/predict-shipment-timeline-schema';
import type { PredictShipmentTimelineInput, PredictShipmentTimelineOutput } from '@/ai/schemas/predict-shipment-timeline-schema';
import { shipmentDetails as allShipments } from '@/lib/dashboard-data';

function getFallbackPrediction(shipmentInfo: string, clientTimeMultiplier: number = 1.0): PredictShipmentTimelineOutput {
  let baseHours: number | undefined;

  const matchingShipment = allShipments.find(shipment => shipmentInfo.includes(shipment.name));
  
  if (matchingShipment) {
    baseHours = matchingShipment.fallbackPredictionHours;
  } else {
    // Default if no match, e.g. to Sucre
    baseHours = allShipments.find(s => s.name === 'Sucre roux de canne')?.fallbackPredictionHours ?? 14;
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
