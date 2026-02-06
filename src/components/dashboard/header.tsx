import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ShipWheel } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function Header() {
  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <ShipWheel className="h-7 w-7 text-primary" />
          <h1 className="text-xl font-bold tracking-tight text-white">PortNet Vision AI</h1>
        </div>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" className="text-foreground/80 hover:text-white">Configuration</Button>
          <Button variant="ghost" className="text-foreground/80 hover:text-white">Mission</Button>
          <Avatar className="h-9 w-9">
            <AvatarImage src={userAvatar?.imageUrl} alt="User Avatar" data-ai-hint={userAvatar?.imageHint} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </nav>
      </div>
    </header>
  );
}
