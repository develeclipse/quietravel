import { MapPin, Navigation, Coffee, Mountain, Church, Leaf } from "lucide-react";

// Mock POI nearby
const pois = [
  {
    id: 1,
    nome: "Giardino delle Rose",
    tipo: "Natura",
    distanza: "0.8 km",
    quietScore: 92,
    icon: Mountain,
  },
  {
    id: 2,
    nome: "Caffè del Teatro",
    tipo: "Food",
    distanza: "0.3 km",
    quietScore: 78,
    icon: Coffee,
  },
  {
    id: 3,
    nome: "Chiesa di San Michele",
    tipo: "Cultura",
    distanza: "1.2 km",
    quietScore: 88,
    icon: Church,
  },
];

export default function VicinoPage() {
  return (
    <div className="container max-w-md mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold mb-2">Vicino a te</h1>
        <p className="text-sm text-muted-foreground">
          Scopri luoghi quiet nella tua zona
        </p>
      </div>

      {/* Mappa Placeholder */}
      <div className="relative w-full h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl overflow-hidden border border-border">
        {/* Mappa stilizzata */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-2">
            <MapPin className="w-12 h-12 mx-auto text-[rgb(139 92 246)]" />
            <p className="text-sm font-medium text-muted-foreground">
              Mappa interattiva
            </p>
            <p className="text-xs text-muted-foreground">
              (Demo: POI visualizzati sotto)
            </p>
          </div>
        </div>

        {/* Pin sulla mappa (decorativo) */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2">
          <div className="w-8 h-8 bg-[rgb(139 92 246)] rounded-full flex items-center justify-center shadow-lg">
            <Navigation className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Location Button */}
      <button className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-border rounded-xl hover:bg-muted transition-colors">
        <Navigation className="w-5 h-5 text-[rgb(139 92 246)]" />
        <span className="font-medium">Usa la mia posizione</span>
      </button>

      {/* POI List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg">Luoghi nelle vicinanze</h2>
          <button className="text-sm text-[rgb(139 92 246)] font-medium">
            Filtra
          </button>
        </div>

        {pois.map((poi) => {
          const Icon = poi.icon;
          return (
            <div
              key={poi.id}
              className="bg-white p-4 rounded-xl border border-border hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[rgb(139 92 246)]/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-[rgb(139 92 246)]" />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold">{poi.nome}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{poi.tipo}</span>
                    <span>•</span>
                    <span>{poi.distanza}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 px-2 py-1 score-gradient rounded-full">
                  <Leaf className="w-3 h-3 text-white" />
                  <span className="text-white font-bold text-xs">
                    {poi.quietScore}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State Message */}
      <div className="bg-[rgb(139 92 246)]/10 p-6 rounded-2xl border border-[rgb(139 92 246)]/20 text-center">
        <MapPin className="w-12 h-12 mx-auto mb-3 text-[rgb(139 92 246)]" />
        <p className="text-sm text-muted-foreground">
          Attiva la geolocalizzazione per scoprire i luoghi quiet più vicini a te
        </p>
      </div>
    </div>
  );
}
