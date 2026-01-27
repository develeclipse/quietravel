"use client";

import { useState } from "react";
import { Search, Sparkles, Calendar as CalendarIcon, Zap, Scale, ChevronRight } from "lucide-react";

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
    <div className="min-h-screen px-6 pt-4 pb-24">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search 
          className="absolute left-4 top-1/2 -translate-y-1/2" 
          style={{ width: '18px', height: '18px', color: '#9B9B9B' }} 
        />
        <input
          type="text"
          placeholder="Cerca città o luoghi..."
          className="w-full pl-11 pr-4 font-sans"
          style={{
            height: '48px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E5E0',
            borderRadius: '24px',
            fontSize: '14px',
            outline: 'none'
          }}
        />
      </div>

      {/* Card Inizia Nuovo Viaggio */}
      <div 
        style={{
          background: 'linear-gradient(135deg, #7C5FBA 0%, #9B7FD9 100%)',
          borderRadius: '24px',
          padding: '24px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <h2 
            className="font-serif font-semibold mb-1"
            style={{ fontSize: '20px', color: '#FFFFFF' }}
          >
            Inizia un nuovo viaggio
          </h2>
          <p 
            className="font-sans"
            style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)' }}
          >
            Ti guidiamo noi nella scelta perfetta
          </p>
        </div>
        <Sparkles style={{ width: '32px', height: '32px', color: 'rgba(255,255,255,0.7)' }} />
      </div>

      {/* 3 Action Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '32px' }}>
        <button 
          style={{
            padding: '16px 8px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E5E0',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <CalendarIcon style={{ width: '24px', height: '24px', color: '#7C5FBA' }} />
          <span className="font-sans font-medium" style={{ fontSize: '12px', color: '#1A1A1A' }}>
            Pianifica
          </span>
        </button>

        <button 
          style={{
            padding: '16px 8px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E5E0',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Zap style={{ width: '24px', height: '24px', color: '#E8A855' }} />
          <span className="font-sans font-medium" style={{ fontSize: '12px', color: '#1A1A1A' }}>
            Match
          </span>
        </button>

        <button 
          style={{
            padding: '16px 8px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E5E0',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Scale style={{ width: '24px', height: '24px', color: '#5FB894' }} />
          <span className="font-sans font-medium" style={{ fontSize: '12px', color: '#1A1A1A' }}>
            Confronta
          </span>
        </button>
      </div>

      {/* Wizard Section */}
      <div className="space-y-6">
        <div>
          <h3 className="font-sans font-semibold mb-1" style={{ fontSize: '18px', color: '#1A1A1A' }}>
            Crea il tuo tour
          </h3>
          <p className="font-sans" style={{ fontSize: '13px', color: '#6B6B6B' }}>
            Personalizza la tua esperienza quiet
          </p>
        </div>

        {/* Raggio del Tour */}
        <div>
          <label className="font-sans font-medium block mb-3" style={{ fontSize: '14px', color: '#1A1A1A' }}>
            Raggio del tour
          </label>
          <div>
            <input
              type="range"
              min="0"
              max="10"
              value={raggio}
              onChange={(e) => setRaggio(Number(e.target.value))}
              style={{
                width: '100%',
                height: '6px',
                borderRadius: '3px',
                appearance: 'none',
                background: `linear-gradient(to right, #7C5FBA 0%, #7C5FBA ${(raggio / 10) * 100}%, #E5E5E0 ${(raggio / 10) * 100}%, #E5E5E0 100%)`,
                outline: 'none'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              <span className="font-sans" style={{ fontSize: '12px', color: '#9B9B9B' }}>0 km</span>
              <span className="font-sans font-semibold" style={{ fontSize: '14px', color: '#7C5FBA' }}>
                {raggio} km
              </span>
              <span className="font-sans" style={{ fontSize: '12px', color: '#9B9B9B' }}>10 km</span>
            </div>
          </div>
        </div>

        {/* Mood di Viaggio */}
        <div>
          <label className="font-sans font-medium block mb-3" style={{ fontSize: '14px', color: '#1A1A1A' }}>
            Mood di viaggio
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {moodOptions.map((mood) => (
              <button
                key={mood.id}
                onClick={() => toggleMood(mood.id)}
                style={{
                  padding: '16px 12px',
                  borderRadius: '16px',
                  border: moods.includes(mood.id) 
                    ? '2px solid #7C5FBA' 
                    : '1px solid #E5E5E0',
                  backgroundColor: moods.includes(mood.id) 
                    ? 'rgba(124, 95, 186, 0.08)' 
                    : '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ fontSize: '24px' }}>{mood.emoji}</div>
                <span className="font-sans font-medium" style={{ fontSize: '12px', color: '#1A1A1A' }}>
                  {mood.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Durata Disponibile */}
        <div>
          <label className="font-sans font-medium block mb-3" style={{ fontSize: '14px', color: '#1A1A1A' }}>
            Durata disponibile
          </label>
          <div className="space-y-2">
            {durataOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setDurata(opt.id as any)}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '16px',
                  border: durata === opt.id 
                    ? '2px solid #7C5FBA' 
                    : '1px solid #E5E5E0',
                  backgroundColor: durata === opt.id 
                    ? 'rgba(124, 95, 186, 0.08)' 
                    : '#FFFFFF',
                  textAlign: 'left',
                  transition: 'all 0.2s'
                }}
              >
                <div className="font-sans font-semibold" style={{ fontSize: '15px', color: '#1A1A1A', marginBottom: '2px' }}>
                  {opt.label}
                </div>
                <div className="font-sans" style={{ fontSize: '12px', color: '#6B6B6B' }}>
                  {opt.subtitle}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button 
          className="btn-gradient w-full font-sans font-semibold"
          style={{
            height: '52px',
            borderRadius: '26px',
            fontSize: '15px',
            color: '#FFFFFF',
            border: 'none'
          }}
        >
          Mostra idee perfette per te 🌸
        </button>
      </div>

      {/* Pacchetti e Contenuti */}
      <div className="mt-8 space-y-3">
        <div 
          style={{
            padding: '16px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E5E0',
            borderRadius: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>
            <div className="font-sans font-semibold" style={{ fontSize: '15px', color: '#1A1A1A' }}>
              Pacchetti predefiniti
            </div>
            <div className="font-sans" style={{ fontSize: '12px', color: '#6B6B6B' }}>
              3 tour pronti all'uso
            </div>
          </div>
          <ChevronRight style={{ width: '20px', height: '20px', color: '#9B9B9B' }} />
        </div>

        <div>
          <div className="font-sans font-semibold mb-2" style={{ fontSize: '11px', color: '#9B9B9B', letterSpacing: '1px' }}>
            I TUOI CONTENUTI
          </div>
          <div className="space-y-2">
            <div 
              style={{
                padding: '12px 16px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E5E0',
                borderRadius: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span className="font-sans" style={{ fontSize: '14px', color: '#1A1A1A' }}>
                I tuoi viaggi
              </span>
              <span 
                style={{
                  padding: '4px 10px',
                  backgroundColor: '#F5F5F0',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6B6B6B'
                }}
              >
                0
              </span>
            </div>

            <div 
              style={{
                padding: '12px 16px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E5E0',
                borderRadius: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span className="font-sans" style={{ fontSize: '14px', color: '#1A1A1A' }}>
                Tour salvati
              </span>
              <span 
                style={{
                  padding: '4px 10px',
                  backgroundColor: '#F5F5F0',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6B6B6B'
                }}
              >
                0
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
