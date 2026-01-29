"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Calendar, MapPin, Heart, X, ChevronDown, Check, RefreshCw, Sword } from "lucide-react";
import Link from "next/link";

interface TourCard {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  quietScore: number;
  duration: string;
  pois: number;
  category: string;
}

const MOCK_TOURS: TourCard[] = [
  {
    id: "1",
    name: "Firenze: Rinascimento Quiet",
    subtitle: "Arte e cultura lontano dalle folle",
    image: "https://images.unsplash.com/photo-1548544149-4835e62ee5b3?w=800&q=80",
    quietScore: 85,
    duration: "3 giorni",
    pois: 9,
    category: "Culturale",
  },
  {
    id: "2",
    name: "Matera: Sassi & Silenzio",
    subtitle: "Storia millenaria in un'atmosfera unica",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80",
    quietScore: 92,
    duration: "2 giorni",
    pois: 6,
    category: "Storia",
  },
  {
    id: "3",
    name: "Dolomiti: Pace Naturale",
    subtitle: "Montagne e silenzio inebriante",
    image: "https://images.unsplash.com/photo-1533052509036-6113932b4128?w=800&q=80",
    quietScore: 98,
    duration: "4 giorni",
    pois: 12,
    category: "Natura",
  },
  {
    id: "4",
    name: "Chianti: Sapori Autentici",
    subtitle: "Vino, olio e tradizione toscana",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    quietScore: 88,
    duration: "3 giorni",
    pois: 8,
    category: "Food",
  },
  {
    id: "5",
    name: "Cinque Terre: Mare Segreto",
    subtitle: "Spiagge nascoste e borghi colorati",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    quietScore: 75,
    duration: "3 giorni",
    pois: 7,
    category: "Mare",
  },
];

