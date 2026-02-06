import { z } from 'zod';

export const PredictShipmentTimelineInputSchema = z.object({
  shipmentDetails: z
    .string()
    .describe('Details of the shipment including type of goods, vessel name, and current location.'),
  workflowTimeline: z
    .string()
    .describe('Current status of the shipment in the workflow timeline.'),
});
export type PredictShipmentTimelineInput = z.infer<typeof PredictShipmentTimelineInputSchema>;

export const PredictShipmentTimelineOutputSchema = z.object({
  estimatedExitDate: z.string().describe('The estimated date and time of shipment exit.'),
  congestionLevel: z.string().describe('The predicted congestion level at the exit point.'),
  readyForPickup: z.boolean().describe('Whether the shipment is ready for pickup.'),
});
export type PredictShipmentTimelineOutput = z.infer<typeof PredictShipmentTimelineOutputSchema>;
