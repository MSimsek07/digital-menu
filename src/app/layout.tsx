import type { Metadata } from "next";
import { Alegreya } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";

const alegreya = Alegreya({
  subsets: ["latin"],
  variable: "--font-alegreya",
});

export const metadata: Metadata = {
  title: "Leziz Menu",
  description: "Modern QR Menu for your restaurant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={cn("scroll-smooth", alegreya.variable)}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
