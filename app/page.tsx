import { Sparkles, Calendar, MapPin, Search, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen px-6 pt-4 pb-24">
      {/* Badge Anti-Overtourism */}
      <div className="flex items-center gap-2 mb-5">
        <Sparkles className="w-3 h-3" style={{ color: '#E8A855' }} fill="#E8A855" />
        <span 
          className="font-sans font-semibold tracking-widest"
          style={{ 
            fontSize: '10px',
            color: '#6B6B6B',
            letterSpacing: '1.5px'
          }}
        >
          ANTI-OVERTOURISM
        </span>
      </div>

      {/* Hero Section */}
      <div className="mb-7">
        <h1 
          className="font-serif font-bold leading-tight mb-3"
          style={{ 
            fontSize: '32px',
            lineHeight: '38px',
            color: '#1A1A1A',
            maxWidth: '200px'
          }}
        >
          Dove vuoi andare?
        </h1>
        <p 
          className="font-sans"
          style={{ 
            fontSize: '14px',
            lineHeight: '20px',
            color: '#6B6B6B',
            maxWidth: '280px'
          }}
        >
          Inizia la tua esperienza quiet
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search 
          className="absolute left-4 top-1/2 -translate-y-1/2" 
          style={{ 
            width: '18px', 
            height: '18px',
            color: '#9B9B9B'
          }} 
        />
        <input
          type="text"
          placeholder="Cerca luoghi quiet..."
          className="w-full pl-11 pr-4 font-sans"
          style={{
            height: '52px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E5E0',
            borderRadius: '26px',
            fontSize: '14px',
            color: '#1A1A1A',
            outline: 'none',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
          }}
        />
      </div>

      {/* 3 Action Cards */}
      <div className="space-y-4">
        {/* Card 1: Ispirati */}
        <Link href="/ispirazioni">
          <div 
            className="card-shadow-hover cursor-pointer"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '1px solid #F0F0EB',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div 
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(124, 95, 186, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Sparkles style={{ width: '24px', height: '24px', color: '#7C5FBA' }} />
              </div>
              <div>
                <h3 
                  className="font-sans font-semibold mb-0.5"
                  style={{ fontSize: '18px', color: '#1A1A1A' }}
                >
                  Ispirati
                </h3>
                <p 
                  className="font-sans"
                  style={{ fontSize: '13px', color: '#6B6B6B' }}
                >
                  Collezioni, storie e destinazioni
                </p>
              </div>
            </div>
            <ChevronRight style={{ width: '20px', height: '20px', color: '#9B9B9B' }} />
          </div>
        </Link>

        {/* Card 2: Pianifica */}
        <Link href="/pianifica">
          <div 
            className="card-shadow-hover cursor-pointer"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '1px solid #F0F0EB',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div 
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(95, 184, 148, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Calendar style={{ width: '24px', height: '24px', color: '#5FB894' }} />
              </div>
              <div>
                <h3 
                  className="font-sans font-semibold mb-0.5"
                  style={{ fontSize: '18px', color: '#1A1A1A' }}
                >
                  Pianifica
                </h3>
                <p 
                  className="font-sans"
                  style={{ fontSize: '13px', color: '#6B6B6B' }}
                >
                  Itinerari e pacchetti tematici
                </p>
              </div>
            </div>
            <ChevronRight style={{ width: '20px', height: '20px', color: '#9B9B9B' }} />
          </div>
        </Link>

        {/* Card 3: Vicino a me */}
        <Link href="/vicino">
          <div 
            className="card-shadow-hover cursor-pointer"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '1px solid #F0F0EB',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div 
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(232, 168, 85, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <MapPin style={{ width: '24px', height: '24px', color: '#E8A855' }} />
              </div>
              <div>
                <h3 
                  className="font-sans font-semibold mb-0.5"
                  style={{ fontSize: '18px', color: '#1A1A1A' }}
                >
                  Vicino a me
                </h3>
                <p 
                  className="font-sans"
                  style={{ fontSize: '13px', color: '#6B6B6B' }}
                >
                  Posti segreti e alternative quiet
                </p>
              </div>
            </div>
            <ChevronRight style={{ width: '20px', height: '20px', color: '#9B9B9B' }} />
          </div>
        </Link>
      </div>
    </div>
  );
}
