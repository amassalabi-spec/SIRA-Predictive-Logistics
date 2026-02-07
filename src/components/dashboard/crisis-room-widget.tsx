import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, ClipboardList } from "lucide-react";
import type { ChecklistItem } from "@/lib/dashboard-data";

const complianceStepConfig = {
  completed: {
    icon: CheckCircle,
    color: "text-green-400",
  },
  'action-required': {
    icon: AlertTriangle,
    color: "text-yellow-400",
  },
  pending: {
    icon: ClipboardList,
    color: "text-blue-400",
  },
};

interface CrisisRoomWidgetProps {
  checklist: readonly ChecklistItem[];
}

export function CrisisRoomWidget({ checklist }: CrisisRoomWidgetProps) {
  return (
    <Card className="bg-sky-900/30 backdrop-blur-xl border border-white/10 text-white">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-foreground">Check-list de Conformité SIRA</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4 pt-2">
          {checklist.map((step, index) => {
            const config = complianceStepConfig[step.status];
            const Icon = config.icon;
            return (
              <li key={index} className="flex items-start gap-3">
                <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${config.color}`} />
                <span className="text-foreground/90">{step.text}</span>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
