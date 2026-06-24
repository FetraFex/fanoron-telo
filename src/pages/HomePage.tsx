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
  AIVSAI: "IA vs IA (Demo)",
};

const difficulties: Difficulty[] = ["easy", "medium", "hard"];

// Professional Sun/Moon icons (inline SVGs)
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

  const handleStart = () => {
    if (mode === "PVP") {
      onStart({
        mode,
        aiVsAiDelayMs: 420,
        players: { X: { type: "human" }, O: { type: "human" } },
      });
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

    onStart({
      mode,
      aiVsAiDelayMs: 420,
      players: {
        X: { type: "ai", difficulty: aiX },
        O: { type: "ai", difficulty: aiO },
      },
    });
  };

  return (
    <div className={`min-h-screen ${isDark ? "bg-[#1a1a1a]" : "bg-[#f0f0f0]"}`}>
      {/* Top navbar */}
      <header
        className={`border-b ${isDark ? "border-[#2d2d2d] bg-[#262626]" : "border-[#e0e0e0] bg-white"}`}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <span
              className={`text-base font-bold tracking-tight ${isDark ? "text-white" : "text-[#1a1a1a]"}`}
            >
              Fanoron-telo
            </span>
          </div>

          <button
            onClick={onToggleTheme}
            className={`rounded-lg p-2 transition ${
              isDark
                ? "bg-[#3d3d3d] text-[#b0b0b0] hover:bg-[#4d4d4d] hover:text-white"
                : "bg-[#e8e8e8] text-[#4a4a4a] hover:bg-[#d5d5d5] hover:text-black"
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? <MoonIcon /> : <SunIcon />}
          </button>
        </div>
      </header>

      {/* Rest of the page unchanged */}
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1
            className={`text-4xl font-black tracking-tight ${isDark ? "text-white" : "text-[#1a1a1a]"}`}
          >
            Fanoron-telo Arena
          </h1>
          <p
            className={`mt-2 text-sm ${isDark ? "text-[#8a8a8a]" : "text-[#6a6a6a]"}`}
          >
            Placement · Mouvement · Alignement gagnant
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {(Object.keys(modeLabels) as GameMode[]).map((candidate) => {
            const isSelected = mode === candidate;
            return (
              <button
                key={candidate}
                type="button"
                onClick={() => setMode(candidate)}
                className={`rounded-xl border-2 p-4 text-left transition-all ${
                  isSelected
                    ? "border-blue-500 bg-blue-50/80 shadow-md dark:border-blue-400 dark:bg-blue-950/30"
                    : `border-[#e0e0e0] bg-white hover:border-[#b0b0b0] dark:border-[#3d3d3d] dark:bg-[#262626] dark:hover:border-[#5a5a5a]`
                }`}
              >
                <p
                  className={`font-bold ${isDark ? "text-white" : "text-[#1a1a1a]"}`}
                >
                  {modeLabels[candidate]}
                </p>
                <p
                  className={`mt-1 text-xs ${isDark ? "text-[#8a8a8a]" : "text-[#6a6a6a]"}`}
                >
                  {candidate === "PVP" && "Deux joueurs sur le même écran"}
                  {candidate === "PVAI" &&
                    "Affrontez l'intelligence artificielle"}
                  {candidate === "AIVSAI" && "Regardez deux IA s'affronter"}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-6">
          {mode === "PVAI" && (
            <div
              className={`rounded-xl border p-5 ${
                isDark
                  ? "border-[#3d3d3d] bg-[#262626]"
                  : "border-[#e0e0e0] bg-white"
              }`}
            >
              <h2
                className={`text-sm font-semibold uppercase tracking-wider ${isDark ? "text-[#8a8a8a]" : "text-[#6a6a6a]"}`}
              >
                Paramètres IA
              </h2>
              <div className="mt-4 flex flex-wrap items-end gap-4">
                <div>
                  <label
                    className={`block text-xs font-medium ${isDark ? "text-[#b0b0b0]" : "text-[#4a4a4a]"}`}
                  >
                    Côté humain
                  </label>
                  <select
                    value={humanSide}
                    onChange={(e) => setHumanSide(e.target.value as Player)}
                    className={`mt-1 rounded-lg border px-3 py-2 text-sm ${
                      isDark
                        ? "border-[#3d3d3d] bg-[#1a1a1a] text-white"
                        : "border-[#d0d0d0] bg-white text-[#1a1a1a]"
                    }`}
                  >
                    <option value="X">X (commence)</option>
                    <option value="O">O</option>
                  </select>
                </div>
                <div>
                  <label
                    className={`block text-xs font-medium ${isDark ? "text-[#b0b0b0]" : "text-[#4a4a4a]"}`}
                  >
                    Niveau IA
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) =>
                      setDifficulty(e.target.value as Difficulty)
                    }
                    className={`mt-1 rounded-lg border px-3 py-2 text-sm ${
                      isDark
                        ? "border-[#3d3d3d] bg-[#1a1a1a] text-white"
                        : "border-[#d0d0d0] bg-white text-[#1a1a1a]"
                    }`}
                  >
                    {difficulties.map((level) => (
                      <option key={level} value={level}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {mode === "AIVSAI" && (
            <div
              className={`rounded-xl border p-5 ${
                isDark
                  ? "border-[#3d3d3d] bg-[#262626]"
                  : "border-[#e0e0e0] bg-white"
              }`}
            >
              <h2
                className={`text-sm font-semibold uppercase tracking-wider ${isDark ? "text-[#8a8a8a]" : "text-[#6a6a6a]"}`}
              >
                Configuration IA vs IA
              </h2>
              <div className="mt-4 flex flex-wrap items-end gap-4">
                <div>
                  <label
                    className={`block text-xs font-medium ${isDark ? "text-[#b0b0b0]" : "text-[#4a4a4a]"}`}
                  >
                    IA X
                  </label>
                  <select
                    value={aiX}
                    onChange={(e) => setAiX(e.target.value as Difficulty)}
                    className={`mt-1 rounded-lg border px-3 py-2 text-sm ${
                      isDark
                        ? "border-[#3d3d3d] bg-[#1a1a1a] text-white"
                        : "border-[#d0d0d0] bg-white text-[#1a1a1a]"
                    }`}
                  >
                    {difficulties.map((level) => (
                      <option key={level} value={level}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    className={`block text-xs font-medium ${isDark ? "text-[#b0b0b0]" : "text-[#4a4a4a]"}`}
                  >
                    IA O
                  </label>
                  <select
                    value={aiO}
                    onChange={(e) => setAiO(e.target.value as Difficulty)}
                    className={`mt-1 rounded-lg border px-3 py-2 text-sm ${
                      isDark
                        ? "border-[#3d3d3d] bg-[#1a1a1a] text-white"
                        : "border-[#d0d0d0] bg-white text-[#1a1a1a]"
                    }`}
                  >
                    {difficulties.map((level) => (
                      <option key={level} value={level}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={handleStart}
            className="rounded-xl bg-blue-600 px-10 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-700 hover:shadow-blue-600/40 dark:shadow-blue-500/20"
          >
            Lancer la partie
          </button>
        </div>

        <div className="mt-12">
          <div
            className={`rounded-xl border ${isDark ? "border-[#3d3d3d] bg-[#262626]" : "border-[#e0e0e0] bg-white"} p-4 shadow-sm`}
          >
            <StatsPanel stats={stats} theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
};