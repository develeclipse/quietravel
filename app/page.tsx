import { Sparkles, Calendar, MapPin, Search } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container max-w-md mx-auto px-4 py-6 space-y-6">
      {/* Badge Anti-Overtourism */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-[rgb(139 92 246)] rounded-full">
          <Sparkles className="w-4 h-4 text-orange-500" fill="currentColor" />
          <span className="text-sm font-semibold text-[rgb(139 92 246)]">
            ANTI-OVERTOURISM
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="text-center space-y-3 py-6">
        <h1 className="text-4xl font-bold text-foreground leading-tight">
          Viaggia slow,
          <br />
          scopri quiete
        </h1>
        <p className="text-muted-foreground text-lg">
          Destinazioni autentiche,
          <br />
          lontano dalla folla
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Cerca luoghi quiet..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(139 92 246)]"
        />
      </div>

      {/* 3 Action Cards */}
      <div className="space-y-4 pt-4">
        <Link href="/ispirazioni">
          <div className="bg-white p-5 rounded-2xl border border-border hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[rgb(139 92 246)]/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[rgb(139 92 246)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Ispirati</h3>
                  <p className="text-sm text-muted-foreground">
                    Collezioni, storie e destinazioni
                  </p>
                </div>
              </div>
              <svg
                className="w-6 h-6 text-muted-foreground group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </Link>

        <Link href="/pianifica">
          <div className="bg-white p-5 rounded-2xl border border-border hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Pianifica</h3>
                  <p className="text-sm text-muted-foreground">
                    Itinerari e pacchetti tematici
                  </p>
                </div>
              </div>
              <svg
                className="w-6 h-6 text-muted-foreground group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </Link>

        <Link href="/vicino">
          <div className="bg-white p-5 rounded-2xl border border-border hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Vicino a me</h3>
                  <p className="text-sm text-muted-foreground">
                    Posti segreti e alternative quiet
                  </p>
                </div>
              </div>
              <svg
                className="w-6 h-6 text-muted-foreground group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
