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
  const isUrgent = daysRemaining <= 2;
  return (
    <Card className="bg-white rounded-xl shadow-sm border-slate-200/60 h-full">
      <CardContent className="p-6 relative z-10 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-slate-900">Surestaries</h3>
             {isUrgent && (
              <Badge variant="destructive" className="animate-pulse text-base font-bold py-1 px-3 border-2 border-white/50">
                  URGENT
              </Badge>
            )}
          </div>
          <div className="flex items-baseline gap-2">
            <span className={cn(
              "text-7xl font-bold",
               isUrgent ? "text-red-500" : "text-green-500"
            )}>{daysRemaining}</span>
            <span className="text-2xl font-medium text-slate-600">Jours Restants</span>
          </div>
          <p className="text-slate-500">{costPerDay}</p>
        </div>
        <Button variant="secondary" className="mt-4 w-full bg-slate-100 hover:bg-slate-200 text-slate-800">
          <TrendingUp className="mr-2 h-4 w-4" />
          Prioriser avec l'agent SIRA
        </Button>
      </CardContent>
    </Card>
  );
}
