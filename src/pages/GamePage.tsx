import { useEffect, useRef } from "react";
import { Board } from "../components/Board";
import { GameControls } from "../components/GameControls";
import { GameStatus } from "../components/GameStatus";
import { MoveHistory } from "../components/MoveHistory";
import { StatsPanel } from "../components/StatsPanel";
import { useFanoronaGame } from "../hooks/useFanoronaGame";
import type { GameStats } from "../services/statsService";
import type { GameOptions, GameSnapshot } from "../types/game";

interface GamePageProps {
  options: GameOptions;
  stats: GameStats;
  onGameFinished: (snapshot: GameSnapshot) => void;
  onBackHome: () => void;
  onToggleTheme: () => void;
  theme: "light" | "dark";
}

export const GamePage = ({ options, stats, onGameFinished, onBackHome, onToggleTheme, theme }: GamePageProps) => {
  const { snapshot, selectedCell, legalTargets, canUndo, canRedo, handleCellClick, undo, redo, restart } =
    useFanoronaGame(options);
  const reportedKeyRef = useRef<string>("");

  useEffect(() => {
    if (snapshot.phase !== "finished") {
      reportedKeyRef.current = "";
      return;
    }
    const key = `${snapshot.moveHistory.length}-${snapshot.winner ?? "draw"}`;
    if (reportedKeyRef.current === key) return;
    reportedKeyRef.current = key;
    onGameFinished(snapshot);
  }, [snapshot, onGameFinished]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      {/* HEADER WITH BADGE */}
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
            Fanoron-telo
          </h1>
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            Mode : {options.mode}
          </span>
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

      {/* GAME GRID */}
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* LEFT COLUMN: ACTION & BOARD */}
        <section className="space-y-4">
          <GameStatus snapshot={snapshot} players={options.players} />
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <Board board={snapshot.board} selectedCell={selectedCell} legalTargets={legalTargets} onCellClick={handleCellClick} />
          </div>
          <GameControls canUndo={canUndo} canRedo={canRedo} onUndo={undo} onRedo={redo} onRestart={restart} onBackHome={onBackHome} />
        </section>
        
        {/* RIGHT COLUMN: DATA & HISTORY */}
        <section className="space-y-4">
          <MoveHistory moves={snapshot.moveHistory} />
          <StatsPanel stats={stats} />
        </section>
      </div>
    </main>
  );
};