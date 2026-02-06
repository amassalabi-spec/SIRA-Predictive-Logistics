import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SirenIcon } from "@/lib/icons";
import { crisisData } from "@/lib/dashboard-data";
import { Send, FileText } from "lucide-react";

export function CrisisRoomWidget() {
  return (
    <Card className="bg-red-900/20 border-2 border-red-500 text-white rounded-xl shadow-lg shadow-red-500/10">
      <CardContent className="p-6 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">{crisisData.title}</h3>
            <div className="relative flex h-5 w-5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping"></span>
              <SirenIcon className="relative text-red-400" />
            </div>
          </div>
          <p className="text-red-200">{crisisData.alert}</p>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Button variant="outline" className="border-red-400/50 text-red-200 hover:bg-red-400/10 hover:text-white">
            <Send className="mr-2 h-4 w-4" />
            {crisisData.actions[0]}
          </Button>
          <Button variant="outline" className="border-red-400/50 text-red-200 hover:bg-red-400/10 hover:text-white">
            <FileText className="mr-2 h-4 w-4" />
            {crisisData.actions[1]}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
