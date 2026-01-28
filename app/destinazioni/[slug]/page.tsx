import { notFound } from "next/navigation";
import { MapPin, Leaf, ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SaveDestinationButton } from "@/components/save-destination-button";
import fs from "fs";
import path from "path";

// Load static destinations for fallback
const STATIC_DESTINATIONS = (() => {
  try {
    const filePath = path.join(process.cwd(), "public", "destinations.json");
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
  } catch (e) {
    console.error("Error loading static destinations:", e);
  }
  return null;
})();

export default async function DestinazionePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  let destination: any = null;

  try {
    const { prisma } = await import("@/lib/prisma");
    destination = await prisma.destination.findUnique({
      where: { slug: params.slug },
      include: {
        pois: { orderBy: { quietScore: "desc" }, take: 6 },
        tours: { take: 3 },
        _count: { select: { savedDestinations: true } },
      },
    });
  } catch (e) {
    console.warn("DB not available, using static data:", e);
  }

  // Fallback to static JSON
  if (!destination && STATIC_DESTINATIONS) {
    destination = STATIC_DESTINATIONS.find((d: any) => d.slug === params.slug);
    if (destination) {
      destination = {
        ...destination,
        pois: [],
        tours: [],
        _count: { savedDestinations: 0 },
      };
    }
  }

  if (!destination) {
    notFound();
  }

  // Mock POIs and tours for static destinations
  const pois = destination.pois?.length > 0 ? destination.pois : [
    { id: "1", name: "Centro Storico", type: "Cultura", quietScore: destination.quietScore - 5, lat: null, lng: null, color: "#7C5FBA" },
    { id: "2", name: "Parco Naturale", type: "Natura", quietScore: destination.quietScore + 5, lat: null, lng: null, color: "#5FB894" },
  ];
  const tours = destination.tours?.length > 0 ? destination.tours : [];

  return (
    <div className="min-h-screen pb-24">
      {/* Hero */}
      <div
        style={{
          height: "280px",
          background: destination.imageUrl
            ? `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 100%), url(${destination.imageUrl})`
            : `linear-gradient(135deg, #7C5FBA 0%, #9B7FD9 100%)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <Link
          href="/ispirazioni"
          className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 rounded-full bg-white/90 backdrop-blur-sm"
          style={{ zIndex: 10 }}
        >
          <ArrowLeft style={{ width: "18px", height: "18px", color: "#1A1A1A" }} />
          <span className="font-sans font-medium" style={{ fontSize: "13px", color: "#1A1A1A" }}>Indietro</span>
        </Link>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="font-serif font-bold mb-1" style={{ fontSize: "28px", color: "#FFFFFF", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
                {destination.name}
              </h1>
              <p className="font-sans flex items-center gap-1" style={{ fontSize: "14px", color: "rgba(255,255,255,0.9)", textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
                <MapPin style={{ width: "14px", height: "14px" }} />
                {destination.region}
              </p>
            </div>
            <div
              style={{
                padding: "8px 14px",
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
            >
              <Leaf style={{ width: "18px", height: "18px", color: "#5FB894" }} />
              <span className="font-sans font-bold" style={{ fontSize: "18px", color: "#5FB894" }}>
                Q{destination.quietScore}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-around py-4 px-4" style={{ backgroundColor: "#FFFFFF", marginTop: "-8px", borderRadius: "24px 24px 0 0" }}>
        <div style={{ textAlign: "center" }}>
          <div className="font-serif font-bold" style={{ fontSize: "20px", color: "#7C5FBA" }}>{destination._count?.savedDestinations || 0}</div>
          <div className="font-sans" style={{ fontSize: "12px", color: "#6B6B6B" }}>Salvata da</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div className="font-serif font-bold" style={{ fontSize: "20px", color: "#1A1A1A" }}>{pois.length}</div>
          <div className="font-sans" style={{ fontSize: "12px", color: "#6B6B6B" }}>Luoghi da scoprire</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div className="font-serif font-bold" style={{ fontSize: "20px", color: "#1A1A1A" }}>{tours.length}</div>
          <div className="font-sans" style={{ fontSize: "12px", color: "#6B6B6B" }}>Tour disponibili</div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 py-3 flex gap-3">
        <Link
          href="/pianifica"
          className="flex-1 flex items-center justify-center gap-2 font-sans font-semibold"
          style={{
            height: "48px",
            backgroundColor: "#7C5FBA",
            borderRadius: "24px",
            fontSize: "15px",
            color: "#FFFFFF",
          }}
        >
          <Calendar style={{ width: "18px", height: "18px" }} />
          Pianifica viaggio
        </Link>
        <SaveDestinationButton destinationId={destination.id} />
      </div>

      {/* Description */}
      <div className="px-4 py-2">
        <p className="font-sans" style={{ fontSize: "15px", color: "#1A1A1A", lineHeight: "24px" }}>
          {destination.description || `${destination.name} è un bellissimo comune della regione ${destination.region}.`}
        </p>
      </div>

      {/* POIs */}
      <div className="px-4 py-4">
        <h2 className="font-sans font-semibold mb-3" style={{ fontSize: "18px", color: "#1A1A1A" }}>Luoghi da scoprire</h2>
        <div className="space-y-3">
          {pois.map((poi: any) => (
            <div
              key={poi.id}
              className="card-shadow flex items-center gap-3 p-3"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  backgroundColor: `${poi.color || "#7C5FBA"}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MapPin style={{ width: "24px", height: "24px", color: poi.color || "#7C5FBA" }} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 className="font-sans font-semibold" style={{ fontSize: "15px", color: "#1A1A1A" }}>{poi.name}</h3>
                <p className="font-sans" style={{ fontSize: "13px", color: "#6B6B6B" }}>{poi.type}</p>
              </div>
              <div
                style={{
                  padding: "4px 10px",
                  backgroundColor: "#5FB89420",
                  borderRadius: "12px",
                }}
              >
                <span className="font-sans font-bold" style={{ fontSize: "13px", color: "#5FB894" }}>Q{poi.quietScore}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
