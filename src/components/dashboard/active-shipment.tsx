import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Shipment } from "@/lib/dashboard-data";
import { Box, Ship } from "lucide-react";

interface ActiveShipmentProps {
  shipment: Shipment;
}

export function ActiveShipment({ shipment }: ActiveShipmentProps) {
  return (
    <Card className="bg-white rounded-xl shadow-sm border-slate-200/60 overflow-hidden">
      <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-6">
        
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <Box className="h-5 w-5 text-slate-500" />
            <p className="font-semibold text-lg text-slate-900">{shipment.name} ({shipment.hsCode})</p>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-3 text-sm text-slate-500">
            <Ship className="h-5 w-5" />
            <p>{shipment.vessel}</p>
          </div>
        </div>

        <div className="h-16 w-px bg-slate-200 hidden sm:block" />

        <div className="flex-1 flex flex-col items-center sm:items-start text-left">
           <p className="text-sm uppercase font-medium tracking-wider text-orange-500">
              CONTRÔLE : {shipment.agencyShortName}
            </p>
            <p className="text-base text-slate-800 font-semibold">
              {shipment.currentStepDescription} | Temps : 
              <span className="font-bold text-slate-900 ml-1">{shipment.timeRemaining}</span>
            </p>
        </div>
        
        <div className="h-16 w-px bg-slate-200 hidden sm:block" />

        <div className="flex-1 flex flex-col items-center sm:items-end">
          <p className="text-sm text-slate-500 mb-1">Temps Restant Global</p>
          <div className="text-4xl font-bold text-blue-600">
            {shipment.totalTimeRemaining}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
