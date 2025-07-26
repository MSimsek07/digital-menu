import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed, Home } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Logo className="h-8 w-8 text-primary" />
          <span className="font-headline text-2xl font-bold text-foreground">
            Leziz Menu
          </span>
        </Link>
        <nav className="flex items-center space-x-2">
          <Button variant="ghost" asChild>
            <Link href="/" aria-label="Anasayfa">
              <Home className="h-5 w-5" />
              <span className="ml-2 hidden sm:inline">Anasayfa</span>
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/categories" aria-label="Kategoriler">
              <UtensilsCrossed className="h-5 w-5" />
              <span className="ml-2 hidden sm:inline">Kategoriler</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
