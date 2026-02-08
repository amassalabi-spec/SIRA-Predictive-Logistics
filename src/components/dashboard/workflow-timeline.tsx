
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PredictionEngine } from "./prediction-engine";
import { Badge } from "@/components/ui/badge";
import type { Shipment, WorkflowStep } from "@/lib/dashboard-data";

interface WorkflowTimelineProps {
  workflowSteps: readonly WorkflowStep[];
  activeShipment: Shipment & { timeRemaining: string, totalTimeRemaining: string };
  clientTimeMultiplier: number;
}

export function WorkflowTimeline({ workflowSteps, activeShipment, clientTimeMultiplier }: WorkflowTimelineProps) {
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
    <Card className="bg-white rounded-xl shadow-sm border-slate-200/60 h-full w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">Flux de Contrôle</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <div className="relative flex justify-between items-start pt-9">
            {/* Timeline line */}
            <div className="absolute top-13 left-0 right-0 h-1 bg-slate-200 w-full -translate-y-1/2" />
            <div
              className="absolute top-13 left-0 h-1 bg-blue-600 transition-all duration-500 ease-in-out -translate-y-1/2"
              style={{ width: `${progressPercentage}%` }}
            />
            
            {workflowSteps.map((step, index) => {
              const status = getStatus(index);
              return (
                <div key={step.name} className="relative z-10 flex flex-col items-center w-24 text-center">
                  {step.name === 'Contrôle (IA/Douane)' && status === 'active' && (
                    <Badge variant="secondary" className="absolute -top-6 whitespace-nowrap bg-blue-100 text-blue-700 text-[0.7rem] font-semibold border-blue-200">
                      Analyse SIRA en cours
                    </Badge>
                  )}
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300",
                      status === 'active' ? "bg-blue-600 border-blue-600 text-white" : 
                      status === 'completed' ? "bg-blue-100 border-blue-300 text-blue-600" :
                      "bg-slate-100 border-slate-300 text-slate-500"
                    )}
                  >
                    <step.icon className="h-4 w-4" />
                  </div>
                  <p className="mt-2 text-xs font-medium text-slate-600 h-10 flex items-start justify-center">{step.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        <PredictionEngine activeShipment={activeShipment} workflowSteps={workflowSteps} clientTimeMultiplier={clientTimeMultiplier} />

      </CardContent>
    </Card>
  );
}
