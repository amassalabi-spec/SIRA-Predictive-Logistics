import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, ClipboardList } from "lucide-react";
import type { ChecklistItem } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

const complianceStepConfig = {
  completed: {
    icon: CheckCircle,
    color: "text-green-500",
  },
  'action-required': {
    icon: AlertTriangle,
    color: "text-amber-500",
  },
  pending: {
    icon: ClipboardList,
    color: "text-blue-500",
  },
};

interface CrisisRoomWidgetProps {
  checklist: readonly ChecklistItem[];
}

export function CrisisRoomWidget({ checklist }: CrisisRoomWidgetProps) {
  const hasActionRequired = checklist.some(item => item.status === 'action-required');

  return (
    <Card className={cn(
      "rounded-xl shadow-sm transition-colors duration-300 h-full",
      hasActionRequired ? "bg-amber-50/70 border-amber-200" : "bg-white border-slate-200/60"
    )}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">Check-list de Conformité SIRA</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {checklist.map((step, index) => {
            const config = complianceStepConfig[step.status];
            const Icon = config.icon;
            return (
              <li key={index} className="flex items-start gap-3">
                <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${config.color}`} />
                <span className="text-slate-700">{step.text}</span>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
