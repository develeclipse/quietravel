"use client";

import { useState, useEffect } from "react";
import { Navigation, MapPin, Filter } from "lucide-react";

interface POI {
  id: string;
  name: string;
  type: string;
  quietScore: number;
  lat: number;
  lng: number;
  color: string;
}

const mockPOIs: POI[] = [
  { id: "1", name: "Giardino delle Rose", type: "Natura", quietScore: 92, lat: 43.723, lng: 11.203, color: "#5FB894" },
  { id: "2", name: "Caffè del Teatro", type: "Food", quietScore: 78, lat: 43.769, lng: 11.255, color: "#E8A855" },
  { id: "3", name: "Chiesa di San Michele", type: "Cultura", quietScore: 88, lat: 43.718, lng: 11.229, color: "#7C5FBA" },
  { id: "4", name: "Parco della Mansuè", type: "Natura", quietScore: 85, lat: 43.731, lng: 11.198, color: "#5FB894" },
  { id: "5", name: "Osteria del Cacio", type: "Food", quietScore: 82, lat: 43.768, lng: 11.252, color: "#E8A855" },
];

export default function VicinoPage() {
  const [userLocation, setUserLocation] = useState<string>("43.7696,11.2558");
  const [pois] = useState(mockPOIs);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation(`${latitude},${longitude}`);
        },
        () => {
          setUserLocation("43.7696,11.2558");
        }
      );
    } else {
      setUserLocation("43.7696,11.2558");
    }
  };

  const filteredPOIs = selectedType
    ? pois.filter((p) => p.type === selectedType)
    : pois;

  return (
    <div className="min-h-screen px-6 pt-4 pb-24">
      {/* Header */}
      <div className="mb-4">
        <h1 className="font-serif font-bold mb-1" style={{ fontSize: "28px", color: "#1A1A1A" }}>
          Vicino a te
        </h1>
        <p className="font-sans" style={{ fontSize: "14px", color: "#6B6B6B" }}>
          Scopri luoghi quiet nella tua zona
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
        {userLocation !== "43.7696,11.2558" ? "Posizione aggiornata" : "Usa la mia posizione"}
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
          {["Natura", "Food", "Cultura"].map((type) => (
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

      {/* Map iframe */}
      <div
        className="mb-4 overflow-hidden"
        style={{
          height: "280px",
          borderRadius: "24px",
          border: "1px solid #E5E5E0",
        }}
      >
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(userLocation.split(",")[1]) - 0.02},${parseFloat(userLocation.split(",")[0]) - 0.02},${parseFloat(userLocation.split(",")[1]) + 0.02},${parseFloat(userLocation.split(",")[0]) + 0.02}&layer=mapnik&marker=${userLocation}`}
        />
      </div>

      {/* POI List */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 className="font-sans font-semibold" style={{ fontSize: "18px", color: "#1A1A1A" }}>
            Luoghi nelle vicinanze
          </h2>
          <span className="font-sans" style={{ fontSize: "12px", color: "#6B6B6B" }}>
            {filteredPOIs.length} risultati
          </span>
        </div>

        <div className="space-y-3">
          {filteredPOIs.map((poi) => (
            <div
              key={poi.id}
              className="card-shadow cursor-pointer"
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
                  {poi.type}
                </div>
              </div>

              <div
                style={{
                  padding: "6px 10px",
                  borderRadius: "14px",
                  backgroundColor: `${poi.color}20`,
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span style={{ fontSize: "12px", fontWeight: 600, color: poi.color }}>
                  Q{poi.quietScore}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
