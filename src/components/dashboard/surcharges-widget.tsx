import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { surchargesData } from "@/lib/dashboard-data";
import { AlertTriangle, TrendingUp } from "lucide-react";

export function SurchargesWidget() {
  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-xl shadow-lg">
      <CardContent className="p-6 relative z-10 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">{surchargesData.title}</h3>
            <AlertTriangle className="h-5 w-5 text-white/80" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-8xl font-bold">{surchargesData.daysRemaining}</span>
            <span className="text-2xl font-medium">Jours Restants</span>
          </div>
          <p className="text-white/80">{surchargesData.costPerDay}</p>
        </div>
        <Button variant="secondary" className="mt-4 w-full bg-white/20 hover:bg-white/30 text-white">
          <TrendingUp className="mr-2 h-4 w-4" />
          {surchargesData.action}
        </Button>
      </CardContent>
    </Card>
  );
}
