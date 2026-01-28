import { Sparkles, Leaf, ChevronDown, MapPin, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { SearchBar } from "@/components/search-bar";

export default async function IspirazioniPage() {
  const destinazioni = await prisma.destination.findMany({
    orderBy: {
      quietScore: "desc",
    },
    take: 10,
    include: {
      _count: {
        select: { pois: true },
      },
    },
  });

  // Mock "trending" for demo (first 2)
  const trendingIds = destinazioni.slice(0, 2).map((d) => d.id);

  return (
    <div className="min-h-screen px-4 pt-4 pb-24" style={{ backgroundColor: "#F8F5F1" }}>
      {/* Header */}
      <div className="mb-4">
        <h1 className="font-serif font-bold" style={{ fontSize: "28px", color: "#1A1A1A" }}>
          Destinazioni Quiet
        </h1>
        <p className="font-sans" style={{ fontSize: "14px", color: "#6B6B6B" }}>
          {destinazioni.length} destinazioni
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <SearchBar placeholder="Cerca collezioni, regioni, città..." />
      </div>

      {/* Filtri */}
      <div className="flex gap-2 mb-6">
        <button
          className="font-sans font-medium flex items-center gap-2"
          style={{
            padding: "8px 16px",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E5E0",
            borderRadius: "20px",
            fontSize: "13px",
            color: "#1A1A1A",
          }}
        >
          Quiet Score & Date
          <span
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: "#7C5FBA",
              color: "#FFFFFF",
              fontSize: "11px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "600",
            }}
          >
            1
          </span>
        </button>
      </div>

      {/* Featured Card - Umbria */}
      <div
        className="mb-6 relative overflow-hidden"
        style={{
          borderRadius: "24px",
          height: "200px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 100%), url(https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80)',
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "20px",
          }}
        >
          <h3
            className="font-serif font-semibold mb-1"
            style={{ fontSize: "22px", color: "#FFFFFF", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
          >
            Umbria da scoprire lentamente
          </h3>
          <p
            className="font-sans mb-3"
            style={{ fontSize: "14px", color: "rgba(255,255,255,0.9)", textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
          >
            5 giorni, zero stress
          </p>
          <button
            className="font-sans font-medium flex items-center gap-1 self-start"
            style={{
              padding: "6px 14px",
              backgroundColor: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "16px",
              fontSize: "12px",
              color: "#FFFFFF",
            }}
          >
            Mostra altre 3
            <ChevronDown style={{ width: "14px", height: "14px" }} />
          </button>
        </div>
      </div>

      {/* AI Card */}
      <div
        className="ai-gradient mb-6"
        style={{
          borderRadius: "24px",
          padding: "20px",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <h3
          className="font-sans font-semibold mb-2"
          style={{ fontSize: "16px", color: "#1A1A1A" }}
        >
          Non sai ancora dove andare?
        </h3>
        <p
          className="font-sans mb-4"
          style={{ fontSize: "13px", color: "#6B6B6B", lineHeight: "18px" }}
        >
          Lascia che la nostra AI ti suggerisca la destinazione perfetta in base alle tue preferenze
        </p>
        <button
          className="btn-gradient w-full font-sans font-semibold flex items-center justify-center gap-2"
          style={{
            height: "48px",
            borderRadius: "24px",
            fontSize: "15px",
            color: "#FFFFFF",
            border: "none",
            background: "linear-gradient(135deg, #9B8BC5 0%, #7C5FBA 100%)",
          }}
        >
          <Sparkles style={{ width: "18px", height: "18px" }} />
          Scopri con l'AI
        </button>
      </div>

      {/* Destination Cards - HORIZONTAL LAYOUT (image left, text right) */}
      <div className="space-y-3">
        {destinazioni.map((dest, index) => (
          <Link key={dest.id} href={`/destinazioni/${dest.slug}`}>
            <div
              className="card-shadow cursor-pointer flex gap-4"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "20px",
                border: "1px solid #F0F0EB",
                padding: "12px",
                overflow: "hidden",
              }}
            >
              {/* Image - square on left */}
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "16px",
                  backgroundColor: "#E8F5F0",
                  flexShrink: 0,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {dest.imageUrl ? (
                  <img
                    src={dest.imageUrl}
                    alt={dest.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MapPin style={{ width: "32px", height: "32px", color: "#7C5FBA" }} />
                  </div>
                )}

                {/* Trending Badge */}
                {trendingIds.includes(dest.id) && (
                  <div
                    style={{
                      position: "absolute",
                      top: "8px",
                      left: "8px",
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor: "#E8A855",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TrendingUp style={{ width: "14px", height: "14px", color: "#FFFFFF" }} />
                  </div>
                )}
              </div>

              {/* Content */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                  <div>
                    <h3
                      className="font-sans font-semibold"
                      style={{ fontSize: "16px", color: "#1A1A1A", marginBottom: "2px" }}
                    >
                      {dest.name}
                    </h3>
                    <p
                      className="font-sans flex items-center gap-1"
                      style={{ fontSize: "13px", color: "#6B6B6B" }}
                    >
                      <MapPin style={{ width: "12px", height: "12px" }} />
                      {dest.region}
                    </p>
                  </div>

                  {/* Q-Score Badge - Mint Green */}
                  <div
                    style={{
                      padding: "6px 10px",
                      borderRadius: "14px",
                      backgroundColor: "#5FB89420",
                    }}
                  >
                    <span
                      className="font-sans font-bold"
                      style={{ fontSize: "13px", color: "#5FB894" }}
                    >
                      Q{dest.quietScore}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
