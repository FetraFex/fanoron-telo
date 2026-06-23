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
}

export const GamePage = ({ options, stats, onGameFinished, onBackHome }: GamePageProps) => {
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
    <main className="flex min-h-screen flex-col bg-slate-50 lg:h-screen lg:overflow-hidden">
      <header className="flex shrink-0 items-center justify-between border-b border-panel-border bg-panel px-4 py-3 sm:px-8">
        <button
          type="button"
          onClick={onBackHome}
          className="flex size-9 items-center justify-center rounded-full border border-panel-border text-slate-600 transition hover:bg-panel-soft"
          aria-label="Retour"
        >
          ←
        </button>
        <h1 className="text-lg font-bold text-slate-800">
          {options.mode === "PVP" ? "Joueur vs Joueur" : options.mode === "PVAI" ? "Joueur vs IA" : "IA vs IA"}
        </h1>
        <button
          type="button"
          onClick={onBackHome}
          className="rounded-xl border border-red-300 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
        >
          Abandonner
        </button>
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 px-4 py-4 sm:px-6 lg:min-h-0 lg:overflow-hidden lg:px-8">
        <div className="grid flex-1 gap-4 lg:min-h-0 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="flex flex-col gap-3 lg:min-h-0">
            <GameStatus snapshot={snapshot} players={options.players} />
            <Board board={snapshot.board} selectedCell={selectedCell} legalTargets={legalTargets} onCellClick={handleCellClick} />
            <GameControls canUndo={canUndo} canRedo={canRedo} onUndo={undo} onRedo={redo} onRestart={restart} onBackHome={onBackHome} />
          </section>

          <section className="flex flex-col gap-3 lg:min-h-0">
            <MoveHistory moves={snapshot.moveHistory} />
            <StatsPanel stats={stats} />
          </section>
        </div>
      </div>
    </main>
  );
};
