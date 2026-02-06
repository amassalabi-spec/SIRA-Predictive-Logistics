import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { workflowSteps } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";
import { PredictionEngine } from "./prediction-engine";

export function WorkflowTimeline() {
  return (
    <Card className="bg-white/5 backdrop-blur-xl border border-white/10 text-white h-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-foreground">Flux de Contrôle</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <div className="relative flex justify-between items-start">
            {/* Timeline line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-600 w-full -translate-y-1/2" />
            
            {workflowSteps.map((step, index) => (
              <div key={step.name} className="relative z-10 flex flex-col items-center w-20">
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300",
                    step.status === 'active' ? "bg-primary border-primary text-background shadow-[0_0_15px_hsl(var(--primary))]" : 
                    step.status === 'completed' ? "bg-primary/20 border-primary/50 text-primary" :
                    "bg-gray-700/50 border-gray-600 text-foreground/60"
                  )}
                >
                  <step.icon className="h-6 w-6" />
                </div>
                <p className="mt-2 text-xs text-center font-medium">{step.name}</p>
              </div>
            ))}
          </div>
        </div>

        <PredictionEngine />

      </CardContent>
    </Card>
  );
}
