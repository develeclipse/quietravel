"use client";

import { useState, useEffect } from "react";
import { Sparkles, MapPin, TrendingUp, ChevronDown, Calendar, Filter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Collections data
const COLLECTIONS = [
  {
    id: "sud-italia",
    name: "Sud Italia segreto",
    subtitle: "10 perle nascoste",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80",
    color: "#7C5FBA",
  },
  {
    id: "mare-fuori-stagione",
    name: "Mare fuori stagione",
    subtitle: "Spiagge deserte",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    color: "#5FB894",
  },
  {
    id: "sapori-autentici",
    name: "Sapori autentici d'Italia",
    subtitle: "Sagre e mercati",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    color: "#E8A855",
  },
  {
    id: "capolavori-rinascimento",
    name: "Capolavori del Rinascimento",
    subtitle: "Città d'arte",
    image: "https://images.unsplash.com/photo-1548544149-4835e62ee5b3?w=800&q=80",
    color: "#D9534F",
  },
];

// Stories data
const STORIES = [
  {
    id: 1,
    title: "Weekend quiet in Abruzzo",
    excerpt: "Tra monti e borghi silenziosi...",
    image: "https://images.unsplash.com/photo-1533052509036-6113932b4128?w=400&q=80",
    readTime: "5 min",
    quietScore: 92,
  },
  {
    id: 2,
    title: "I borghi più belli d'Italia",
    excerpt: "Esplorando la via Francigena...",
    image: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=400&q=80",
    readTime: "8 min",
    quietScore: 88,
  },
];

// Category filters
const CATEGORIES = [
  { id: "tutti", label: "Tutti", icon: "sparkles" },
  { id: "arte-storia", label: "Arte & Storia", icon: "building" },
  { id: "natura", label: "Natura", icon: "leaf" },
  { id: "food", label: "Food", icon: "utensils" },
  { id: "mare", label: "Mare", icon: "wave" },
];

interface Destination {
  id: string;
  name: string;
  slug: string;
  region: string;
  quietScore: number;
  subtitle?: string;
  imageUrl?: string;
}

export default function IspirazioniPage() {
  const [activeTab, setActiveTab] = useState<"collezioni" | "storie" | "destinazioni">("collezioni");
  const [selectedCategory, setSelectedCategory] = useState("tutti");
  const [quietScore, setQuietScore] = useState(30);
  const [showFilters, setShowFilters] = useState(false);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/destinations.json")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.slice(0, 100).map((d: any) => ({
          id: d.id,
          name: d.name,
          slug: d.slug,
          region: d.region,
          quietScore: d.quietScore,
          subtitle: d.subtitle,
          imageUrl: d.imageUrl,
        }));
        setDestinations(formatted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredDestinations = destinations.filter((d) => d.quietScore >= quietScore);

  return (
    <div className="min-h-screen px-4 pt-4 pb-24" style={{ backgroundColor: "#F8F5F1" }}>
      {/* Header */}
      <div className="mb-4">
        <h1 className="font-serif font-bold" style={{ fontSize: "28px", color: "#1A1A1A" }}>
          Destinazioni Quiet
        </h1>
        <p className="font-sans" style={{ fontSize: "14px", color: "#6B6B6B" }}>
          Scopri l'Italia nascosta
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div
          className="flex items-center gap-3 px-4"
          style={{
            height: "48px",
            backgroundColor: "#FFFFFF",
            borderRadius: "24px",
            border: "1px solid #E5E5E0",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Cerca collezioni, regioni, città..."
            className="flex-1 font-sans"
            style={{ fontSize: "14px", border: "none", outline: "none" }}
          />
        </div>
      </div>

      {/* Filter Button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="w-full flex items-center justify-between mb-4 px-4"
        style={{
          height: "44px",
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          border: "1px solid #E5E5E0",
        }}
      >
        <div className="flex items-center gap-2">
          <Filter style={{ width: "16px", height: "16px", color: "#7C5FBA" }} />
          <span className="font-sans font-medium" style={{ fontSize: "14px", color: "#1A1A1A" }}>
            Quiet Score & Date
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="font-sans font-semibold px-2 py-0.5 rounded-full"
            style={{
              fontSize: "12px",
              backgroundColor: quietScore > 30 ? "#7C5FBA" : "#E5E5E0",
              color: quietScore > 30 ? "#FFFFFF" : "#6B6B6B",
            }}
          >
            Q{quietScore}+
          </span>
          <ChevronDown
            style={{
              width: "16px",
              height: "16px",
              color: "#6B6B6B",
              transform: showFilters ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          />
        </div>
      </button>

      {/* Filters Panel */}
      {showFilters && (
        <div
          className="mb-4 p-4"
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "20px",
            border: "1px solid #E5E5E0",
          }}
        >
          {/* Quiet Score Slider */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-sans font-medium" style={{ fontSize: "14px", color: "#1A1A1A" }}>
                Quiet Score minimo
              </span>
              <span
                className="font-sans font-semibold px-3 py-1 rounded-lg"
                style={{ fontSize: "14px", backgroundColor: "#5FB89420", color: "#5FB894" }}
              >
                Q{quietScore}+
              </span>
            </div>
            <input
              type="range"
              min="30"
              max="95"
              value={quietScore}
              onChange={(e) => setQuietScore(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: "#7C5FBA" }}
            />
          </div>

          {/* Date Filter */}
          <div>
            <span className="font-sans font-medium block mb-2" style={{ fontSize: "14px", color: "#1A1A1A" }}>
              Periodo del viaggio
            </span>
            <div className="flex gap-2 mb-3">
              <button
                className="flex-1 font-sans font-medium"
                style={{
                  padding: "10px",
                  borderRadius: "12px",
                  fontSize: "13px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E5E0",
                  color: "#1A1A1A",
                }}
              >
                Tutti
              </button>
              <button
                className="flex-1 font-sans font-medium"
                style={{
                  padding: "10px",
                  borderRadius: "12px",
                  fontSize: "13px",
                  backgroundColor: "#F5F5F0",
                  border: "1px solid transparent",
                  color: "#6B6B6B",
                }}
              >
                Seleziona mesi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Tabs */}
      <div className="flex gap-6 mb-4 border-b" style={{ borderColor: "#E5E5E0" }}>
        {[
          { id: "collezioni", label: "Collezioni", icon: "sparkles" },
          { id: "storie", label: "Storie", icon: "book" },
          { id: "destinazioni", label: "Destinazioni", icon: "building" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className="flex items-center gap-2 pb-3"
            style={{
              borderBottom: activeTab === tab.id ? "2px solid #7C5FBA" : "2px solid transparent",
              marginBottom: "-2px",
            }}
          >
            {tab.icon === "sparkles" && (
              <Sparkles style={{ width: "16px", height: "16px", color: activeTab === tab.id ? "#7C5FBA" : "#6B6B6B" }} />
            )}
            {tab.icon === "book" && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={activeTab === tab.id ? "#7C5FBA" : "#6B6B6B"} strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            )}
            {tab.icon === "building" && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={activeTab === tab.id ? "#7C5FBA" : "#6B6B6B"} strokeWidth="2">
                <path d="M3 21h18" />
                <path d="M5 21V7l8-4v18" />
                <path d="M19 21V11l-6-4" />
                <path d="M9 9v.01" />
                <path d="M9 12v.01" />
                <path d="M9 15v.01" />
                <path d="M9 18v.01" />
              </svg>
            )}
            <span
              className="font-sans font-medium"
              style={{
                fontSize: "14px",
                color: activeTab === tab.id ? "#1A1A1A" : "#6B6B6B",
              }}
            >
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className="flex items-center gap-2 px-4 py-2 flex-shrink-0"
            style={{
              borderRadius: "20px",
              fontSize: "13px",
              backgroundColor: selectedCategory === cat.id ? "#7C5FBA" : "#FFFFFF",
              border: `1px solid ${selectedCategory === cat.id ? "#7C5FBA" : "#E5E5E0"}`,
              color: selectedCategory === cat.id ? "#FFFFFF" : "#1A1A1A",
            }}
          >
            {cat.icon === "sparkles" && <Sparkles style={{ width: "14px", height: "14px" }} />}
            {cat.icon === "building" && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 21h18" />
                <path d="M5 21V7l8-4v18" />
                <path d="M19 21V11l-6-4" />
              </svg>
            )}
            {cat.icon === "leaf" && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
            )}
            {cat.icon === "utensils" && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                <path d="M7 2v20" />
                <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
              </svg>
            )}
            {cat.icon === "wave" && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 12c.6-.5 1.2-1 2.5-1 2.5 0 2.5 2 5 2 2.6 0 2.6-2 5-2 2.5 0 2.5 2 5 2 1.3 0 1.9-.5 2.5-1" />
                <path d="M2 7c.6-.5 1.2-1 2.5-1 2.5 0 2.5 2 5 2 2.6 0 2.6-2 5-2 2.5 0 2.5 2 5 2 1.3 0 1.9-.5 2.5-1" />
                <path d="M2 17c.6-.5 1.2-1 2.5-1 2.5 0 2.5 2 5 2 2.6 0 2.6-2 5-2 2.5 0 2.5 2 5 2 1.3 0 1.9-.5 2.5-1" />
              </svg>
            )}
            {cat.label}
          </button>
        ))}
      </div>

      {/* COLLEZIONI Content */}
      {activeTab === "collezioni" && (
        <div>
          <h2 className="font-serif font-bold mb-2" style={{ fontSize: "22px", color: "#1A1A1A" }}>
            Collezioni curate
          </h2>
          <p className="font-sans mb-4" style={{ fontSize: "14px", color: "#6B6B6B" }}>
            Storie e guide selezionate per ispirarti a scoprire l'Italia nascosta
          </p>

          <div className="space-y-4">
            {COLLECTIONS.map((collection) => (
              <div
                key={collection.id}
                className="relative overflow-hidden"
                style={{
                  borderRadius: "24px",
                  height: "180px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 100%), url(${collection.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "20px",
                  }}
                >
                  <h3 className="font-serif font-semibold mb-1" style={{ fontSize: "20px", color: "#FFFFFF" }}>
                    {collection.name}
                  </h3>
                  <p className="font-sans" style={{ fontSize: "14px", color: "rgba(255,255,255,0.9)" }}>
                    {collection.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STORIE Content */}
      {activeTab === "storie" && (
        <div>
          <h2 className="font-serif font-bold mb-2" style={{ fontSize: "22px", color: "#1A1A1A" }}>
            Storie e guide
          </h2>
          <p className="font-sans mb-4" style={{ fontSize: "14px", color: "#6B6B6B" }}>
            Leggi e lasciati ispirare
          </p>

          <div className="space-y-4">
            {STORIES.map((story) => (
              <div
                key={story.id}
                className="card-shadow flex overflow-hidden"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "20px",
                }}
              >
                <div
                  style={{
                    width: "100px",
                    flexShrink: 0,
                    backgroundImage: `url(${story.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="p-4 flex-1">
                  <h3 className="font-sans font-semibold mb-1" style={{ fontSize: "15px", color: "#1A1A1A" }}>
                    {story.title}
                  </h3>
                  <p className="font-sans mb-2" style={{ fontSize: "13px", color: "#6B6B6B" }}>
                    {story.excerpt}
                  </p>
                  <div className="flex items-center gap-3">
                    <span
                      className="font-sans font-semibold px-2 py-0.5 rounded-full"
                      style={{ fontSize: "11px", backgroundColor: "#5FB89420", color: "#5FB894" }}
                    >
                      Q{story.quietScore}
                    </span>
                    <span className="font-sans" style={{ fontSize: "12px", color: "#6B6B6B" }}>
                      {story.readTime}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DESTINAZIONI Content */}
      {activeTab === "destinazioni" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-serif font-bold" style={{ fontSize: "22px", color: "#1A1A1A" }}>
              Tutte le destinazioni
            </h2>
            <span className="font-sans" style={{ fontSize: "13px", color: "#6B6B6B" }}>
              {filteredDestinations.length} risultati
            </span>
          </div>

          <div className="space-y-3">
            {loading ? (
              <div className="text-center py-8">
                <p className="font-sans" style={{ fontSize: "14px", color: "#6B6B6B" }}>Caricamento...</p>
              </div>
            ) : (
              filteredDestinations.slice(0, 20).map((dest, index) => (
                <Link
                  key={dest.id}
                  href={`/destinazioni/${dest.slug}`}
                  className="card-shadow flex items-center gap-3 p-3"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "20px",
                    border: "1px solid #F0F0EB",
                  }}
                >
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "16px",
                      backgroundColor: dest.quietScore >= 90 ? "#5FB894" : dest.quietScore >= 70 ? "#E8A855" : "#7C5FBA",
                      opacity: 0.15,
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div className="flex items-center gap-2">
                      <h3 className="font-sans font-semibold" style={{ fontSize: "15px", color: "#1A1A1A" }}>
                        {dest.name}
                      </h3>
                      {index < 2 && (
                        <span
                          className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                          style={{ fontSize: "10px", backgroundColor: "#E8A85520", color: "#E8A855" }}
                        >
                          <TrendingUp style={{ width: "10px", height: "10px" }} />
                          In tendenza
                        </span>
                      )}
                    </div>
                    <p className="font-sans flex items-center gap-1" style={{ fontSize: "13px", color: "#6B6B6B" }}>
                      <MapPin style={{ width: "12px", height: "12px" }} />
                      {dest.region}
                    </p>
                  </div>
                  <div
                    className="flex items-center gap-1 px-2 py-1 rounded-full"
                    style={{ backgroundColor: "#5FB89420" }}
                  >
                    <span className="font-sans font-bold" style={{ fontSize: "13px", color: "#5FB894" }}>
                      Q{dest.quietScore}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
