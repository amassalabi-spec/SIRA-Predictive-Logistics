import { Button } from "@/components/ui/button";
import { Building, ShipWheel } from "lucide-react";

interface HeaderProps {
  clientName: string;
}

export function Header({ clientName }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <ShipWheel className="h-7 w-7 text-primary" />
          <h1 className="text-xl font-bold tracking-tight text-white">PortNet Vision AI</h1>
        </div>
        <div className="flex items-center ml-auto gap-6">
            <Button variant="ghost" className="text-foreground/80 hover:text-white">Configuration</Button>
            <Button variant="ghost" className="text-foreground/80 hover:text-white">Mission</Button>
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-foreground/70" />
              <span className="font-semibold text-foreground">{clientName}</span>
            </div>
        </div>
      </div>
    </header>
  );
}
