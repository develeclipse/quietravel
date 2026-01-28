"use client";

import { useState } from "react";
import { Search, MapPin, Clock, Sparkles, Heart, ArrowRight, Check } from "lucide-react";

interface TourSuggestion {
  destination: {
    id: string;
    name: string;
    slug: string;
    region: string;
    quietScore: number;
    imageUrl: string | null;
  };
  pois: Array<{
    id: string;
    name: string;
    type: string;
    quietScore: number;
  }>;
  suggestedDuration: string;
  activities: string[];
  matchScore: number;
}

export default function PianificaPage() {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    mood: "",
    duration: "",
    activities: [] as string[],
    region: "",
  });
  const [suggestions, setSuggestions] = useState<TourSuggestion[]>([]);
  const [loading, setLoading] = useState(false);

  const moods = [
    { id: "relax", label: "Relax", emoji: "🧘", desc: "Pace e tranquillità" },
    { id: "avventura", label: "Avventura", emoji: "🏔️", desc: "Esplorazione attiva" },
    { id: "cultura", label: "Cultura", emoji: "🏛️", desc: "Storia e arte" },
    { id: "natura", label: "Natura", emoji: "🌲", desc: "Paesaggi e wildlife" },
    { id: "food", label: "Food", emoji: "🍝", desc: "Enogastronomia" },
  ];

  const durations = [
    { id: "1-giorno", label: "1 giorno", icon: "📅" },
    { id: "2-3-giorni", label: "2-3 giorni", icon: "🗓️" },
    { id: "4-7-giorni", label: "4-7 giorni", icon: "📆" },
    { id: "settimana", label: "Settimana", icon: "🗺️" },
  ];

  const activityOptions = [
    "Natura", "Spiaggia", "Montagna", "Lago",
    "Cultura", "Musei", "Arte",
    "Food", "Wine", "Cooking",
    "Wellness", "Sport", "Foto"
  ];

  const handleActivityToggle = (activity: string) => {
    setPreferences((prev) => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter((a) => a !== activity)
        : [...prev.activities, activity],
    }));
  };

  const generateTours = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tours/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mood: preferences.mood,
          duration: preferences.duration,
          activities: preferences.activities,
          region: preferences.region,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuggestions(data.suggestions);
        setStep(3);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-6 pt-4 pb-24">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-serif font-bold mb-1" style={{ fontSize: "28px", color: "#1A1A1A" }}>
          Pianifica il tuo viaggio
        </h1>
        <p className="font-sans" style={{ fontSize: "14px", color: "#6B6B6B" }}>
          Creiamo insieme l&apos;itinerario perfetto
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            style={{
              flex: 1,
              height: "4px",
              borderRadius: "4px",
              backgroundColor: step >= s ? "#7C5FBA" : "#E5E5E0",
              transition: "background-color 0.3s",
            }}
          />
        ))}
      </div>

      {/* STEP 1: Mood */}
      {step === 1 && (
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
      {step === 2 && (
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

          <div className="flex flex-wrap gap-2 mb-8">
            {activityOptions.map((activity) => (
              <button
                key={activity}
                onClick={() => handleActivityToggle(activity)}
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
            disabled={loading}
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
      {step === 3 && (
        <div className="animate-fade-in">
          <button
            onClick={() => setStep(2)}
            className="mb-4 flex items-center gap-2 font-sans"
            style={{ fontSize: "14px", color: "#7C5FBA" }}
          >
            ← Modifica preferenze
          </button>

          <h2 className="font-sans font-semibold mb-2" style={{ fontSize: "18px", color: "#1A1A1A" }}>
            Le migliori destinazioni per te
          </h2>
          <p className="font-sans mb-6" style={{ fontSize: "14px", color: "#6B6B6B" }}>
            Seleziona una destinazione per creare il tuo tour
          </p>

          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div
                key={suggestion.destination.id}
                className="card-shadow"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "24px",
                  overflow: "hidden",
                }}
              >
                {/* Image */}
                <div
                  style={{
                    height: "160px",
                    backgroundColor: "#E8F5F0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <MapPin style={{ width: "48px", height: "48px", color: "#7C5FBA" }} />
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      padding: "6px 12px",
                      backgroundColor: "#7C5FBA",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Sparkles style={{ width: "14px", height: "14px", color: "#FFFFFF" }} />
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "#FFFFFF" }}>
                      #{index + 1}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "20px" }}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3
                        className="font-serif font-bold"
                        style={{ fontSize: "20px", color: "#1A1A1A" }}
                      >
                        {suggestion.destination.name}
                      </h3>
                      <p
                        className="font-sans"
                        style={{ fontSize: "13px", color: "#6B6B6B" }}
                      >
                        {suggestion.destination.region}
                      </p>
                    </div>
                    <div
                      style={{
                        padding: "6px 10px",
                        backgroundColor: "#5FB89420",
                        borderRadius: "12px",
                      }}
                    >
                      <span
                        style={{ fontSize: "14px", fontWeight: 700, color: "#5FB894" }}
                      >
                        Q{suggestion.destination.quietScore}
                      </span>
                    </div>
                  </div>

                  {suggestion.pois.length > 0 && (
                    <div className="mb-4">
                      <p
                        className="font-sans font-medium mb-2"
                        style={{ fontSize: "12px", color: "#6B6B6B" }}
                      >
                        Da non perdere:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {suggestion.pois.map((poi) => (
                          <span
                            key={poi.id}
                            style={{
                              padding: "4px 10px",
                              backgroundColor: "#F5F5F0",
                              borderRadius: "10px",
                              fontSize: "12px",
                              color: "#1A1A1A",
                            }}
                          >
                            {poi.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock style={{ width: "16px", height: "16px", color: "#6B6B6B" }} />
                      <span
                        className="font-sans"
                        style={{ fontSize: "13px", color: "#6B6B6B" }}
                      >
                        {suggestion.suggestedDuration}
                      </span>
                    </div>

                    <button
                      className="font-sans font-semibold flex items-center gap-1"
                      style={{
                        padding: "10px 20px",
                        backgroundColor: "#7C5FBA",
                        borderRadius: "20px",
                        fontSize: "14px",
                        color: "#FFFFFF",
                      }}
                    >
                      Crea tour
                      <ArrowRight style={{ width: "16px", height: "16px" }} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
