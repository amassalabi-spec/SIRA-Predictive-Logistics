import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface SurchargesWidgetProps {
  daysRemaining: number;
  costPerDay: string;
}

export function SurchargesWidget({ daysRemaining, costPerDay }: SurchargesWidgetProps) {
  return (
    <Card className={cn(
      "relative overflow-hidden text-white rounded-xl shadow-lg",
      daysRemaining <= 2
        ? "bg-gradient-to-br from-red-600 to-rose-800"
        : "bg-gradient-to-br from-amber-500 to-orange-600"
    )}>
      <CardContent className="p-6 relative z-10 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Surestaries</h3>
            <AlertTriangle className="h-5 w-5 text-white/80" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-8xl font-bold">{daysRemaining}</span>
            <span className="text-2xl font-medium">Jours Restants</span>
          </div>
          <p className="text-white/80">{costPerDay}</p>
        </div>
        <Button variant="secondary" className="mt-4 w-full bg-white/20 hover:bg-white/30 text-white">
          <TrendingUp className="mr-2 h-4 w-4" />
          Prioriser avec l'agent SIRA
        </Button>
      </CardContent>
    </Card>
  );
}
