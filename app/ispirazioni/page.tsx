import { Search, Sparkles, SlidersHorizontal, Leaf } from "lucide-react";

// Mock data destinazioni
const destinazioni = [
  {
    id: 1,
    nome: "Maratea",
    sottotitolo: "Perla del Tirreno",
    quietScore: 78,
    descrizione:
      "Costa lucana tra Campania e Calabria. Cristo Redentore, spiagge selvagge, cucina di mare autentica.",
  },
  {
    id: 2,
    nome: "Cefalù",
    sottotitolo: "Sicilia normanna",
    quietScore: 65,
    descrizione:
      "Borgo marinaro con Duomo normanno, spiaggia dorata e Lavatoio medievale.",
  },
  {
    id: 3,
    nome: "Urbino",
    sottotitolo: "Gioiello rinascimentale",
    quietScore: 82,
    descrizione:
      "Città ideale del Rinascimento, Palazzo Ducale e atmosfera universitaria tranquilla.",
  },
  {
    id: 4,
    nome: "Sperlonga",
    sottotitolo: "Borgo bianco sul mare",
    quietScore: 71,
    descrizione:
      "Viuzze labirintiche, case bianche affacciate sul Tirreno e grotta di Tiberio.",
  },
];

export default function IspirazioniPage() {
  return (
    <div className="container max-w-md mx-auto px-4 py-6 space-y-6">
      {/* Search + Filter */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cerca collezioni, regioni, città..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(139 92 246)]"
          />
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
            Quiet Score & Date
            <span className="w-5 h-5 rounded-full bg-[rgb(139 92 246)] text-white text-xs flex items-center justify-center">
              1
            </span>
          </button>
        </div>
      </div>

      {/* AI Card */}
      <div className="ai-gradient p-6 rounded-2xl border border-[rgb(139 92 246)]/20">
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Non sai ancora dove andare?</h3>
          <p className="text-sm text-muted-foreground">
            Lascia che la nostra AI ti suggerisca la destinazione perfetta in base alle tue preferenze
          </p>
          <button className="w-full btn-gradient text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            <Sparkles className="w-5 h-5" />
            Scopri con l'AI
          </button>
        </div>
      </div>

      {/* Lista Destinazioni */}
      <div className="space-y-4">
        <h2 className="font-semibold text-xl">Destinazioni quiet</h2>

        {destinazioni.map((dest, idx) => (
          <div
            key={dest.id}
            className="bg-white p-5 rounded-2xl border border-border hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start gap-4">
              {/* Numero */}
              <div className="text-3xl font-bold text-muted-foreground/30">
                {idx + 1}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{dest.nome}</h3>
                    <p className="text-sm text-muted-foreground">
                      {dest.sottotitolo}
                    </p>
                  </div>

                  {/* Quiet Score Badge */}
                  <div className="flex items-center gap-1 px-3 py-1 score-gradient rounded-full">
                    <Leaf className="w-4 h-4 text-white" />
                    <span className="text-white font-bold text-sm">
                      {dest.quietScore}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3">
                  {dest.descrizione}
                </p>

                <button className="text-sm text-[rgb(139 92 246)] font-medium hover:underline">
                  Scopri la città →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
