"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Lightbulb, MapPin, User } from "lucide-react";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/pianifica", icon: Compass, label: "Pianifica" },
  { href: "/ispirazioni", icon: Lightbulb, label: "Ispirazioni" },
  { href: "/vicino", icon: MapPin, label: "Vicino a me" },
  { href: "/profilo", icon: User, label: "Profilo" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border md:hidden z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 gap-1 py-2 px-1 rounded-lg transition-colors ${
                isActive
                  ? "text-[rgb(139 92 246)] bg-[rgb(139 92 246)]/10"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
