import { useState } from "react";
import { StatsPanel } from "../components/StatsPanel";
import type { GameStats } from "../services/statsService";
import type { Difficulty, GameMode, GameOptions, Player } from "../types/game";

interface HomePageProps {
  onStart: (options: GameOptions) => void;
  stats: GameStats;
}

const modeMeta: Record<GameMode, { label: string; sub: string; icon: string; ring: string; activeBg: string }> = {
  PVP: { label: "Joueur vs Joueur", sub: "Affrontez un ami", icon: "👥", ring: "border-playerX shadow-glowBlue", activeBg: "bg-blue-50" },
  PVAI: { label: "Joueur vs IA", sub: "Défiez l'ordinateur", icon: "🧑", ring: "border-good shadow-glowGreen", activeBg: "bg-green-50" },
  AIVSAI: { label: "IA vs IA (Démo)", sub: "Regardez l'IA jouer", icon: "🤖", ring: "border-playerO shadow-glowPurple", activeBg: "bg-purple-50" }
};

const difficulties: Difficulty[] = ["easy", "medium", "hard"];
const difficultyLabel: Record<Difficulty, string> = { easy: "Facile", medium: "Moyen", hard: "Difficile" };

const selectClass =
  "mt-1 w-full rounded-xl border border-panel-border bg-panel px-3 py-2 text-sm text-slate-700 focus:border-accent focus:outline-none";

export const HomePage = ({ onStart, stats }: HomePageProps) => {
  const [mode, setMode] = useState<GameMode>("PVAI");
  const [humanSide, setHumanSide] = useState<Player>("X");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [aiX, setAiX] = useState<Difficulty>("easy");
  const [aiO, setAiO] = useState<Difficulty>("hard");

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
            : { X: { type: "ai", difficulty }, O: { type: "human" } }
      });
      return;
    }
    onStart({
      mode,
      aiVsAiDelayMs: 420,
      players: { X: { type: "ai", difficulty: aiX }, O: { type: "ai", difficulty: aiO } }
    });
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="relative overflow-hidden rounded-b-3xl bg-hero-leaves px-6 py-10 sm:px-10">
        <div className="absolute inset-0 -z-10 bg-wood-grain opacity-20" />
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          FANORONA
          <span className="ml-2 text-warn">TELO</span>
        </h1>
      </div>

      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <section>
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">Mode de jeu</h2>
          <div className="grid gap-3 md:grid-cols-3">
            {(Object.keys(modeMeta) as GameMode[]).map((candidate) => {
              const meta = modeMeta[candidate];
              const active = mode === candidate;
              return (
                <button
                  key={candidate}
                  type="button"
                  onClick={() => setMode(candidate)}
                  className={`rounded-2xl border p-4 text-left transition-all ${
                    active ? `${meta.ring} ${meta.activeBg}` : "border-panel-border bg-panel-soft hover:border-slate-300"
                  }`}
                >
                  <span className="text-2xl">{meta.icon}</span>
                  <p className="mt-2 font-bold text-slate-800">{meta.label}</p>
                  <p className="text-xs text-slate-500">{meta.sub}</p>
                </button>
              );
            })}
          </div>
        </section>

        {mode === "PVAI" && (
          <section className="rounded-2xl border border-panel-border bg-panel-soft p-5 shadow-card">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Paramètres IA</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="text-sm text-slate-600">
                Côté humain
                <select value={humanSide} onChange={(e) => setHumanSide(e.target.value as Player)} className={selectClass}>
                  <option value="X">X (commence)</option>
                  <option value="O">O</option>
                </select>
              </label>
              <label className="text-sm text-slate-600">
                Niveau IA
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty)} className={selectClass}>
                  {difficulties.map((level) => (
                    <option key={level} value={level}>
                      {difficultyLabel[level]}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </section>
        )}

        {mode === "AIVSAI" && (
          <section className="rounded-2xl border border-panel-border bg-panel-soft p-5 shadow-card">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Configuration IA vs IA</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="text-sm text-slate-600">
                IA X
                <select value={aiX} onChange={(e) => setAiX(e.target.value as Difficulty)} className={selectClass}>
                  {difficulties.map((level) => (
                    <option key={level} value={level}>
                      {difficultyLabel[level]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm text-slate-600">
                IA O
                <select value={aiO} onChange={(e) => setAiO(e.target.value as Difficulty)} className={selectClass}>
                  {difficulties.map((level) => (
                    <option key={level} value={level}>
                      {difficultyLabel[level]}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </section>
        )}

        <button
          type="button"
          onClick={handleStart}
          className="flex items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-4 text-base font-bold text-white shadow-glowBlue transition hover:bg-sky-500"
        >
          Lancer la partie <span aria-hidden>▶</span>
        </button>

        <StatsPanel stats={stats} />

      </div>
    </main>
  );
};
