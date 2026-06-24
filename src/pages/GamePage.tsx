import { useEffect, useRef } from "react";
import { GameScreen } from "../components/in-game/GameScreen";
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
    <GameScreen
      snapshot={snapshot}
      selectedCell={selectedCell}
      legalTargets={legalTargets}
      canUndo={canUndo}
      canRedo={canRedo}
      moveCount={snapshot.moveHistory.length}
      players={options.players}
      onCellClick={handleCellClick}
      onUndo={undo}
      onRedo={redo}
      onRestart={restart}
      onBackHome={onBackHome}
    />
  );
};
