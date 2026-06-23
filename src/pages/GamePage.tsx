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
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">Fanoron-telo - Partie en cours</h1>
        <button
          type="button"
          onClick={onToggleTheme}
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
        >
          {theme === "dark" ? "Mode clair" : "Mode sombre"}
        </button>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-4">
          <GameStatus snapshot={snapshot} players={options.players} />
          <Board board={snapshot.board} selectedCell={selectedCell} legalTargets={legalTargets} onCellClick={handleCellClick} />
          <GameControls canUndo={canUndo} canRedo={canRedo} onUndo={undo} onRedo={redo} onRestart={restart} onBackHome={onBackHome} />
        </section>
        <section className="space-y-4">
          <MoveHistory moves={snapshot.moveHistory} />
          <StatsPanel stats={stats} />
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 text-sm text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200">
            Mode: <span className="font-semibold">{options.mode}</span>
          </div>
        </section>
      </div>
    </main>
  );
};
