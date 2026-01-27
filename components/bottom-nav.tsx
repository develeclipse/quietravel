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
    <nav 
      className="fixed bottom-0 left-0 right-0 md:hidden z-50"
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #E5E5E0'
      }}
    >
      <div 
        className="flex justify-around items-center px-2"
        style={{ height: '64px' }}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                gap: '4px',
                padding: '8px 4px',
                borderRadius: '12px',
                backgroundColor: isActive ? 'rgba(124, 95, 186, 0.08)' : 'transparent',
                color: isActive ? '#7C5FBA' : '#9B9B9B',
                transition: 'all 0.2s'
              }}
            >
              <Icon style={{ width: '22px', height: '22px' }} strokeWidth={2} />
              <span 
                className="font-sans font-medium"
                style={{ fontSize: '10px' }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
