
"use client";

import { useEffect, useActionState } from "react";
import { Button } from "@/components/ui/button";
import { predictShipmentTimeline } from "@/ai/flows/predict-shipment-timeline";
import type { PredictShipmentTimelineOutput } from "@/ai/schemas/predict-shipment-timeline-schema";
import type { Shipment, WorkflowStep } from "@/lib/dashboard-data";
import { Sparkles, Bot, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const initialState: {
  prediction?: PredictShipmentTimelineOutput;
  error?: string;
} = {};

interface PredictionEngineProps {
  activeShipment: Shipment & { timeRemaining: string, totalTimeRemaining: string };
  workflowSteps: readonly WorkflowStep[];
  clientTimeMultiplier: number;
}

export function PredictionEngine({ activeShipment, workflowSteps, clientTimeMultiplier }: PredictionEngineProps) {
  const [state, formAction, isPredicting] = useActionState(
    async () => {
      try {
        const prediction = await predictShipmentTimeline({
          shipmentDetails: `Goods: ${activeShipment.name} (${activeShipment.weight}), Vessel: ${activeShipment.vessel}`,
          workflowTimeline: `Current stage: ${workflowSteps[activeShipment.activeWorkflowStepIndex].name}`,
          clientTimeMultiplier: clientTimeMultiplier,
        });
        return { prediction };
      } catch (e: any) {
        return { error: e.message || "Failed to get prediction." };
      }
    },
    initialState
  );

  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
          variant: "destructive",
          title: "Prediction Error",
          description: state.error,
      });
    }
  }, [state, toast]);

  const prediction = state.prediction;

  return (
    <div className="border-t border-slate-200/80 pt-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-blue-600" />
        <h3 className="font-semibold text-slate-900">Prédictions de SIRA</h3>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {!prediction ? (
          <div className="flex items-center gap-3 text-slate-500">
            <Bot className="h-5 w-5"/>
            <span>Cliquez pour obtenir les prédictions d'arrivée...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-4 text-sm w-full">
            <div className="font-medium text-slate-600">Sortie estimée : <span className="text-slate-900 font-semibold">{prediction.estimatedExitDate}</span></div>
            <div className="font-medium text-slate-600">Encombrement : <span className="text-slate-900 font-semibold">{prediction.congestionLevel}</span></div>
            {prediction.readyForPickup && (
              <div>
                 <Badge className="bg-green-100 text-green-700 border-green-200 py-1 px-3 text-sm font-semibold">
                    Prêt pour Enlèvement
                </Badge>
              </div>
            )}
          </div>
        )}

        {!prediction && (
          <form action={formAction}>
            <Button 
              type="submit"
              disabled={isPredicting}
              variant="outline"
              className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              {isPredicting ? <Loader2 className="animate-spin mr-2"/> : <Sparkles className="mr-2 h-4 w-4"/>}
              {isPredicting ? 'Analyse en cours...' : 'Lancer Prédiction'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
