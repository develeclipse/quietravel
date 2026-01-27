import type { Metadata } from "next";
import "./globals.css";
import { BottomNav } from "@/components/bottom-nav";
import { SessionProvider } from "@/components/session-provider";

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
        <SessionProvider>
          <main className="min-h-screen">
            {children}
          </main>
          <BottomNav />
        </SessionProvider>
      </body>
    </html>
  );
}
