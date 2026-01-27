"use client";

import { useState } from "react";
import { Search, Zap, Scale, Calendar as CalendarIcon, Sparkles } from "lucide-react";

export default function PianificaPage() {
  const [raggio, setRaggio] = useState(5);
  const [durata, setDurata] = useState<"breve" | "medio" | "lungo">("breve");
  const [moods, setMoods] = useState<string[]>([]);

  const moodOptions = [
    { id: "arte", label: "Arte", emoji: "🎨" },
    { id: "natura", label: "Natura", emoji: "🌿" },
    { id: "benessere", label: "Benessere", emoji: "🧘" },
    { id: "food", label: "Food", emoji: "🍽️" },
    { id: "avventura", label: "Avventura", emoji: "🎒" },
  ];

  const durataOptions = [
    { id: "breve", label: "Breve", subtitle: "1-2 ore" },
    { id: "medio", label: "Medio", subtitle: "3-5 ore" },
    { id: "lungo", label: "Lungo", subtitle: "Giornata intera" },
  ];

  const toggleMood = (id: string) => {
    setMoods((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  return (
    <div className="container max-w-md mx-auto px-4 py-6 space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Cerca città o luoghi..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(139 92 246)]"
        />
      </div>

      {/* Inizia Nuovo Viaggio Card */}
      <div className="bg-gradient-to-br from-[rgb(139 92 246)] to-[rgb(124 58 237)] p-6 rounded-2xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-xl mb-1">
              Inizia un nuovo viaggio
            </h2>
            <p className="text-white/80 text-sm">
              Ti guidiamo noi nella scelta perfetta
            </p>
          </div>
          <Sparkles className="w-8 h-8 opacity-80" />
        </div>
      </div>

      {/* 3 Action Buttons */}
      <div className="grid grid-cols-3 gap-3">
        <button className="flex flex-col items-center gap-2 p-4 bg-white border border-border rounded-xl hover:shadow-md transition-shadow">
          <CalendarIcon className="w-6 h-6 text-[rgb(139 92 246)]" />
          <span className="text-xs font-medium">Pianifica</span>
        </button>
        <button className="flex flex-col items-center gap-2 p-4 bg-white border border-border rounded-xl hover:shadow-md transition-shadow">
          <Zap className="w-6 h-6 text-orange-500" />
          <span className="text-xs font-medium">Match</span>
        </button>
        <button className="flex flex-col items-center gap-2 p-4 bg-white border border-border rounded-xl hover:shadow-md transition-shadow">
          <Scale className="w-6 h-6 text-blue-500" />
          <span className="text-xs font-medium">Confronta</span>
        </button>
      </div>

      {/* Wizard: Crea Tour Personalizzato */}
      <div className="space-y-6 pt-4">
        <div>
          <h3 className="font-semibold text-lg mb-1">Crea il tuo tour</h3>
          <p className="text-sm text-muted-foreground">
            Personalizza la tua esperienza quiet
          </p>
        </div>

        {/* Raggio del Tour */}
        <div>
          <label className="block text-sm font-medium mb-3">
            Raggio del tour
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="10"
              value={raggio}
              onChange={(e) => setRaggio(Number(e.target.value))}
              className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, rgb(139 92 246) 0%, rgb(139 92 246) ${
                  (raggio / 10) * 100
                }%, hsl(var(--muted)) ${(raggio / 10) * 100}%, hsl(var(--muted)) 100%)`,
              }}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0 km</span>
              <span className="font-bold text-[rgb(139 92 246)]">
                {raggio} km
              </span>
              <span>10 km</span>
            </div>
          </div>
        </div>

        {/* Mood di Viaggio */}
        <div>
          <label className="block text-sm font-medium mb-3">
            Mood di viaggio
          </label>
          <div className="grid grid-cols-3 gap-2">
            {moodOptions.map((mood) => (
              <button
                key={mood.id}
                onClick={() => toggleMood(mood.id)}
                className={`p-3 rounded-xl border-2 transition-all ${
                  moods.includes(mood.id)
                    ? "border-[rgb(139 92 246)] bg-[rgb(139 92 246)]/10"
                    : "border-border bg-white hover:border-muted"
                }`}
              >
                <div className="text-2xl mb-1">{mood.emoji}</div>
                <div className="text-xs font-medium">{mood.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Durata Disponibile */}
        <div>
          <label className="block text-sm font-medium mb-3">
            Durata disponibile
          </label>
          <div className="space-y-2">
            {durataOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setDurata(opt.id as any)}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  durata === opt.id
                    ? "border-[rgb(139 92 246)] bg-[rgb(139 92 246)]/10"
                    : "border-border bg-white hover:border-muted"
                }`}
              >
                <div className="font-medium">{opt.label}</div>
                <div className="text-xs text-muted-foreground">
                  {opt.subtitle}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button className="w-full btn-gradient text-white py-4 rounded-xl font-medium hover:opacity-90 transition-opacity">
          Mostra idee perfette per te 🌸
        </button>
      </div>

      {/* Sezioni: Pacchetti e Contenuti */}
      <div className="space-y-4 pt-4">
        <div className="bg-white p-4 rounded-xl border border-border">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Pacchetti predefiniti</h4>
              <p className="text-xs text-muted-foreground">3 tour pronti all'uso</p>
            </div>
            <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-sm text-muted-foreground mb-3">
            I TUOI CONTENUTI
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-border">
              <span className="text-sm font-medium">I tuoi viaggi</span>
              <span className="px-2 py-1 bg-muted rounded-full text-xs font-bold">
                0
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-border">
              <span className="text-sm font-medium">Tour salvati</span>
              <span className="px-2 py-1 bg-muted rounded-full text-xs font-bold">
                0
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
