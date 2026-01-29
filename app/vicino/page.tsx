"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { Navigation, MapPin, Filter } from "lucide-react";

const MapView = dynamic(() => import("@/components/map-view"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "280px",
        borderRadius: "24px",
        background: "linear-gradient(135deg, #E8F5F0 0%, #E0F0FA 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <MapPin style={{ width: "48px", height: "48px", color: "#7C5FBA", margin: "0 auto 12px" }} />
        <p className="font-sans" style={{ fontSize: "14px", color: "#6B6B6B" }}>
          Caricamento mappa...
        </p>
      </div>
    </div>
  ),
});

interface POI {
  id: string;
  name: string;
  slug: string;
  type: string;
  quietScore: number;
  lat: number;
  lng: number;
  color: string;
  region: string;
}

// Calculate distance in km between two points
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function VicinoPage() {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [destinations, setDestinations] = useState<POI[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [locationName, setLocationName] = useState<string>("");

  useEffect(() => {
    fetch("/destinations.json")
      .then((res) => res.json())
      .then((data) => {
        const pois: POI[] = data
          .filter((d: any) => d.lat && d.lng)
          .map((d: any) => ({
            id: d.id,
            name: d.name,
            slug: d.slug,
            type: "Destinazione",
            quietScore: d.quietScore,
            lat: d.lat,
            lng: d.lng,
            color: d.quietScore >= 90 ? "#5FB894" : d.quietScore >= 70 ? "#E8A855" : "#7C5FBA",
            region: d.region,
          }));
        setDestinations(pois);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setUserLocation([lat, lng]);
          setLocationName("La tua posizione");
        },
        () => {
          // Default to center of Italy if denied
          const defaultLoc: [number, number] = [41.9028, 12.4964]; // Roma
          setUserLocation(defaultLoc);
          setLocationName("Roma (default)");
        }
      );
    } else {
      const defaultLoc: [number, number] = [41.9028, 12.4964];
      setUserLocation(defaultLoc);
      setLocationName("Roma (default)");
    }
  };

  // Sort POIs by distance from user location
  const sortedAndFilteredPOIs = useMemo(() => {
    let filtered = selectedType ? destinations.filter((p) => p.type === selectedType) : destinations;

    if (userLocation) {
      filtered = filtered.map((poi) => ({
        ...poi,
        distance: calculateDistance(userLocation[0], userLocation[1], poi.lat, poi.lng),
      }));
      filtered.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    return filtered;
  }, [destinations, selectedType, userLocation]);

  return (
    <div className="min-h-screen px-6 pt-4 pb-24">
      {/* Header */}
      <div className="mb-4">
        <h1 className="font-serif font-bold mb-1" style={{ fontSize: "28px", color: "#1A1A1A" }}>
          Vicino a te
        </h1>
        <p className="font-sans" style={{ fontSize: "14px", color: "#6B6B6B" }}>
          Scopri luoghi quiet nelle vicinanze
        </p>
      </div>

      {/* Location Button */}
      <button
        onClick={getLocation}
        className="card-shadow w-full font-sans font-medium flex items-center justify-center gap-2 mb-4"
        style={{
          height: "48px",
          backgroundColor: "#FFFFFF",
          border: "1px solid #E5E5E0",
          borderRadius: "24px",
          fontSize: "14px",
          color: "#1A1A1A",
        }}
      >
        <Navigation style={{ width: "18px", height: "18px", color: "#7C5FBA" }} />
        {userLocation ? (locationName || "Posizione aggiornata ✓") : "Usa la mia posizione"}
      </button>

      {/* Filters Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="w-full font-sans font-medium flex items-center justify-center gap-2 mb-4"
        style={{
          height: "40px",
          backgroundColor: showFilters ? "#7C5FBA" : "#F5F5F0",
          borderRadius: "20px",
          fontSize: "13px",
          color: showFilters ? "#FFFFFF" : "#1A1A1A",
        }}
      >
        <Filter style={{ width: "16px", height: "16px" }} />
        Filtra per tipo
      </button>

      {/* Filters */}
      {showFilters && (
        <div className="flex gap-2 mb-4 flex-wrap">
          {["Destinazione", "Natura", "Food", "Cultura"].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(selectedType === type ? null : type)}
              style={{
                padding: "8px 16px",
                backgroundColor: selectedType === type ? "#7C5FBA" : "#FFFFFF",
                border: `1px solid ${selectedType === type ? "#7C5FBA" : "#E5E5E0"}`,
                borderRadius: "20px",
                fontSize: "13px",
                color: selectedType === type ? "#FFFFFF" : "#1A1A1A",
              }}
            >
              {type}
            </button>
          ))}
        </div>
      )}

      {/* Map */}
      <div
        className="mb-4 overflow-hidden"
        style={{
          height: "280px",
          borderRadius: "24px",
          border: "1px solid #E5E5E0",
        }}
      >
        {loading ? (
          <div
            style={{
              height: "280px",
              borderRadius: "24px",
              background: "linear-gradient(135deg, #E8F5F0 0%, #E0F0FA 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <MapPin style={{ width: "48px", height: "48px", color: "#7C5FBA", margin: "0 auto 12px" }} />
              <p className="font-sans" style={{ fontSize: "14px", color: "#6B6B6B" }}>
                Caricamento...
              </p>
            </div>
          </div>
        ) : (
          <MapView userLocation={userLocation} pois={sortedAndFilteredPOIs} selectedType={selectedType} />
        )}
      </div>

      {/* POI List */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 className="font-sans font-semibold" style={{ fontSize: "18px", color: "#1A1A1A" }}>
            {userLocation ? "Più vicini a te" : "Luoghi nelle vicinanze"}
          </h2>
          <span className="font-sans" style={{ fontSize: "12px", color: "#6B6B6B" }}>
            {sortedAndFilteredPOIs.length} risultati
          </span>
        </div>

        <div className="space-y-3">
          {sortedAndFilteredPOIs.slice(0, 10).map((poi) => (
            <a
              key={poi.id}
              href={`/destinazioni/${poi.slug}`}
              className="card-shadow block"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "20px",
                border: "1px solid #F0F0EB",
                padding: "16px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "16px",
                  backgroundColor: `${poi.color}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <MapPin style={{ width: "24px", height: "24px", color: poi.color }} />
              </div>

              <div style={{ flex: 1 }}>
                <h3 className="font-sans font-semibold" style={{ fontSize: "16px", color: "#1A1A1A", marginBottom: "2px" }}>
                  {poi.name}
                </h3>
                <div className="font-sans" style={{ fontSize: "13px", color: "#6B6B6B" }}>
                  {poi.region} • {poi.type}
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    padding: "6px 10px",
                    borderRadius: "14px",
                    backgroundColor: `${poi.color}20`,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    marginBottom: "4px",
                  }}
                >
                  <span style={{ fontSize: "12px", fontWeight: 600, color: poi.color }}>
                    Q{poi.quietScore}
                  </span>
                </div>
                {poi.distance !== undefined && (
                  <div className="font-sans" style={{ fontSize: "11px", color: "#6B6B6B" }}>
                    {poi.distance < 1
                      ? `${Math.round(poi.distance * 1000)}m`
                      : `${poi.distance.toFixed(1)} km`}
                  </div>
                )}
              </div>
            </a>
          ))}

          {sortedAndFilteredPOIs.length === 0 && !loading && (
            <div
              style={{
                textAlign: "center",
                padding: "40px 20px",
                color: "#6B6B6B",
              }}
            >
              <MapPin style={{ width: "48px", height: "48px", margin: "0 auto 12px", opacity: 0.5 }} />
              <p className="font-sans" style={{ fontSize: "14px" }}>
                Nessun luogo trovato
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
