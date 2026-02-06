import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PredictionEngine } from "./prediction-engine";
import { Badge } from "@/components/ui/badge";
import type { Shipment, WorkflowStep } from "@/lib/dashboard-data";

interface WorkflowTimelineProps {
  workflowSteps: readonly WorkflowStep[];
  activeShipment: Shipment;
}

export function WorkflowTimeline({ workflowSteps, activeShipment }: WorkflowTimelineProps) {
  const activeStepIndex = activeShipment.activeWorkflowStepIndex;
  
  const getStatus = (index: number) => {
    if (index < activeStepIndex) return 'completed';
    if (index === activeStepIndex) return 'active';
    return 'pending';
  }

  const progressPercentage =
    activeStepIndex > 0
      ? (activeStepIndex / (workflowSteps.length - 1)) * 100
      : 0;

  return (
    <Card className="bg-white/5 backdrop-blur-xl border border-white/10 text-white h-full w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-foreground">Flux de Contrôle</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <div className="relative flex justify-between items-start pt-9">
            {/* Timeline line */}
            <div className="absolute top-13 left-0 right-0 h-0.5 bg-gray-600 w-full -translate-y-1/2" />
            <div
              className="absolute top-13 left-0 h-0.5 bg-primary shadow-[0_0_10px_hsl(var(--primary))] transition-all duration-500 ease-in-out -translate-y-1/2"
              style={{ width: `${progressPercentage}%` }}
            />
            
            {workflowSteps.map((step, index) => {
              const status = getStatus(index);
              return (
                <div key={step.name} className="relative z-10 flex flex-col items-center w-24 text-center">
                  {step.name === 'Contrôle (IA/Douane)' && status === 'active' && (
                    <Badge variant="secondary" className="absolute -top-6 whitespace-nowrap bg-primary/20 text-primary text-[0.7rem] font-semibold">
                      Analyse SIRA en cours
                    </Badge>
                  )}
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300",
                      status === 'active' ? "bg-primary border-primary text-background shadow-[0_0_15px_hsl(var(--primary))]" : 
                      status === 'completed' ? "bg-primary/20 border-primary/50 text-primary" :
                      "bg-gray-700/50 border-gray-600 text-foreground/60"
                    )}
                  >
                    <step.icon className="h-4 w-4" />
                  </div>
                  <p className="mt-2 text-xs font-medium h-10 flex items-start justify-center">{step.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        <PredictionEngine activeShipment={activeShipment} workflowSteps={workflowSteps} />

      </CardContent>
    </Card>
  );
}
