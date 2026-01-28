"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Navigation, MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface POI {
  id: string;
  name: string;
  type: string;
  quietScore: number;
  lat: number;
  lng: number;
  color: string;
}

function CenterMap({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 13);
  }, [center, map]);
  return null;
}

export default function MapView({
  userLocation,
  pois,
  selectedType,
}: {
  userLocation: [number, number] | null;
  pois: POI[];
  selectedType: string | null;
}) {
  const centerPosition: [number, number] = userLocation || [43.7696, 11.2558];
  const filteredPOIs = selectedType ? pois.filter((p) => p.type === selectedType) : pois;

  return (
    <MapContainer
      center={centerPosition}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CenterMap center={centerPosition} />

      {userLocation && (
        <Marker position={userLocation}>
          <Popup>La tua posizione</Popup>
        </Marker>
      )}

      {filteredPOIs.map((poi) => (
        <Marker key={poi.id} position={[poi.lat, poi.lng]}>
          <Popup>
            <div style={{ minWidth: "150px" }}>
              <h3 className="font-sans font-semibold" style={{ fontSize: "14px" }}>
                {poi.name}
              </h3>
              <p className="font-sans" style={{ fontSize: "12px", color: "#6B6B6B" }}>
                {poi.type}
              </p>
              <div
                style={{
                  marginTop: "8px",
                  padding: "4px 8px",
                  borderRadius: "8px",
                  backgroundColor: `${poi.color}20`,
                  display: "inline-block",
                }}
              >
                <span style={{ fontSize: "12px", fontWeight: 600, color: poi.color }}>
                  Q{poi.quietScore}
                </span>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