export default function PianificaPage() {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    mood: "",
    duration: "",
    activities: [] as string[],
    region: "",
  });
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<TourCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchedTours, setMatchedTours] = useState<TourCard[]>([]);
  const [showMatchMode, setShowMatchMode] = useState(false);
  const [mode, setMode] = useState<"match" | "confronta" | "alternativa">("match");
  const [compareList, setCompareList] = useState<TourCard[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart || !cardRef.current) return;
    const touch = e.touches[0];
    const diff = touch.clientX - touchStart.x;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleSwipe("right");
      } else {
        handleSwipe("left");
      }
      setTouchStart(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right" && currentIndex < MOCK_TOURS.length) {
      setMatchedTours((prev) => [...prev, MOCK_TOURS[currentIndex]]);
    }
    setSwipeDirection(direction);
    setTimeout(() => {
      setSwipeDirection(null);
      setCurrentIndex((prev) => prev + 1);
    }, 200);
  };

  const moods = [
    { id: "relax", label: "Relax", desc: "Calma e tranquillità", emoji: "🧘" },
    { id: "avventura", label: "Avventura", desc: "Esplorazione e natura", emoji: "🏔️" },
    { id: "cultura", label: "Cultura", desc: "Storia e arte", emoji: "🏛️" },
    { id: "natura", label: "Natura", desc: "Paesaggi e green", emoji: "🌿" },
    { id: "food", label: "Food", desc: "Enogastronomia locale", emoji: "🍷" },
  ];

  const durations = [
    { id: "1-day", label: "1 giorno", icon: "📅" },
    { id: "2-3-days", label: "2-3 giorni", icon: "🗓️" },
    { id: "4-7-days", label: "4-7 giorni", icon: "📆" },
    { id: "week", label: "Settimana+", icon: "🗓️" },
  ];

  const activities = ["Natura", "Cultura", "Food", "Spiaggia", "Montagna", "Arte"];

  const generateTours = () => {
    setLoading(true);
    setTimeout(() => {
      setSuggestions(MOCK_TOURS);
      setCurrentIndex(0);
      setLoading(false);
      setShowMatchMode(true);
    }, 1500);
  };

  const currentTour = suggestions[currentIndex];
  const progress = suggestions.length > 0 ? ((currentIndex + 1) / suggestions.length) * 100 : 0;

  return (
    <div className="min-h-screen px-4 pt-4 pb-24" style={{ backgroundColor: "#F8F5F1" }}>
      {/* Header */}
      <div className="mb-4">
        <h1 className="font-serif font-bold" style={{ fontSize: "28px", color: "#1A1A1A" }}>
          Pianifica
        </h1>
        <p className="font-sans" style={{ fontSize: "14px", color: "#6B6B6B" }}>
          Crea il tuo viaggio perfetto
        </p>
      </div>

      {/* Quick Actions (when not in matching mode) */}
      {!showMatchMode && (
        <>
          {/* Create Tour Button */}
          <button
            onClick={() => setStep(1)}
            className="w-full mb-4 flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(135deg, #7C5FBA 0%, #9B7FD9 100%)",
              borderRadius: "20px",
              height: "52px",
            }}
          >
            <Sparkles style={{ width: "20px", height: "20px", color: "#FFFFFF" }} />
            <span className="font-sans font-semibold" style={{ fontSize: "15px", color: "#FFFFFF" }}>
              Crea un nuovo viaggio
            </span>
          </button>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <button
              onClick={() => setStep(1)}
              className="flex flex-col items-center gap-2 p-4"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "20px",
                border: "1px solid #E5E5E0",
              }}
            >
              <Sparkles style={{ width: "24px", height: "24px", color: "#7C5FBA" }} />
              <span className="font-sans font-medium" style={{ fontSize: "13px", color: "#1A1A1A" }}>
                Match
              </span>
              <span className="font-sans" style={{ fontSize: "11px", color: "#6B6B6B", textAlign: "center" }}>
                Tour rapido
              </span>
            </button>

            <button
              className="flex flex-col items-center gap-2 p-4"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "20px",
                border: "1px solid #E5E5E0",
              }}
            >
              <Sword style={{ width: "24px", height: "24px", color: "#5FB894" }} />
              <span className="font-sans font-medium" style={{ fontSize: "13px", color: "#1A1A1A" }}>
                Confronta
              </span>
              <span className="font-sans" style={{ fontSize: "11px", color: "#6B6B6B", textAlign: "center" }}>
                2 città
              </span>
            </button>

            <button
              className="flex flex-col items-center gap-2 p-4"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "20px",
                border: "1px solid #E5E5E0",
              }}
            >
              <RefreshCw style={{ width: "24px", height: "24px", color: "#E8A855" }} />
              <span className="font-sans font-medium" style={{ fontSize: "13px", color: "#1A1A1A" }}>
                Alternativa
              </span>
              <span className="font-sans" style={{ fontSize: "11px", color: "#6B6B6B", textAlign: "center" }}>
                Trova simile
              </span>
            </button>
          </div>

          {/* Predefined Packages */}
          <div
            className="mb-4 p-4"
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              border: "1px solid #E5E5E0",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  backgroundColor: "#E8A85520",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Calendar style={{ width: "20px", height: "20px", color: "#E8A855" }} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 className="font-sans font-semibold" style={{ fontSize: "15px", color: "#1A1A1A" }}>
                  Pacchetti predefiniti
                </h3>
                <p className="font-sans" style={{ fontSize: "13px", color: "#6B6B6B" }}>
                  3 tour pronti all'uso
                </p>
              </div>
              <ChevronDown style={{ width: "20px", height: "20px", color: "#6B6B6B" }} />
            </div>
          </div>

          {/* User Content */}
          <div className="space-y-3">
            <div
              className="flex items-center gap-3 p-4"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "20px",
                border: "1px solid #E5E5E0",
              }}
            >
              <MapPin style={{ width: "20px", height: "20px", color: "#7C5FBA" }} />
              <span className="font-sans font-medium" style={{ fontSize: "14px", color: "#1A1A1A" }}>
                I tuoi viaggi
              </span>
              <span className="font-sans ml-auto" style={{ fontSize: "13px", color: "#6B6B6B" }}>
                0
              </span>
            </div>

            <div
              className="flex items-center gap-3 p-4"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "20px",
                border: "1px solid #E5E5E0",
              }}
            >
              <Heart style={{ width: "20px", height: "20px", color: "#E85585" }} />
              <span className="font-sans font-medium" style={{ fontSize: "14px", color: "#1A1A1A" }}>
                Tour salvati
              </span>
              <span className="font-sans ml-auto" style={{ fontSize: "13px", color: "#6B6B6B" }}>
                {matchedTours.length}
              </span>
            </div>
          </div>
        </>
      )}

      {/* MATCHING MODE */}
      {showMatchMode && (
        <>
          {/* Progress Bar */}
          <div
            className="mb-4 h-1 rounded-full overflow-hidden"
            style={{ backgroundColor: "#E5E5E0" }}
          >
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${progress}%`,
                backgroundColor: "#7C5FBA",
              }}
            />
          </div>

          {/* Match Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => {
                setShowMatchMode(false);
                setCurrentIndex(0);
              }}
              className="font-sans font-medium"
              style={{ fontSize: "14px", color: "#6B6B6B" }}
            >
              ← Indietro
            </button>
            <span className="font-sans" style={{ fontSize: "13px", color: "#6B6B6B" }}>
              {currentIndex + 1} / {suggestions.length}
            </span>
            <button
              onClick={() => {
                setMatchedTours([]);
                setCurrentIndex(0);
              }}
              className="font-sans font-medium"
              style={{ fontSize: "14px", color: "#7C5FBA" }}
            >
              Ricomincia
            </button>
          </div>

          {/* Match Card */}
          {currentTour ? (
            <div
              ref={cardRef}
              className="relative overflow-hidden"
              style={{
                height: "520px",
                perspective: "1000px",
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Card */}
              <div
                className="absolute inset-0 transition-all duration-200"
                style={{
                  transform:
                    swipeDirection === "left"
                      ? "translateX(-100px) rotate(-20deg)"
                      : swipeDirection === "right"
                      ? "translateX(100px) rotate(20deg)"
                      : "translateX(0)",
                  opacity: swipeDirection ? 0.5 : 1,
                }}
              >
                {/* Image */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    height: "380px",
                    borderRadius: "28px",
                    border: "1px solid #E5E5E0",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 100%), url(${currentTour.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />

                  {/* Category Tag */}
                  <div
                    className="absolute top-4 left-4 px-3 py-1 rounded-full"
                    style={{ backgroundColor: "rgba(255,255,255,0.95)" }}
                  >
                    <span className="font-sans font-semibold" style={{ fontSize: "12px", color: "#1A1A1A" }}>
                      {currentTour.category}
                    </span>
                  </div>

                  {/* Quiet Score */}
                  <div
                    className="absolute top-4 right-4 px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: "#7C5FBA",
                    }}
                  >
                    <span className="font-sans font-bold" style={{ fontSize: "14px", color: "#FFFFFF" }}>
                      Q{currentTour.quietScore}
                    </span>
                  </div>

                  {/* Heart Button */}
                  <button
                    onClick={() => handleSwipe("right")}
                    className="absolute bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#FFFFFF" }}
                  >
                    <Heart style={{ width: "24px", height: "24px", color: "#E85585" }} />
                  </button>
                </div>

                {/* Info */}
                <div className="mt-4">
                  <h2 className="font-serif font-bold" style={{ fontSize: "24px", color: "#1A1A1A" }}>
                    {currentTour.name}
                  </h2>
                  <p className="font-sans mt-1" style={{ fontSize: "14px", color: "#6B6B6B" }}>
                    {currentTour.subtitle}
                  </p>

                  <div className="flex gap-4 mt-4">
                    <div className="flex items-center gap-1">
                      <Calendar style={{ width: "16px", height: "16px", color: "#6B6B6B" }} />
                      <span className="font-sans" style={{ fontSize: "13px", color: "#6B6B6B" }}>
                        {currentTour.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin style={{ width: "16px", height: "16px", color: "#6B6B6B" }} />
                      <span className="font-sans" style={{ fontSize: "13px", color: "#6B6B6B" }}>
                        {currentTour.pois} POI
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Swipe Hints */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                <button
                  onClick={() => handleSwipe("left")}
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#FFFFFF", border: "2px solid #E85585" }}
                >
                  <X style={{ width: "28px", height: "28px", color: "#E85585" }} />
                </button>
                <button
                  onClick={() => handleSwipe("right")}
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#5FB894" }}
                >
                  <Check style={{ width: "28px", height: "28px", color: "#FFFFFF" }} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <Sparkles style={{ width: "48px", height: "48px", color: "#7C5FBA", marginBottom: "16px" }} />
              <h2 className="font-serif font-bold" style={{ fontSize: "22px", color: "#1A1A1A", marginBottom: "8px" }}>
                Hai finito!
              </h2>
              <p className="font-sans text-center" style={{ fontSize: "14px", color: "#6B6B6B", marginBottom: "24px" }}>
                Hai salvato {matchedTours.length} tour
              </p>
              <button
                onClick={() => {
                  setShowMatchMode(false);
                  setCurrentIndex(0);
                }}
                className="px-6 py-3 rounded-full"
                style={{ backgroundColor: "#7C5FBA" }}
              >
                <span className="font-sans font-semibold" style={{ fontSize: "14px", color: "#FFFFFF" }}>
                  Vedi i tuoi salvati
                </span>
              </button>
            </div>
          )}
        </>
      )}

      {/* STEP 1: Mood Selection */}
      {step === 1 && !showMatchMode && (
        <div className="animate-fade-in">
          <h2 className="font-sans font-semibold mb-4" style={{ fontSize: "18px", color: "#1A1A1A" }}>
            Che atmosfera cerchi?
          </h2>

          <div className="space-y-3">
            {moods.map((mood) => (
              <button
                key={mood.id}
                onClick={() => {
                  setPreferences((prev) => ({ ...prev, mood: mood.id }));
                  setStep(2);
                }}
                className="card-shadow w-full flex items-center gap-4 p-4"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "20px",
                  border: `2px solid ${preferences.mood === mood.id ? "#7C5FBA" : "transparent"}`,
                }}
              >
                <span style={{ fontSize: "32px" }}>{mood.emoji}</span>
                <div className="text-left flex-1">
                  <div className="font-sans font-semibold" style={{ fontSize: "16px", color: "#1A1A1A" }}>
                    {mood.label}
                  </div>
                  <div className="font-sans" style={{ fontSize: "13px", color: "#6B6B6B" }}>
                    {mood.desc}
                  </div>
                </div>
                {preferences.mood === mood.id && (
                  <Check style={{ width: "20px", height: "20px", color: "#7C5FBA" }} />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: Duration & Activities */}
      {step === 2 && !showMatchMode && (
        <div className="animate-fade-in">
          <button
            onClick={() => setStep(1)}
            className="mb-4 flex items-center gap-2 font-sans"
            style={{ fontSize: "14px", color: "#7C5FBA" }}
          >
            ← Indietro
          </button>

          <h2 className="font-sans font-semibold mb-4" style={{ fontSize: "18px", color: "#1A1A1A" }}>
            Quanto tempo hai?
          </h2>

          <div className="grid grid-cols-2 gap-3 mb-8">
            {durations.map((d) => (
              <button
                key={d.id}
                onClick={() => setPreferences((prev) => ({ ...prev, duration: d.id }))}
                style={{
                  padding: "16px",
                  backgroundColor: preferences.duration === d.id ? "#7C5FBA" : "#FFFFFF",
                  borderRadius: "16px",
                  border: `1px solid ${preferences.duration === d.id ? "#7C5FBA" : "#E5E5E0"}`,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>{d.icon}</div>
                <div
                  className="font-sans font-medium"
                  style={{
                    fontSize: "14px",
                    color: preferences.duration === d.id ? "#FFFFFF" : "#1A1A1A",
                  }}
                >
                  {d.label}
                </div>
              </button>
            ))}
          </div>

          <h2 className="font-sans font-semibold mb-4" style={{ fontSize: "18px", color: "#1A1A1A" }}>
            Cosa ti interessa?
          </h2>

          <div className="flex flex-wrap gap-2 mb-6">
            {activities.map((activity) => (
              <button
                key={activity}
                onClick={() => {
                  setPreferences((prev) => ({
                    ...prev,
                    activities: prev.activities.includes(activity)
                      ? prev.activities.filter((a) => a !== activity)
                      : [...prev.activities, activity],
                  }));
                }}
                style={{
                  padding: "10px 16px",
                  backgroundColor: preferences.activities.includes(activity) ? "#7C5FBA" : "#F5F5F0",
                  borderRadius: "20px",
                  border: `1px solid ${preferences.activities.includes(activity) ? "#7C5FBA" : "transparent"}`,
                  fontSize: "13px",
                  color: preferences.activities.includes(activity) ? "#FFFFFF" : "#1A1A1A",
                }}
              >
                {activity}
              </button>
            ))}
          </div>

          <h2 className="font-sans font-semibold mb-4" style={{ fontSize: "18px", color: "#1A1A1A" }}>
            Regione (opzionale)
          </h2>

          <select
            value={preferences.region}
            onChange={(e) => setPreferences((prev) => ({ ...prev, region: e.target.value }))}
            style={{
              width: "100%",
              padding: "14px 16px",
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              border: "1px solid #E5E5E0",
              fontSize: "14px",
              color: "#1A1A1A",
              marginBottom: "24px",
            }}
          >
            <option value="">Qualsiasi regione</option>
            <option value="TOSCANA">Toscana</option>
            <option value="LAZIO">Lazio</option>
            <option value="CAMPANIA">Campania</option>
            <option value="SICILIA">Sicilia</option>
            <option value="PUGLIA">Puglia</option>
            <option value="SARDEGNA">Sardegna</option>
            <option value="BASILICATA">Basilicata</option>
            <option value="MARCHE">Marche</option>
            <option value="UMBRIA">Umbria</option>
            <option value="PIEMONTE">Piemonte</option>
            <option value="LOMBARDIA">Lombardia</option>
            <option value="VENETO">Veneto</option>
            <option value="EMILIA-ROMAGNA">Emilia-Romagna</option>
            <option value="CALABRIA">Calabria</option>
            <option value="ABRUZZO">Abruzzo</option>
            <option value="MOLISE">Molise</option>
            <option value="LIGURIA">Liguria</option>
            <option value="FRIULI-VENEZIA GIULIA">Friuli-Venezia Giulia</option>
            <option value="TRENTO">Trento</option>
            <option value="BOLZANO - BOZEN">Bolzano - Bozen</option>
            <option value="VALLE D'AOSTA">Valle d'Aosta</option>
          </select>

          <button
            onClick={generateTours}
            disabled={loading || !preferences.mood || !preferences.duration}
            className="card-shadow w-full font-sans font-semibold flex items-center justify-center gap-2"
            style={{
              height: "56px",
              backgroundColor: "#7C5FBA",
              borderRadius: "28px",
              fontSize: "16px",
              color: "#FFFFFF",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? (
              "Generando..."
            ) : (
              <>
                <Sparkles style={{ width: "20px", height: "20px" }} />
                Trova destinazioni
              </>
            )}
          </button>
        </div>
      )}

      {/* STEP 3: Suggestions */}
      {step === 3 && !showMatchMode && (
        <div className="animate-fade-in">
          <button
            onClick={() => setStep(2)}
            className="mb-4 flex items-center gap-2 font-sans"
            style={{ fontSize: "14px", color: "#7C5FBA" }}
          >
            ← Indietro
          </button>

          <h2 className="font-sans font-semibold mb-4" style={{ fontSize: "18px", color: "#1A1A1A" }}>
            Ecco alcune idee!
          </h2>

          <div className="space-y-4">
            {suggestions.map((tour) => (
              <Link key={tour.id} href={`/destinazioni/${tour.id}`}>
                <div
                  className="card-shadow flex overflow-hidden"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "20px",
                    border: "1px solid #F0F0EB",
                  }}
                >
                  <div
                    style={{
                      width: "120px",
                      height: "140px",
                      flexShrink: 0,
                      backgroundImage: `url(${tour.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div className="p-4 flex-1">
                    <h3 className="font-sans font-semibold" style={{ fontSize: "16px", color: "#1A1A1A" }}>
                      {tour.name}
                    </h3>
                    <p className="font-sans" style={{ fontSize: "13px", color: "#6B6B6B" }}>
                      {tour.subtitle}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span
                        className="font-sans font-semibold px-2 py-0.5 rounded-full"
                        style={{ fontSize: "12px", backgroundColor: "#5FB89420", color: "#5FB894" }}
                      >
                        Q{tour.quietScore}
                      </span>
                      <span className="font-sans" style={{ fontSize: "12px", color: "#6B6B6B" }}>
                        {tour.duration}
                      </span>
                      <span className="font-sans" style={{ fontSize: "12px", color: "#6B6B6B" }}>
                        {tour.pois} POI
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
