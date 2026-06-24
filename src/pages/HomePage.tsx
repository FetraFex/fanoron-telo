import { useState } from "react";
import { StatsPanel } from "../components/StatsPanel";
import type { GameStats } from "../services/statsService";
import type { Difficulty, GameMode, GameOptions, Player } from "../types/game";

interface HomePageProps {
  onStart: (options: GameOptions) => void;
  onToggleTheme: () => void;
  theme: "light" | "dark";
  stats: GameStats;
}

const modeLabels: Record<GameMode, string> = {
  PVP: "Joueur vs Joueur",
  PVAI: "Joueur vs IA",
  AIVSAI: "IA vs IA (Démo)",
};

const difficulties: Difficulty[] = ["easy", "medium", "hard"];

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

// Lamba-inspired SVG woven pattern for the header background
const LambaBg = ({ isDark }: { isDark: boolean }) => (
  <svg
    className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <pattern id="lamba" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
        {/* Horizontal weave lines */}
        <line x1="0" y1="4" x2="24" y2="4" stroke={isDark ? "#F0A832" : "#C85A2A"} strokeWidth="1.5" />
        <line x1="0" y1="12" x2="24" y2="12" stroke={isDark ? "#2E7D4F" : "#2E7D4F"} strokeWidth="1.5" />
        <line x1="0" y1="20" x2="24" y2="20" stroke={isDark ? "#F0A832" : "#C85A2A"} strokeWidth="1.5" />
        {/* Vertical weave lines */}
        <line x1="4" y1="0" x2="4" y2="24" stroke={isDark ? "#F0A832" : "#C85A2A"} strokeWidth="0.75" strokeDasharray="2 2" />
        <line x1="12" y1="0" x2="12" y2="24" stroke={isDark ? "#2E7D4F" : "#2E7D4F"} strokeWidth="0.75" strokeDasharray="2 2" />
        <line x1="20" y1="0" x2="20" y2="24" stroke={isDark ? "#F0A832" : "#C85A2A"} strokeWidth="0.75" strokeDasharray="2 2" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#lamba)" />
  </svg>
);

// Baobab icon for decorative accent
const BaobabIcon = () => (
  <svg viewBox="0 0 40 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-12 w-8 opacity-60">
    <rect x="17" y="28" width="6" height="28" rx="3" fill="#C85A2A" />
    <ellipse cx="20" cy="20" rx="18" ry="14" fill="#2E7D4F" />
    <ellipse cx="8" cy="28" rx="8" ry="6" fill="#2E7D4F" />
    <ellipse cx="32" cy="26" rx="8" ry="6" fill="#2E7D4F" />
    <ellipse cx="20" cy="10" rx="10" ry="8" fill="#3a9e65" />
  </svg>
);

