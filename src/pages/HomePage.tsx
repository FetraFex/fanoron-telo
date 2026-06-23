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

const modeLabels: Record<GameMode, { title: string; desc: string; icon: React.ReactNode }> = {
  PVP: {
    title: "Joueur vs Joueur",
    desc: "Affrontez un ami sur le même écran",
    icon: (
      <svg className="h-5 w-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  PVAI: {
    title: "Joueur vs IA",
    desc: "Défiez l'ordinateur à votre rythme",
    icon: (
      <svg className="h-5 w-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  AIVSAI: {
    title: "IA vs IA (Démo)",
    desc: "Regardez deux algorithmes s'affronter",
    icon: (
      <svg className="h-5 w-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  }
};

const difficulties: { value: Difficulty; label: string }[] = [
  { value: "easy", label: "Facile" },
  { value: "medium", label: "Moyen" },
  { value: "hard", label: "Difficile" }
];

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
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      {/* HEADER */}
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
            Fanoron-telo Arena
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Jeu traditionnel malgache — placement, mouvement, alignement gagnant.
          </p>
        </div>
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label="Changer le thème"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          {theme === "dark" ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m2.828 9.9a5 5 0 117.071-7.071 5 5 0 01-7.071 7.071z" /></svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          )}
        </button>
      </header>

      {/* MODE SELECTION */}
      <section className="grid gap-4 sm:grid-cols-3">
        {(Object.keys(modeLabels) as GameMode[]).map((candidate) => {
          const isSelected = mode === candidate;
          return (
            <button
              key={candidate}
              type="button"
              onClick={() => setMode(candidate)}
              className={`group flex flex-col gap-3 rounded-2xl border p-5 text-left transition-all ${
                isSelected
                  ? "border-sky-500 bg-sky-50/50 ring-2 ring-sky-500/20 dark:border-sky-400 dark:bg-sky-950/20"
                  : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
              }`}
            >
              <div className={`rounded-lg p-2 inline-flex w-fit ${isSelected ? 'bg-sky-100 dark:bg-sky-900/40' : 'bg-slate-100 dark:bg-slate-800'}`}>
                {modeLabels[candidate].icon}
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-slate-100">{modeLabels[candidate].title}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{modeLabels[candidate].desc}</p>
              </div>
            </button>
          );
        })}
      </section>

      {/* SETTINGS PANELS (Segmented Controls replacing <select>) */}
      {mode === "PVAI" && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Configuration de l'affrontement</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Votre camp</span>
              <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-950 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setHumanSide("X")}
                  className={`flex-1 sm:flex-initial rounded-lg px-5 py-2 text-sm font-bold transition-all ${humanSide === "X" ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-slate-100" : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"}`}
                >
                  X (Commence)
                </button>
                <button
                  type="button"
                  onClick={() => setHumanSide("O")}
                  className={`flex-1 sm:flex-initial rounded-lg px-5 py-2 text-sm font-bold transition-all ${humanSide === "O" ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-slate-100" : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"}`}
                >
                  O
                </button>
              </div>
            </div>

            <div>
              <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Difficulté de l'IA</span>
              <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-950 w-full sm:w-auto">
                {difficulties.map((diff) => (
                  <button
                    key={diff.value}
                    type="button"
                    onClick={() => setDifficulty(diff.value)}
                    className={`flex-1 sm:flex-initial rounded-lg px-4 py-2 text-sm font-semibold transition-all ${difficulty === diff.value ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-slate-100" : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"}`}
                  >
                    {diff.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {mode === "AIVSAI" && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Niveaux des Intelligences Artificielles</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">IA Spécialiste X</span>
              <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-950 w-full sm:w-auto">
                {difficulties.map((diff) => (
                  <button
                    key={diff.value}
                    type="button"
                    onClick={() => setAiX(diff.value)}
                    className={`flex-1 sm:flex-initial rounded-lg px-4 py-2 text-sm font-semibold transition-all ${aiX === diff.value ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-slate-100" : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"}`}
                  >
                    {diff.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">IA Spécialiste O</span>
              <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-950 w-full sm:w-auto">
                {difficulties.map((diff) => (
                  <button
                    key={diff.value}
                    type="button"
                    onClick={() => setAiO(diff.value)}
                    className={`flex-1 sm:flex-initial rounded-lg px-4 py-2 text-sm font-semibold transition-all ${aiO === diff.value ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-slate-100" : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"}`}
                  >
                    {diff.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FOOTER CTA */}
      <footer className="flex justify-center pt-2">
        <button
          type="button"
          onClick={handleStart}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-8 py-4 text-base font-black text-white shadow-md shadow-sky-600/10 transition-all hover:scale-[1.02] hover:bg-sky-500 hover:shadow-lg active:scale-[0.98]"
        >
          Lancer la partie
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </footer>

      <StatsPanel stats={stats} />
    </main>
  );
};