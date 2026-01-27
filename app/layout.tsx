import type { Metadata } from "next";
import "./globals.css";
import { BottomNav } from "@/components/bottom-nav";

export const metadata: Metadata = {
  title: "QuietTravel - Anti-Overtourism",
  description: "Scopri destinazioni tranquille in Italia con il Quiet Score",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className="antialiased pb-16 md:pb-0">
        <main className="min-h-screen">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
