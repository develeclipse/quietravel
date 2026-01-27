import { notFound } from "next/navigation";
import { MapPin, Leaf, ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { SaveDestinationButton } from "@/components/save-destination-button";

export default async function DestinazionePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const destination = await prisma.destination.findUnique({
    where: { slug: params.slug },
    include: {
      pois: {
        orderBy: {
          quietScore: "desc",
        },
        take: 6,
      },
      tours: {
        take: 3,
      },
      _count: {
        select: {
          savedDestinations: true,
        },
      },
    },
  });

  if (!destination) {
    notFound();
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Hero Image */}
      <div className="relative h-80 w-full">
        {destination.imageUrl ? (
          <Image
            src={destination.imageUrl}
            alt={destination.name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, #E8F5F0 0%, #E0F0FA 100%)",
            }}
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Back Button */}
        <Link
          href="/ispirazioni"
          className="absolute top-6 left-6 w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full"
        >
          <ArrowLeft style={{ width: "20px", height: "20px", color: "#FFFFFF" }} />
        </Link>

        {/* Title Overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <h1
            className="font-serif font-bold mb-2"
            style={{
              fontSize: "32px",
              lineHeight: "38px",
              color: "#FFFFFF",
              textShadow: "0 2px 12px rgba(0,0,0,0.4)",
            }}
          >
            {destination.name}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              className="score-gradient flex items-center gap-1"
              style={{
                padding: "6px 12px",
                borderRadius: "16px",
              }}
            >
              <Leaf style={{ width: "14px", height: "14px", color: "#FFFFFF" }} />
              <span className="font-sans font-bold" style={{ fontSize: "14px", color: "#FFFFFF" }}>
                {destination.quietScore}
              </span>
            </div>
            <div
              className="font-sans"
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.9)",
                textShadow: "0 1px 4px rgba(0,0,0,0.3)",
              }}
            >
              <MapPin
                style={{
                  width: "14px",
                  height: "14px",
                  display: "inline",
                  marginRight: "4px",
                }}
              />
              {destination.province || destination.region}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-6">
        {/* Stats Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div className="font-sans font-bold" style={{ fontSize: "24px", color: "#1A1A1A" }}>
              {destination._count.savedDestinations}
            </div>
            <div className="font-sans" style={{ fontSize: "12px", color: "#6B6B6B" }}>
              Salvata da
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div className="font-sans font-bold" style={{ fontSize: "24px", color: "#1A1A1A" }}>
              {destination.pois.length}
            </div>
            <div className="font-sans" style={{ fontSize: "12px", color: "#6B6B6B" }}>
              Luoghi
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div className="font-sans font-bold" style={{ fontSize: "24px", color: "#1A1A1A" }}>
              {destination.tours.length}
            </div>
            <div className="font-sans" style={{ fontSize: "12px", color: "#6B6B6B" }}>
              Tour
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "32px" }}>
          <button
            className="btn-gradient font-sans font-semibold flex items-center justify-center gap-2"
            style={{
              height: "48px",
              borderRadius: "24px",
              fontSize: "14px",
              color: "#FFFFFF",
              border: "none",
            }}
          >
            <Calendar style={{ width: "18px", height: "18px" }} />
            Pianifica
          </button>
          <SaveDestinationButton destinationId={destination.id} />
        </div>

        {/* Description */}
        <div style={{ marginBottom: "32px" }}>
          <h2 className="font-sans font-semibold mb-3" style={{ fontSize: "18px", color: "#1A1A1A" }}>
            Perché scegliere {destination.name}
          </h2>
          <p
            className="font-sans"
            style={{
              fontSize: "14px",
              lineHeight: "22px",
              color: "#6B6B6B",
            }}
          >
            {destination.description}
          </p>
        </div>

        {/* POI List */}
        {destination.pois.length > 0 && (
          <div style={{ marginBottom: "32px" }}>
            <h2 className="font-sans font-semibold mb-4" style={{ fontSize: "18px", color: "#1A1A1A" }}>
              Luoghi da scoprire
            </h2>
            <div className="space-y-3">
              {destination.pois.map((poi) => (
                <div
                  key={poi.id}
                  className="card-shadow"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "16px",
                    border: "1px solid #F0F0EB",
                    padding: "16px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "8px" }}>
                    <div>
                      <h3 className="font-sans font-semibold mb-1" style={{ fontSize: "16px", color: "#1A1A1A" }}>
                        {poi.name}
                      </h3>
                      <div className="font-sans" style={{ fontSize: "12px", color: "#9B9B9B" }}>
                        {poi.type}
                      </div>
                    </div>
                    <div
                      className="score-gradient"
                      style={{
                        padding: "4px 8px",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Leaf style={{ width: "12px", height: "12px", color: "#FFFFFF" }} />
                      <span className="font-sans font-bold" style={{ fontSize: "12px", color: "#FFFFFF" }}>
                        {poi.quietScore}
                      </span>
                    </div>
                  </div>
                  {poi.description && (
                    <p className="font-sans" style={{ fontSize: "13px", color: "#6B6B6B", lineHeight: "18px" }}>
                      {poi.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tours */}
        {destination.tours.length > 0 && (
          <div>
            <h2 className="font-sans font-semibold mb-4" style={{ fontSize: "18px", color: "#1A1A1A" }}>
              Tour consigliati
            </h2>
            <div className="space-y-3">
              {destination.tours.map((tour) => (
                <div
                  key={tour.id}
                  className="card-shadow"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "16px",
                    border: "1px solid #F0F0EB",
                    padding: "16px",
                  }}
                >
                  <h3 className="font-sans font-semibold mb-2" style={{ fontSize: "16px", color: "#1A1A1A" }}>
                    {tour.name}
                  </h3>
                  <div className="font-sans mb-2" style={{ fontSize: "13px", color: "#6B6B6B" }}>
                    {tour.description}
                  </div>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {tour.mood.map((m) => (
                      <span
                        key={m}
                        style={{
                          padding: "4px 10px",
                          backgroundColor: "rgba(124, 95, 186, 0.08)",
                          borderRadius: "12px",
                          fontSize: "11px",
                          color: "#7C5FBA",
                          fontWeight: "600",
                        }}
                      >
                        {m}
                      </span>
                    ))}
                    <span
                      style={{
                        padding: "4px 10px",
                        backgroundColor: "#F5F5F0",
                        borderRadius: "12px",
                        fontSize: "11px",
                        color: "#6B6B6B",
                        fontWeight: "600",
                      }}
                    >
                      {tour.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
