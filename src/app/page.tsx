import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Home() {
  return (
    <div className="flex h-[calc(100vh-8rem)] min-h-[500px] w-full flex-col items-center justify-center p-4 text-center">
      <div className="fade-in">
        <Logo className="h-24 w-24 text-primary" />
      </div>

      <h1 className="mt-6 font-headline text-5xl font-bold tracking-tight text-foreground md:text-6xl fade-in" style={{ animationDelay: '0.2s' }}>
        Leziz Menu
      </h1>
      <p className="mt-4 max-w-md text-lg text-muted-foreground fade-in" style={{ animationDelay: '0.3s' }}>
        Lezzetin teknolojiyle buluştuğu yer. Menümüzü keşfedin.
      </p>

      <div className="mt-8 fade-in" style={{ animationDelay: '0.4s' }}>
        <Button asChild size="lg" className="font-headline text-lg">
          <Link href="/categories">Menüyü Gör</Link>
        </Button>
      </div>

      <div className="mt-12 flex space-x-6 fade-in" style={{ animationDelay: '0.5s' }}>
        <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
          <Instagram className="h-6 w-6" />
          <span className="sr-only">Instagram</span>
        </Link>
        <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
          <Facebook className="h-6 w-6" />
          <span className="sr-only">Facebook</span>
        </Link>
        <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
          <Twitter className="h-6 w-6" />
          <span className="sr-only">Twitter</span>
        </Link>
      </div>
    </div>
  );
}
