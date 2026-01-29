"use client";

import { useState, useEffect } from "react";
import { Sparkles, Calendar, MapPin, ChevronRight, X, TrendingUp, Search } from "lucide-react";
import Link from "next/link";

interface Destination {
  id: string;
  name: string;
  slug: string;
  region: string;
  quietScore: number;
  subtitle?: string;
}

export default function HomePage() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    fetch("/destinations.json")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((d: any) => ({
          id: d.id,
          name: d.name,
          slug: d.slug,
          region: d.region,
          quietScore: d.quietScore,
          subtitle: d.subtitle,
        }));
        setDestinations(formatted);
      })
      .catch(console.error);
  }, []);

  const trendingDestinations = destinations.slice(0, 3);
  const filteredDestinations = destinations
    .filter((d) => {
      if (!searchQuery) return true;
      return d.name.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => b.quietScore - a.quietScore);

  const handleSearchClick = () => {
    setShowSearch(true);
  };

  return (
    <div className="min-h-screen px-6 pt-4 pb-24">
      {/* Badge Anti-Overtourism */}
      <div className="flex items-center gap-2 mb-5">
        <Sparkles className="w-3 h-3" style={{ color: '#E8A855' }} fill="#E8A855" />
        <span 
          className="font-sans font-semibold tracking-widest"
          style={{ 
            fontSize: '10px',
            color: '#6B6B6B',
            letterSpacing: '1.5px'
          }}
        >
          ANTI-OVERTOURISM
        </span>
      </div>

      {/* Hero Section */}
      <div className="mb-7">
        <h1 
          className="font-serif font-bold leading-tight mb-3"
          style={{ 
            fontSize: '32px',
            lineHeight: '38px',
            color: '#1A1A1A',
            maxWidth: '200px'
          }}
        >
          Dove vuoi andare?
        </h1>
        <p 
          className="font-sans"
          style={{ 
            fontSize: '14px',
            lineHeight: '20px',
            color: '#6B6B6B',
            maxWidth: '280px'
          }}
        >
          Inizia la tua esperienza quiet
        </p>
      </div>

      {/* Search Bar - Clickable */}
      <button
        onClick={handleSearchClick}
        className="w-full mb-6 flex items-center gap-3 px-4"
        style={{
          height: "52px",
          backgroundColor: "#FFFFFF",
          borderRadius: "26px",
          border: "1px solid #E5E5E0",
        }}
      >
        <Search style={{ width: "20px", height: "20px", color: "#6B6B6B" }} />
        <span className="font-sans" style={{ fontSize: "15px", color: "#6B6B6B" }}>
          Cerca città o luoghi...
        </span>
      </button>

      {/* Single Card with Sections */}
      <div 
        className="overflow-hidden"
        style={{
          borderRadius: "24px",
          backgroundColor: "#F5F3FF", // Very light purple
        }}
      >
        {/* Section 1: Ispirati */}
        <Link href="/ispirazioni">
          <div 
            className="flex items-center justify-between p-5 cursor-pointer"
            style={{ borderBottom: "1px solid rgba(124, 95, 186, 0.1)" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div 
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(124, 95, 186, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Sparkles style={{ width: "22px", height: "22px", color: "#7C5FBA" }} />
              </div>
              <div>
                <h3 
                  className="font-sans font-semibold"
                  style={{ fontSize: "17px", color: "#1A1A1A" }}
                >
                  Ispirati
                </h3>
                <p 
                  className="font-sans"
                  style={{ fontSize: "13px", color: "#6B6B6B" }}
                >
                  Collezioni, storie e destinazioni
                </p>
              </div>
            </div>
            <ChevronRight style={{ width: "18px", height: "18px", color: "#9B9B9B" }} />
          </div>
        </Link>

        {/* Section 2: Pianifica */}
        <Link href="/pianifica">
          <div 
            className="flex items-center justify-between p-5 cursor-pointer"
            style={{ borderBottom: "1px solid rgba(124, 95, 186, 0.1)" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div 
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(95, 184, 148, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Calendar style={{ width: "22px", height: "22px", color: "#5FB894" }} />
              </div>
              <div>
                <h3 
                  className="font-sans font-semibold"
                  style={{ fontSize: "17px", color: "#1A1A1A" }}
                >
                  Pianifica
                </h3>
                <p 
                  className="font-sans"
                  style={{ fontSize: "13px", color: "#6B6B6B" }}
                >
                  Itinerari e pacchetti tematici
                </p>
              </div>
            </div>
            <ChevronRight style={{ width: "18px", height: "18px", color: "#9B9B9B" }} />
          </div>
        </Link>

        {/* Section 3: Vicino a me */}
        <Link href="/vicino">
          <div className="flex items-center justify-between p-5 cursor-pointer">
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div 
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(232, 168, 85, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <MapPin style={{ width: "22px", height: "22px", color: "#E8A855" }} />
              </div>
              <div>
                <h3 
                  className="font-sans font-semibold"
                  style={{ fontSize: "17px", color: "#1A1A1A" }}
                >
                  Vicino a me
                </h3>
                <p 
                  className="font-sans"
                  style={{ fontSize: "13px", color: "#6B6B6B" }}
                >
                  Posti segreti e alternative quiet
                </p>
              </div>
            </div>
            <ChevronRight style={{ width: "18px", height: "18px", color: "#9B9B9B" }} />
          </div>
        </Link>
      </div>

      {/* Search Modal */}
      {showSearch && (
        <div
          className="fixed inset-0 z-50"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div 
            className="absolute inset-x-0 top-8 mx-4 overflow-hidden"
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "28px",
              maxHeight: "calc(100vh - 100px)",
            }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: "#E5E5E0" }}>
              <h2 className="font-serif font-bold" style={{ fontSize: "20px", color: "#1A1A1A" }}>
                Cerca destinazione
              </h2>
              <button
                onClick={() => setShowSearch(false)}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: "#F5F5F0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X style={{ width: "18px", height: "18px", color: "#6B6B6B" }} />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-4 border-b" style={{ borderColor: "#E5E5E0" }}>
              <div className="flex items-center gap-3 px-4" style={{
                height: "48px",
                backgroundColor: "#F8F5F1",
                borderRadius: "24px",
              }}>
                <Search style={{ width: "18px", height: "18px", color: "#6B6B6B" }} />
                <input
                  type="text"
                  placeholder="Cerca città o luoghi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 font-sans"
                  style={{ 
                    fontSize: "14px", 
                    border: "none", 
                    outline: "none",
                    backgroundColor: "transparent",
                    color: "#1A1A1A"
                  }}
                  autoFocus
                />
              </div>
            </div>

            {/* Results */}
            <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
              {/* Trending Section */}
              {!searchQuery && trendingDestinations.length > 0 && (
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp style={{ width: "16px", height: "16px", color: "#E8A855" }} />
                    <span className="font-sans font-semibold" style={{ fontSize: "14px", color: "#1A1A1A" }}>
                      In tendenza
                    </span>
                  </div>
                  <div className="space-y-2">
                    {trendingDestinations.map((dest, index) => (
                      <Link key={dest.id} href={`/destinazioni/${dest.slug}`}>
                        <div 
                          className="flex items-center gap-3 p-3 rounded-2xl"
                          style={{ backgroundColor: "#F8F5F1" }}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-sans font-semibold" style={{ fontSize: "15px", color: "#1A1A1A" }}>
                                {dest.name}
                              </span>
                              {index === 0 && (
                                <span 
                                  className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                                  style={{ fontSize: "10px", backgroundColor: "#E8A85520", color: "#E8A855" }}
                                >
                                  <TrendingUp style={{ width: "10px", height: "10px" }} />
                                </span>
                              )}
                            </div>
                            <p className="font-sans" style={{ fontSize: "13px", color: "#6B6B6B" }}>
                              {dest.region}
                            </p>
                          </div>
                          <span 
                            className="font-sans font-semibold px-2 py-1 rounded-lg"
                            style={{ fontSize: "13px", backgroundColor: "#5FB89420", color: "#5FB894" }}
                          >
                            Q{dest.quietScore}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* All Destinations */}
              <div className="p-4">
                {!searchQuery && (
                  <span className="font-sans font-semibold block mb-3" style={{ fontSize: "14px", color: "#1A1A1A" }}>
                    Tutte le destinazioni
                  </span>
                )}
                <div className="space-y-2">
                  {filteredDestinations.slice(0, 20).map((dest) => (
                    <Link key={dest.id} href={`/destinazioni/${dest.slug}`}>
                      <div 
                        className="flex items-center gap-3 p-3 rounded-2xl hover:opacity-80"
                        style={{ backgroundColor: "#F8F5F1" }}
                      >
                        <div className="flex-1">
                          <span className="font-sans font-semibold" style={{ fontSize: "15px", color: "#1A1A1A" }}>
                            {dest.name}
                          </span>
                          <p className="font-sans" style={{ fontSize: "13px", color: "#6B6B6B" }}>
                            {dest.region}
                          </p>
                        </div>
                        <span 
                          className="font-sans font-semibold px-2 py-1 rounded-lg"
                          style={{ fontSize: "13px", backgroundColor: "#5FB89420", color: "#5FB894" }}
                        >
                          Q{dest.quietScore}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
