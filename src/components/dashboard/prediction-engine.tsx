"use client";

import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import { predictShipmentTimeline, type PredictShipmentTimelineOutput } from "@/ai/flows/predict-shipment-timeline";
import { activeShipment, workflowSteps } from "@/lib/dashboard-data";
import { Sparkles, Bot, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialState: {
  prediction?: PredictShipmentTimelineOutput;
  error?: string;
} = {};

export function PredictionEngine() {
  const [state, formAction] = useFormState(
    async () => {
      try {
        const prediction = await predictShipmentTimeline({
          shipmentDetails: `Goods: ${activeShipment.name} (${activeShipment.weight}), Vessel: ${activeShipment.vessel}`,
          workflowTimeline: `Current stage: ${workflowSteps.find(s => s.status === 'active')?.name}`,
        });
        return { prediction };
      } catch (e: any) {
        return { error: e.message || "Failed to get prediction." };
      }
    },
    initialState
  );

  const [isPredicting, setIsPredicting] = useState(false);
  const { toast } = useToast();

  const handlePrediction = (formData: FormData) => {
    setIsPredicting(true);
    formAction(formData);
  };

  useEffect(() => {
    if (state.error) {
      toast({
          variant: "destructive",
          title: "Prediction Error",
          description: state.error,
      });
      setIsPredicting(false);
    }
    if (state.prediction) {
        setIsPredicting(false);
    }
  }, [state, toast]);

  const prediction = state.prediction;

  return (
    <div className="border-t border-white/10 pt-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-foreground">Prédictions de l'IA</h3>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {!prediction ? (
          <div className="flex items-center gap-3 text-foreground/80">
            <Bot className="h-5 w-5"/>
            <span>Cliquez pour obtenir les prédictions...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-4 text-sm w-full">
            <div className="font-medium">Sortie estimée : <span className="text-white font-semibold">{prediction.estimatedExitDate}</span></div>
            <div className="font-medium">Encombrement : <span className="text-white font-semibold">{prediction.congestionLevel}</span></div>
            {prediction.readyForPickup && (
              <div>
                <Button 
                  size="sm" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_hsl(var(--primary))] transition-shadow hover:shadow-[0_0_25px_hsl(var(--primary))]"
                >
                  Prêt pour Enlèvement
                </Button>
              </div>
            )}
          </div>
        )}

        {!prediction && (
          <form action={handlePrediction}>
            <Button 
              type="submit"
              disabled={isPredicting}
              className="bg-primary/10 border border-primary text-primary hover:bg-primary/20"
            >
              {isPredicting ? <Loader2 className="animate-spin mr-2"/> : <Sparkles className="mr-2 h-4 w-4"/>}
              {isPredicting ? 'Analyse en cours...' : 'Prédire'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
