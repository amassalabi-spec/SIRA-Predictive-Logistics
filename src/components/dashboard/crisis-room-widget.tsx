import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, ClipboardList } from "lucide-react";

const complianceSteps = [
  {
    text: "Documents PortNet validés.",
    icon: CheckCircle,
    color: "text-green-400",
  },
  {
    text: "Action requise : Télécharger le certificat d'origine.",
    icon: AlertTriangle,
    color: "text-yellow-400",
  },
  {
    text: "En attente : Inspection physique programmée",
    icon: ClipboardList,
    color: "text-blue-400",
  },
];

export function CrisisRoomWidget() {
  return (
    <Card className="bg-white/5 backdrop-blur-xl border border-white/10 text-white">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-foreground">Check-list de Conformité SIRA</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4 pt-2">
          {complianceSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <li key={index} className="flex items-start gap-3">
                <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${step.color}`} />
                <span className="text-foreground/90">{step.text}</span>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