export const HomePage = ({
  onStart,
  onToggleTheme,
  theme,
  stats,
}: HomePageProps) => {
  const [mode, setMode] = useState<GameMode>("PVAI");
  const [humanSide, setHumanSide] = useState<Player>("X");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [aiX, setAiX] = useState<Difficulty>("easy");
  const [aiO, setAiO] = useState<Difficulty>("hard");

  const isDark = theme === "dark";

  // Madagascar palette
  const bg = isDark ? "bg-[#1A1410]" : "bg-[#FDF6E3]";
  const surface = isDark ? "bg-[#251D17]" : "bg-white";
  const border = isDark ? "border-[#3D2E22]" : "border-[#E8D9C0]";
  const textPrimary = isDark ? "text-[#FDF6E3]" : "text-[#1A1410]";
  const textSecondary = isDark ? "text-[#A08060]" : "text-[#7A5C3A]";
  const accent = isDark ? "text-[#F0A832]" : "text-[#C85A2A]";
  const accentBg = isDark ? "bg-[#F0A832]" : "bg-[#C85A2A]";
  const greenAccent = isDark ? "text-[#4DB87A]" : "text-[#2E7D4F]";

  const handleStart = () => {
    if (mode === "PVP") {
      onStart({ mode, aiVsAiDelayMs: 420, players: { X: { type: "human" }, O: { type: "human" } } });
      return;
    }
    if (mode === "PVAI") {
      onStart({
        mode,
        aiVsAiDelayMs: 420,
        players:
          humanSide === "X"
            ? { X: { type: "human" }, O: { type: "ai", difficulty } }
            : { X: { type: "ai", difficulty }, O: { type: "human" } },
      });
      return;
    }
    onStart({ mode, aiVsAiDelayMs: 420, players: { X: { type: "ai", difficulty: aiX }, O: { type: "ai", difficulty: aiO } } });
  };

  const modeIcons: Record<GameMode, string> = {
    PVP: "🤝",
    PVAI: "🧠",
    AIVSAI: "🤖",
  };

  const difficultyLabel: Record<Difficulty, string> = {
    easy: "Mora (Facile)",
    medium: "Antonony (Moyen)",
    hard: "Sarotra (Difficile)",
  };

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-300`}>
      {/* Header */}
      <header className={`relative overflow-hidden border-b ${border} ${surface}`}>
        <LambaBg isDark={isDark} />
        <div className="relative mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <BaobabIcon />
            <div>
              <span className={`block text-lg font-black tracking-tight ${textPrimary}`}>
                Fanoron-telo
              </span>
              <span className={`block text-xs font-medium ${textSecondary}`}>
                Vanim-potoana Malagasy
              </span>
            </div>
          </div>

          <button
            onClick={onToggleTheme}
            className={`rounded-xl p-2.5 transition border ${border} ${surface} ${textSecondary} hover:${accent}`}
            aria-label="Toggle theme"
          >
            {isDark ? <MoonIcon /> : <SunIcon />}
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className={`h-px w-12 ${isDark ? "bg-[#F0A832]" : "bg-[#C85A2A]"} block`} />
            <span className={`text-xs font-bold uppercase tracking-[0.2em] ${accent}`}>
              Fandreharehana Malagasy
            </span>
            <span className={`h-px w-12 ${isDark ? "bg-[#F0A832]" : "bg-[#C85A2A]"} block`} />
          </div>
          <h1 className={`text-5xl font-black tracking-tight ${textPrimary}`}>
            Fanorona
          </h1>
          <p className={`mt-3 text-sm font-medium ${textSecondary}`}>
            Placement · Mouvement · Alignement gagnant
          </p>
          <div className={`mt-4 mx-auto h-1 w-20 rounded-full ${isDark ? "bg-[#2E7D4F]" : "bg-[#2E7D4F]"}`} />
        </div>

        {/* Mode selector */}
        <div className="grid gap-3 sm:grid-cols-3">
          {(Object.keys(modeLabels) as GameMode[]).map((candidate) => {
            const isSelected = mode === candidate;
            return (
              <button
                key={candidate}
                type="button"
                onClick={() => setMode(candidate)}
                className={`rounded-2xl border-2 p-5 text-left transition-all duration-200 ${
                  isSelected
                    ? isDark
                      ? "border-[#F0A832] bg-[#2A2010] shadow-lg shadow-[#F0A832]/10"
                      : "border-[#C85A2A] bg-[#FFF3E8] shadow-lg shadow-[#C85A2A]/10"
                    : `${border} ${surface} hover:border-[#C85A2A]/50 dark:hover:border-[#F0A832]/50`
                }`}
              >
                <span className="text-2xl mb-2 block">{modeIcons[candidate]}</span>
                <p className={`font-bold text-sm ${isDark ? "text-[#FDF6E3]" : "text-[#1A1410]"}`}>
                  {modeLabels[candidate]}
                </p>
                <p className={`mt-1 text-xs leading-relaxed ${textSecondary}`}>
                  {candidate === "PVP" && "Roa mpiombonantoka eo amin'ny efijery iray"}
                  {candidate === "PVAI" && "Afrantez l'intelligence artificielle"}
                  {candidate === "AIVSAI" && "Regardez deux IA s'affronter"}
                </p>
                {isSelected && (
                  <div className={`mt-3 h-0.5 w-8 rounded-full ${isDark ? "bg-[#F0A832]" : "bg-[#C85A2A]"}`} />
                )}
              </button>
            );
          })}
        </div>

        {/* AI Settings */}
        <div className="mt-5">
          {mode === "PVAI" && (
            <div className={`rounded-2xl border ${border} ${surface} p-6`}>
              <div className="flex items-center gap-2 mb-5">
                <span className={`h-4 w-1 rounded-full ${accentBg} block`} />
                <h2 className={`text-xs font-bold uppercase tracking-widest ${textSecondary}`}>
                  Paramètres IA
                </h2>
              </div>
              <div className="flex flex-wrap items-end gap-5">
                <div>
                  <label className={`block text-xs font-semibold mb-1.5 ${textSecondary}`}>
                    Côté humain
                  </label>
                  <select
                    value={humanSide}
                    onChange={(e) => setHumanSide(e.target.value as Player)}
                    className={`rounded-xl border ${border} px-3 py-2 text-sm font-medium ${
                      isDark
                        ? "bg-[#1A1410] text-[#FDF6E3]"
                        : "bg-[#FDF6E3] text-[#1A1410]"
                    } focus:outline-none focus:ring-2 focus:ring-[#C85A2A]`}
                  >
                    <option value="X">X — Commence</option>
                    <option value="O">O — Deuxième</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1.5 ${textSecondary}`}>
                    Niveau IA
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                    className={`rounded-xl border ${border} px-3 py-2 text-sm font-medium ${
                      isDark
                        ? "bg-[#1A1410] text-[#FDF6E3]"
                        : "bg-[#FDF6E3] text-[#1A1410]"
                    } focus:outline-none focus:ring-2 focus:ring-[#C85A2A]`}
                  >
                    {difficulties.map((level) => (
                      <option key={level} value={level}>
                        {difficultyLabel[level]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {mode === "AIVSAI" && (
            <div className={`rounded-2xl border ${border} ${surface} p-6`}>
              <div className="flex items-center gap-2 mb-5">
                <span className={`h-4 w-1 rounded-full ${isDark ? "bg-[#4DB87A]" : "bg-[#2E7D4F]"} block`} />
                <h2 className={`text-xs font-bold uppercase tracking-widest ${textSecondary}`}>
                  Configuration IA vs IA
                </h2>
              </div>
              <div className="flex flex-wrap items-end gap-5">
                {(["X", "O"] as const).map((player) => (
                  <div key={player}>
                    <label className={`block text-xs font-semibold mb-1.5 ${textSecondary}`}>
                      IA {player}
                    </label>
                    <select
                      value={player === "X" ? aiX : aiO}
                      onChange={(e) =>
                        player === "X"
                          ? setAiX(e.target.value as Difficulty)
                          : setAiO(e.target.value as Difficulty)
                      }
                      className={`rounded-xl border ${border} px-3 py-2 text-sm font-medium ${
                        isDark
                          ? "bg-[#1A1410] text-[#FDF6E3]"
                          : "bg-[#FDF6E3] text-[#1A1410]"
                      } focus:outline-none focus:ring-2 focus:ring-[#2E7D4F]`}
                    >
                      {difficulties.map((level) => (
                        <option key={level} value={level}>
                          {difficultyLabel[level]}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={handleStart}
            className={`group relative overflow-hidden rounded-2xl px-12 py-4 text-base font-black text-white shadow-xl transition-all duration-200 hover:scale-[1.03] hover:shadow-2xl active:scale-[0.98] ${
              isDark
                ? "bg-gradient-to-br from-[#F0A832] to-[#C85A2A] shadow-[#F0A832]/20"
                : "bg-gradient-to-br from-[#C85A2A] to-[#9B3D1A] shadow-[#C85A2A]/30"
            }`}
          >
            <span className="relative z-10 tracking-wide">🎮 Lancer la partie</span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </div>

        {/* Decorative divider with Madagascar flag colors */}
        <div className="mt-12 flex items-center gap-0 overflow-hidden rounded-full h-1.5 max-w-xs mx-auto">
          <div className="flex-1 bg-white h-full" />
          <div className="flex-1 bg-[#FC3D32] h-full" />
          <div className="flex-1 bg-[#007E3A] h-full" />
        </div>

        {/* Stats */}
        <div className="mt-6">
          <div className={`rounded-2xl border ${border} ${surface} p-5 shadow-sm`}>
            <div className="flex items-center gap-2 mb-4">
              <span className={`h-4 w-1 rounded-full ${isDark ? "bg-[#4DB87A]" : "bg-[#2E7D4F]"} block`} />
              <h3 className={`text-xs font-bold uppercase tracking-widest ${textSecondary}`}>
                Statistiques
              </h3>
            </div>
            <StatsPanel stats={stats} theme={theme} />
          </div>
        </div>

        {/* Footer tagline */}
        <p className={`mt-8 text-center text-xs ${textSecondary} opacity-60`}>
          Fanoronatelo — Jeu traditionnel de Madagascar 🇲🇬
        </p>
      </div>
    </div>
  );
};
