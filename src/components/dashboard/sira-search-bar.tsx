import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";

export function SiraSearchBar() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-xl border-t border-white/10 z-50">
      <div className="container max-w-2xl mx-auto">
        <div className="relative">
          <Input 
            type="text" 
            placeholder="Interroger SIRA..." 
            className="w-full h-12 pl-12 pr-32 rounded-full bg-white/5 border-white/20 text-white placeholder:text-foreground/60 focus:ring-primary focus:ring-2"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Mic className="h-5 w-5 text-foreground/60" />
          </div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Button 
              type="submit" 
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Envoyer
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
