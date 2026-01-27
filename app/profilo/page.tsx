import { Heart, Building, MapPin, TrendingUp, Trophy, Target } from "lucide-react";

export default function ProfiloPage() {
  const stats = {
    cittaSalvate: 0,
    viaggi: 0,
    luoghiPreferiti: 0,
    qScoreMedio: null,
  };

  const currentLevel = {
    nome: "Curioso Urbano",
    descrizione: "Stai iniziando il tuo viaggio verso la quiete",
    progresso: 0,
    prossimoLivello: "Cercatore di Quiete",
  };

  const obiettivi = {
    cittaSalvate: { current: 0, target: 3 },
    viaggiPianificati: { current: 0, target: 2 },
    qScoreMedio: { current: 0, target: 70 },
  };

  return (
    <div className="container max-w-md mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center py-4">
        <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-[rgb(139 92 246)] to-[rgb(124 58 237)] flex items-center justify-center">
          <span className="text-3xl">👤</span>
        </div>
        <h1 className="text-2xl font-bold">Il tuo profilo</h1>
        <p className="text-sm text-muted-foreground">Quiet Traveller</p>
      </div>

      {/* Statistiche Utente */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-4 rounded-xl border border-border text-center">
          <Heart className="w-6 h-6 mx-auto mb-2 text-pink-500" />
          <div className="text-2xl font-bold">{stats.cittaSalvate}</div>
          <div className="text-xs text-muted-foreground">Città salvate</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-border text-center">
          <Building className="w-6 h-6 mx-auto mb-2 text-blue-500" />
          <div className="text-2xl font-bold">{stats.viaggi}</div>
          <div className="text-xs text-muted-foreground">Viaggi</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-border text-center">
          <MapPin className="w-6 h-6 mx-auto mb-2 text-orange-500" />
          <div className="text-2xl font-bold">{stats.luoghiPreferiti}</div>
          <div className="text-xs text-muted-foreground">Luoghi preferiti</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-border text-center">
          <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-500" />
          <div className="text-2xl font-bold">
            {stats.qScoreMedio || "—"}
          </div>
          <div className="text-xs text-muted-foreground">Q-Score medio</div>
        </div>
      </div>

      {/* Livello Quiet Traveller */}
      <div className="bg-gradient-to-br from-[rgb(139 92 246)]/10 to-blue-500/10 p-6 rounded-2xl border border-[rgb(139 92 246)]/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground font-medium">
              LIVELLO QUIET TRAVELLER
            </div>
            <div className="font-bold text-lg">{currentLevel.nome}</div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          {currentLevel.descrizione}
        </p>

        {/* Barra Progresso */}
        <div className="space-y-2">
          <div className="w-full h-2 bg-white/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[rgb(139 92 246)] to-blue-500 transition-all duration-500"
              style={{ width: `${currentLevel.progresso}%` }}
            />
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">
              {currentLevel.progresso}%
            </span>
            <span className="font-medium text-[rgb(139 92 246)]">
              Verso {currentLevel.prossimoLivello}
            </span>
          </div>
        </div>
      </div>

      {/* Obiettivi/Achievement */}
      <div className="bg-white p-5 rounded-2xl border border-border">
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-5 h-5 text-[rgb(139 92 246)]" />
          <h3 className="font-semibold">Cercatore di Quiete</h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Città salvate</span>
            <span className="font-medium text-sm">
              {obiettivi.cittaSalvate.current}/{obiettivi.cittaSalvate.target}
            </span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-[rgb(139 92 246)]"
              style={{
                width: `${
                  (obiettivi.cittaSalvate.current /
                    obiettivi.cittaSalvate.target) *
                  100
                }%`,
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Viaggi pianificati</span>
            <span className="font-medium text-sm">
              {obiettivi.viaggiPianificati.current}/
              {obiettivi.viaggiPianificati.target}
            </span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-[rgb(139 92 246)]"
              style={{
                width: `${
                  (obiettivi.viaggiPianificati.current /
                    obiettivi.viaggiPianificati.target) *
                  100
                }%`,
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Q-Score medio</span>
            <span className="font-medium text-sm">
              {obiettivi.qScoreMedio.current}/{obiettivi.qScoreMedio.target}
            </span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-[rgb(139 92 246)]"
              style={{
                width: `${
                  (obiettivi.qScoreMedio.current / obiettivi.qScoreMedio.target) *
                  100
                }%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Azioni Account */}
      <div className="space-y-2 pt-4">
        <button className="w-full p-4 bg-white border border-border rounded-xl text-left hover:bg-muted transition-colors">
          <div className="font-medium">Impostazioni</div>
          <div className="text-xs text-muted-foreground">
            Gestisci il tuo account
          </div>
        </button>

        <button className="w-full p-4 bg-white border border-border rounded-xl text-left hover:bg-muted transition-colors">
          <div className="font-medium">Preferenze</div>
          <div className="text-xs text-muted-foreground">
            Personalizza la tua esperienza
          </div>
        </button>
      </div>
    </div>
  );
}
