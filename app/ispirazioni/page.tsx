import { Search, Sparkles, Leaf, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function IspirazioniPage() {
  // Fetch real destinations from DB
  const destinazioni = await prisma.destination.findMany({
    orderBy: {
      quietScore: "desc",
    },
    take: 10,
    include: {
      _count: {
        select: { pois: true },
      },
    },
  });

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
          placeholder="Cerca collezioni, regioni, città..."
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

      {/* Filtri */}
      <div className="flex gap-2 mb-6">
        <button 
          className="font-sans font-medium flex items-center gap-2"
          style={{
            padding: '8px 16px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E5E0',
            borderRadius: '20px',
            fontSize: '13px',
            color: '#1A1A1A'
          }}
        >
          Quiet Score & Date
          <span 
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#7C5FBA',
              color: '#FFFFFF',
              fontSize: '11px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '600'
            }}
          >
            1
          </span>
        </button>
      </div>

      {/* Card con immagine grande - Umbria */}
      <div 
        className="mb-6 relative overflow-hidden"
        style={{
          borderRadius: '24px',
          height: '200px'
        }}
      >
        <div 
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 100%), url(https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '20px'
          }}
        >
          <h3 
            className="font-serif font-semibold mb-1"
            style={{ fontSize: '22px', color: '#FFFFFF', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
          >
            Umbria da scoprire lentamente
          </h3>
          <p 
            className="font-sans mb-3"
            style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
          >
            5 giorni, zero stress
          </p>
          <button 
            className="font-sans font-medium flex items-center gap-1 self-start"
            style={{
              padding: '6px 14px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '16px',
              fontSize: '12px',
              color: '#FFFFFF'
            }}
          >
            Mostra altre 3
            <ChevronDown style={{ width: '14px', height: '14px' }} />
          </button>
        </div>
      </div>

      {/* AI Card */}
      <div 
        className="ai-gradient mb-6"
        style={{
          borderRadius: '24px',
          padding: '20px'
        }}
      >
        <h3 
          className="font-sans font-semibold mb-2"
          style={{ fontSize: '16px', color: '#1A1A1A' }}
        >
          Non sai ancora dove andare?
        </h3>
        <p 
          className="font-sans mb-4"
          style={{ fontSize: '13px', color: '#6B6B6B', lineHeight: '18px' }}
        >
          Lascia che la nostra AI ti suggerisca la destinazione perfetta in base alle tue preferenze
        </p>
        <button 
          className="btn-gradient w-full font-sans font-semibold flex items-center justify-center gap-2"
          style={{
            height: '48px',
            borderRadius: '24px',
            fontSize: '15px',
            color: '#FFFFFF',
            border: 'none'
          }}
        >
          <Sparkles style={{ width: '18px', height: '18px' }} />
          Scopri con l'AI
        </button>
      </div>

      {/* Lista Destinazioni REALI */}
      <div className="space-y-4">
        {destinazioni.map((dest, index) => (
          <Link key={dest.id} href={`/destinazioni/${dest.slug}`}>
            <div
              className="card-shadow cursor-pointer"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                border: '1px solid #F0F0EB',
                padding: '20px',
                display: 'flex',
                gap: '16px'
              }}
            >
              {/* Numero grande */}
              <div 
                className="font-serif font-bold"
                style={{
                  fontSize: '32px',
                  color: 'rgba(0,0,0,0.08)',
                  lineHeight: '1',
                  minWidth: '32px'
                }}
              >
                {index + 1}
              </div>

              {/* Contenuto */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <h3 
                      className="font-sans font-semibold mb-0.5"
                      style={{ fontSize: '18px', color: '#1A1A1A' }}
                    >
                      {dest.name}
                    </h3>
                    <p 
                      className="font-sans"
                      style={{ fontSize: '13px', color: '#6B6B6B' }}
                    >
                      {dest.subtitle || dest.region}
                    </p>
                  </div>

                  {/* Quiet Score Badge */}
                  <div 
                    className="score-gradient flex items-center gap-1"
                    style={{
                      padding: '6px 10px',
                      borderRadius: '16px'
                    }}
                  >
                    <Leaf style={{ width: '14px', height: '14px', color: '#FFFFFF' }} />
                    <span 
                      className="font-sans font-bold"
                      style={{ fontSize: '14px', color: '#FFFFFF' }}
                    >
                      {dest.quietScore}
                    </span>
                  </div>
                </div>

                <p 
                  className="font-sans mb-3"
                  style={{ fontSize: '13px', color: '#6B6B6B', lineHeight: '18px' }}
                >
                  {dest.description?.substring(0, 120)}...
                </p>

                <div 
                  className="font-sans font-medium"
                  style={{
                    fontSize: '13px',
                    color: '#7C5FBA',
                  }}
                >
                  Scopri la città →
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
