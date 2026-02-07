import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SurchargesWidgetProps {
  daysRemaining: number;
  costPerDay: string;
}

export function SurchargesWidget({ daysRemaining, costPerDay }: SurchargesWidgetProps) {
  return (
    <Card className={cn(
      "relative overflow-hidden text-white rounded-xl shadow-lg transition-colors duration-300",
      daysRemaining <= 2
        ? "bg-gradient-to-br from-red-600 to-rose-800"
        : "bg-gradient-to-br from-green-600 to-teal-800"
    )}>
      {daysRemaining <= 2 && (
        <div className="absolute top-4 right-4 z-20">
            <Badge variant="destructive" className="animate-pulse text-base font-bold py-1 px-3 border-2 border-white/50">
                URGENT
            </Badge>
        </div>
      )}
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
