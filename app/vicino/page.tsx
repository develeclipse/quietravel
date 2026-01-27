import { MapPin, Navigation, Coffee, Mountain, Church, Leaf } from "lucide-react";

const pois = [
  {
    id: 1,
    nome: "Giardino delle Rose",
    tipo: "Natura",
    distanza: "0.8 km",
    quietScore: 92,
    icon: Mountain,
    color: "#5FB894"
  },
  {
    id: 2,
    nome: "Caffè del Teatro",
    tipo: "Food",
    distanza: "0.3 km",
    quietScore: 78,
    icon: Coffee,
    color: "#E8A855"
  },
  {
    id: 3,
    nome: "Chiesa di San Michele",
    tipo: "Cultura",
    distanza: "1.2 km",
    quietScore: 88,
    icon: Church,
    color: "#7C5FBA"
  },
];

export default function VicinoPage() {
  return (
    <div className="min-h-screen px-6 pt-4 pb-24">
      <div className="mb-4">
        <h1 className="font-serif font-bold mb-1" style={{ fontSize: '28px', color: '#1A1A1A' }}>
          Vicino a te
        </h1>
        <p className="font-sans" style={{ fontSize: '14px', color: '#6B6B6B' }}>
          Scopri luoghi quiet nella tua zona
        </p>
      </div>

      {/* Mappa Placeholder */}
      <div 
        style={{
          width: '100%',
          height: '280px',
          background: 'linear-gradient(135deg, #E8F5F0 0%, #E0F0FA 100%)',
          borderRadius: '24px',
          border: '1px solid #E5E5E0',
          marginBottom: '16px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <MapPin style={{ width: '48px', height: '48px', color: '#7C5FBA', margin: '0 auto 12px' }} />
          <p className="font-sans font-medium" style={{ fontSize: '14px', color: '#6B6B6B' }}>
            Mappa interattiva
          </p>
        </div>

        {/* Pin centrale */}
        <div 
          style={{
            position: 'absolute',
            top: '35%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '32px',
            height: '32px',
            backgroundColor: '#7C5FBA',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(124, 95, 186, 0.3)'
          }}
        >
          <Navigation style={{ width: '18px', height: '18px', color: '#FFFFFF' }} />
        </div>
      </div>

      {/* Location Button */}
      <button 
        className="card-shadow w-full font-sans font-medium flex items-center justify-center gap-2"
        style={{
          height: '48px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E5E5E0',
          borderRadius: '24px',
          marginBottom: '24px',
          fontSize: '14px',
          color: '#1A1A1A'
        }}
      >
        <Navigation style={{ width: '18px', height: '18px', color: '#7C5FBA' }} />
        Usa la mia posizione
      </button>

      {/* POI List */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 className="font-sans font-semibold" style={{ fontSize: '18px', color: '#1A1A1A' }}>
            Luoghi nelle vicinanze
          </h2>
          <button className="font-sans font-medium" style={{ fontSize: '13px', color: '#7C5FBA' }}>
            Filtra
          </button>
        </div>

        <div className="space-y-3">
          {pois.map((poi) => {
            const Icon = poi.icon;
            return (
              <div
                key={poi.id}
                className="card-shadow cursor-pointer"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1px solid #F0F0EB',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}
              >
                <div 
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '16px',
                    backgroundColor: `${poi.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Icon style={{ width: '24px', height: '24px', color: poi.color }} />
                </div>

                <div style={{ flex: 1 }}>
                  <h3 className="font-sans font-semibold" style={{ fontSize: '16px', color: '#1A1A1A', marginBottom: '2px' }}>
                    {poi.nome}
                  </h3>
                  <div className="font-sans" style={{ fontSize: '13px', color: '#6B6B6B' }}>
                    {poi.tipo} • {poi.distanza}
                  </div>
                </div>

                <div 
                  className="score-gradient"
                  style={{
                    padding: '6px 10px',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Leaf style={{ width: '12px', height: '12px', color: '#FFFFFF' }} />
                  <span className="font-sans font-bold" style={{ fontSize: '13px', color: '#FFFFFF' }}>
                    {poi.quietScore}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
