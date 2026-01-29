import { Sparkles, Calendar, MapPin, ChevronRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import { SearchBar } from "@/components/search-bar";

// Featured collections
const FEATURED_COLLECTIONS = [
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
];

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
      <div className="mb-8">
        <SearchBar />
      </div>

      {/* 3 Action Cards */}
      <div className="space-y-4 mb-8">
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

      {/* Featured Collections */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif font-bold" style={{ fontSize: '22px', color: '#1A1A1A' }}>
            In evidenza
          </h2>
          <Link href="/ispirazioni">
            <span className="font-sans font-medium" style={{ fontSize: '13px', color: '#7C5FBA' }}>
              Vedi tutte
            </span>
          </Link>
        </div>

        <div className="space-y-4">
          {FEATURED_COLLECTIONS.map((collection) => (
            <Link key={collection.id} href="/ispirazioni">
              <div 
                className="relative overflow-hidden cursor-pointer"
                style={{
                  borderRadius: '24px',
                  height: '160px',
                }}
              >
                <div 
                  style={{
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 100%), url(${collection.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '20px',
                  }}
                >
                  <h3 className="font-serif font-semibold mb-1" style={{ fontSize: '20px', color: '#FFFFFF' }}>
                    {collection.name}
                  </h3>
                  <p className="font-sans flex items-center gap-2" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)' }}>
                    {collection.subtitle}
                    <span 
                      className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                      style={{ fontSize: '10px', backgroundColor: 'rgba(255,255,255,0.2)' }}
                    >
                      <TrendingUp style={{ width: '10px', height: '10px' }} />
                      In tendenza
                    </span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
