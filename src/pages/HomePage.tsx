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
  AIVSAI: "IA vs IA (Demo)"
};

const difficulties: Difficulty[] = ["easy", "medium", "hard"];

export const HomePage = ({ onStart, onToggleTheme, theme, stats }: HomePageProps) => {
  const [mode, setMode] = useState<GameMode>("PVAI");
  const [humanSide, setHumanSide] = useState<Player>("X");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [aiX, setAiX] = useState<Difficulty>("easy");
  const [aiO, setAiO] = useState<Difficulty>("hard");

  const handleStart = () => {
    if (mode === "PVP") {
      onStart({
        mode,
        aiVsAiDelayMs: 420,
        players: { X: { type: "human" }, O: { type: "human" } }
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
            : { X: { type: "ai", difficulty }, O: { type: "human" } }
      });
      return;
    }

    onStart({
      mode,
      aiVsAiDelayMs: 420,
      players: {
        X: { type: "ai", difficulty: aiX },
        O: { type: "ai", difficulty: aiO }
      }
    });
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100">Fanoron-telo Arena</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Jeu traditionnel malgache - placement, mouvement, alignement gagnant.
          </p>
        </div>
        <button
          type="button"
          onClick={onToggleTheme}
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
        >
          {theme === "dark" ? "Mode clair" : "Mode sombre"}
        </button>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {(Object.keys(modeLabels) as GameMode[]).map((candidate) => (
          <button
            key={candidate}
            type="button"
            onClick={() => setMode(candidate)}
            className={`rounded-2xl border p-4 text-left transition-all ${
              mode === candidate
                ? "border-accent bg-sky-50 shadow-glow dark:bg-sky-900/20"
                : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900"
            }`}
          >
            <p className="font-bold text-slate-900 dark:text-slate-100">{modeLabels[candidate]}</p>
          </button>
        ))}
      </section>

      {mode === "PVAI" && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Parametres IA</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <label className="text-sm text-slate-700 dark:text-slate-200">
              Cote humain
              <select
                value={humanSide}
                onChange={(event) => setHumanSide(event.target.value as Player)}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
              >
                <option value="X">X (commence)</option>
                <option value="O">O</option>
              </select>
            </label>
            <label className="text-sm text-slate-700 dark:text-slate-200">
              Niveau IA
              <select
                value={difficulty}
                onChange={(event) => setDifficulty(event.target.value as Difficulty)}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
              >
                {difficulties.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>
      )}

      {mode === "AIVSAI" && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Configuration IA vs IA</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <label className="text-sm text-slate-700 dark:text-slate-200">
              IA X
              <select
                value={aiX}
                onChange={(event) => setAiX(event.target.value as Difficulty)}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
              >
                {difficulties.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm text-slate-700 dark:text-slate-200">
              IA O
              <select
                value={aiO}
                onChange={(event) => setAiO(event.target.value as Difficulty)}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
              >
                {difficulties.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>
      )}

      <footer>
        <button
          type="button"
          onClick={handleStart}
          className="rounded-xl bg-accent px-6 py-3 text-base font-bold text-white transition hover:bg-sky-600"
        >
          Lancer la partie
        </button>
      </footer>

      <StatsPanel stats={stats} />
    </main>
  );
};
