import { Button } from "@/components/ui/button";
import { Building, ShipWheel } from "lucide-react";

interface HeaderProps {
  clientName: string;
}

export function Header({ clientName }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <ShipWheel className="h-7 w-7 text-blue-600" />
          <h1 className="text-xl font-bold tracking-tight text-slate-900">SIRA</h1>
        </div>
        <div className="flex items-center ml-auto gap-6">
            <Button variant="ghost" className="text-slate-600 hover:text-slate-900">Configuration</Button>
            <Button variant="ghost" className="text-slate-600 hover:text-slate-900">Mission</Button>
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-slate-500" />
              <span className="font-semibold text-slate-800">{clientName}</span>
            </div>
        </div>
      </div>
    </header>
  );
}
