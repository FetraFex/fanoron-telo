import { useEffect, useRef } from "react";
import { GameScreen } from "../components/in-game/GameScreen";
import { useFanoronaGame } from "../hooks/useFanoronaGame";
import type { GameStats } from "../services/statsService";
import type { GameOptions, GameSnapshot } from "../types/game";

interface GamePageProps {
  options: GameOptions;
  stats: GameStats;
  muted: boolean;
  onToggleMute: () => void;
  onGameFinished: (snapshot: GameSnapshot) => void;
  onBackHome: () => void;
}

export const GamePage = ({ options, stats, muted, onToggleMute, onGameFinished, onBackHome }: GamePageProps) => {
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
    <GameScreen
      snapshot={snapshot}
      selectedCell={selectedCell}
      legalTargets={legalTargets}
      canUndo={canUndo}
      canRedo={canRedo}
      moveCount={snapshot.moveHistory.length}
      players={options.players}
      mode={options.mode}
      stats={stats}
      muted={muted}
      onToggleMute={onToggleMute}
      onCellClick={handleCellClick}
      onUndo={undo}
      onRedo={redo}
      onRestart={restart}
      onBackHome={onBackHome}
    />
  );
};
