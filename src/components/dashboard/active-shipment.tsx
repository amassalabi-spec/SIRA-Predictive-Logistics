import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { activeShipment } from "@/lib/dashboard-data";
import { Box, Ship } from "lucide-react";

export function ActiveShipment() {
  return (
    <Card className="bg-white/5 backdrop-blur-xl border border-white/10 text-white w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-foreground">Expéditions Actives</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center text-center gap-4 pt-0">
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Box className="h-5 w-5 text-foreground/80" />
            <p className="font-semibold">{activeShipment.name} ({activeShipment.weight})</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Ship className="h-5 w-5 text-foreground/80" />
            <p className="text-sm text-foreground/80">{activeShipment.vessel}</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div 
            className="text-6xl font-bold text-primary"
            style={{ textShadow: '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary))' }}
          >
            {activeShipment.timeRemaining}
          </div>
          <p className="text-xs text-foreground/70 mt-1">Temps écoulé (étape actuelle)</p>
          <p className="text-sm text-foreground/90 mt-4 font-medium">{activeShipment.controllingAuthority}</p>
        </div>
      </CardContent>
    </Card>
  );
}
