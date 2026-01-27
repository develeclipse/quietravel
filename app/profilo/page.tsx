import { Heart, Building, MapPin, TrendingUp, Trophy, Target, Settings, Sliders } from "lucide-react";

export default function ProfiloPage() {
  return (
    <div className="min-h-screen px-6 pt-4 pb-24">
      {/* Header con Avatar */}
      <div className="text-center mb-6" style={{ paddingTop: '16px' }}>
        <div 
          style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 12px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #7C5FBA 0%, #9B7FD9 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px'
          }}
        >
          👤
        </div>
        <h1 className="font-serif font-bold mb-1" style={{ fontSize: '24px', color: '#1A1A1A' }}>
          Il tuo profilo
        </h1>
        <p className="font-sans" style={{ fontSize: '14px', color: '#6B6B6B' }}>
          Quiet Traveller
        </p>
      </div>

      {/* Grid Statistiche 2x2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
        <div 
          className="card-shadow"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #F0F0EB',
            padding: '20px',
            textAlign: 'center'
          }}
        >
          <Heart style={{ width: '24px', height: '24px', color: '#EC8DBF', margin: '0 auto 8px' }} />
          <div className="font-sans font-bold" style={{ fontSize: '28px', color: '#1A1A1A', marginBottom: '4px' }}>
            0
          </div>
          <div className="font-sans" style={{ fontSize: '12px', color: '#6B6B6B' }}>
            Città salvate
          </div>
        </div>

        <div 
          className="card-shadow"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #F0F0EB',
            padding: '20px',
            textAlign: 'center'
          }}
        >
          <Building style={{ width: '24px', height: '24px', color: '#5BA8E0', margin: '0 auto 8px' }} />
          <div className="font-sans font-bold" style={{ fontSize: '28px', color: '#1A1A1A', marginBottom: '4px' }}>
            0
          </div>
          <div className="font-sans" style={{ fontSize: '12px', color: '#6B6B6B' }}>
            Viaggi
          </div>
        </div>

        <div 
          className="card-shadow"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #F0F0EB',
            padding: '20px',
            textAlign: 'center'
          }}
        >
          <MapPin style={{ width: '24px', height: '24px', color: '#E8A855', margin: '0 auto 8px' }} />
          <div className="font-sans font-bold" style={{ fontSize: '28px', color: '#1A1A1A', marginBottom: '4px' }}>
            0
          </div>
          <div className="font-sans" style={{ fontSize: '12px', color: '#6B6B6B' }}>
            Luoghi preferiti
          </div>
        </div>

        <div 
          className="card-shadow"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #F0F0EB',
            padding: '20px',
            textAlign: 'center'
          }}
        >
          <TrendingUp style={{ width: '24px', height: '24px', color: '#5FB894', margin: '0 auto 8px' }} />
          <div className="font-sans font-bold" style={{ fontSize: '28px', color: '#1A1A1A', marginBottom: '4px' }}>
            —
          </div>
          <div className="font-sans" style={{ fontSize: '12px', color: '#6B6B6B' }}>
            Q-Score medio
          </div>
        </div>
      </div>

      {/* Card Livello Quiet Traveller */}
      <div 
        style={{
          background: 'linear-gradient(135deg, rgba(124, 95, 186, 0.08) 0%, rgba(91, 168, 224, 0.08) 100%)',
          border: '1px solid rgba(124, 95, 186, 0.15)',
          borderRadius: '24px',
          padding: '24px',
          marginBottom: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div 
            style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#5BA8E0',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Trophy style={{ width: '24px', height: '24px', color: '#FFFFFF' }} />
          </div>
          <div>
            <div className="font-sans font-semibold" style={{ fontSize: '10px', color: '#9B9B9B', letterSpacing: '1px', marginBottom: '2px' }}>
              LIVELLO QUIET TRAVELLER
            </div>
            <div className="font-sans font-bold" style={{ fontSize: '18px', color: '#1A1A1A' }}>
              Curioso Urbano
            </div>
          </div>
        </div>

        <p className="font-sans mb-4" style={{ fontSize: '13px', color: '#6B6B6B', lineHeight: '18px' }}>
          Stai iniziando il tuo viaggio verso la quiete
        </p>

        {/* Barra Progresso */}
        <div>
          <div 
            style={{
              width: '100%',
              height: '8px',
              backgroundColor: 'rgba(255,255,255,0.5)',
              borderRadius: '4px',
              overflow: 'hidden',
              marginBottom: '8px'
            }}
          >
            <div 
              style={{
                width: '0%',
                height: '100%',
                background: 'linear-gradient(90deg, #7C5FBA 0%, #5BA8E0 100%)',
                transition: 'width 0.5s ease'
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="font-sans" style={{ fontSize: '12px', color: '#9B9B9B' }}>
              0%
            </span>
            <span className="font-sans font-medium" style={{ fontSize: '12px', color: '#7C5FBA' }}>
              Verso Cercatore di Quiete
            </span>
          </div>
        </div>
      </div>

      {/* Achievement Card */}
      <div 
        className="card-shadow"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid #F0F0EB',
          padding: '20px',
          marginBottom: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Target style={{ width: '20px', height: '20px', color: '#7C5FBA' }} />
          <h3 className="font-sans font-semibold" style={{ fontSize: '16px', color: '#1A1A1A' }}>
            Cercatore di Quiete
          </h3>
        </div>

        <div className="space-y-4">
          {/* Obiettivo 1 */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="font-sans" style={{ fontSize: '14px', color: '#1A1A1A' }}>
                Città salvate
              </span>
              <span className="font-sans font-semibold" style={{ fontSize: '14px', color: '#1A1A1A' }}>
                0/3
              </span>
            </div>
            <div 
              style={{
                width: '100%',
                height: '6px',
                backgroundColor: '#F5F5F0',
                borderRadius: '3px',
                overflow: 'hidden'
              }}
            >
              <div style={{ width: '0%', height: '100%', backgroundColor: '#7C5FBA' }} />
            </div>
          </div>

          {/* Obiettivo 2 */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="font-sans" style={{ fontSize: '14px', color: '#1A1A1A' }}>
                Viaggi pianificati
              </span>
              <span className="font-sans font-semibold" style={{ fontSize: '14px', color: '#1A1A1A' }}>
                0/2
              </span>
            </div>
            <div 
              style={{
                width: '100%',
                height: '6px',
                backgroundColor: '#F5F5F0',
                borderRadius: '3px',
                overflow: 'hidden'
              }}
            >
              <div style={{ width: '0%', height: '100%', backgroundColor: '#7C5FBA' }} />
            </div>
          </div>

          {/* Obiettivo 3 */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="font-sans" style={{ fontSize: '14px', color: '#1A1A1A' }}>
                Q-Score medio
              </span>
              <span className="font-sans font-semibold" style={{ fontSize: '14px', color: '#1A1A1A' }}>
                0/70
              </span>
            </div>
            <div 
              style={{
                width: '100%',
                height: '6px',
                backgroundColor: '#F5F5F0',
                borderRadius: '3px',
                overflow: 'hidden'
              }}
            >
              <div style={{ width: '0%', height: '100%', backgroundColor: '#7C5FBA' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button 
          className="card-shadow w-full text-left"
          style={{
            padding: '16px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E5E0',
            borderRadius: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Settings style={{ width: '20px', height: '20px', color: '#7C5FBA' }} />
            <div>
              <div className="font-sans font-medium" style={{ fontSize: '15px', color: '#1A1A1A' }}>
                Impostazioni
              </div>
              <div className="font-sans" style={{ fontSize: '12px', color: '#6B6B6B' }}>
                Gestisci il tuo account
              </div>
            </div>
          </div>
        </button>

        <button 
          className="card-shadow w-full text-left"
          style={{
            padding: '16px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E5E0',
            borderRadius: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Sliders style={{ width: '20px', height: '20px', color: '#7C5FBA' }} />
            <div>
              <div className="font-sans font-medium" style={{ fontSize: '15px', color: '#1A1A1A' }}>
                Preferenze
              </div>
              <div className="font-sans" style={{ fontSize: '12px', color: '#6B6B6B' }}>
                Personalizza la tua esperienza
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
