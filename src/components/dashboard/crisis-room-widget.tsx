import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SirenIcon } from "@/lib/icons";
import { crisisActions } from "@/lib/dashboard-data";

interface CrisisRoomWidgetProps {
  alert: string;
}

export function CrisisRoomWidget({ alert }: CrisisRoomWidgetProps) {
  return (
    <Card className="bg-red-900/20 border-2 border-red-500 text-white rounded-xl shadow-lg shadow-red-500/10">
      <CardContent className="p-6 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Crisis Room</h3>
            <div className="relative flex h-5 w-5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping"></span>

              <SirenIcon className="relative text-red-400" />
            </div>
          </div>
          <p className="text-red-200">{alert}</p>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          {crisisActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className="w-full border-red-400/50 text-red-200 hover:bg-red-400/10 hover:text-white justify-start h-auto p-3 text-left"
              >
                <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="font-semibold">{action.title}</span>
                  <span className="text-xs text-red-200/80">{action.description}</span>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
