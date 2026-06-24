import { useCallback, useEffect, useMemo, useState } from "react";
import { pickMoveByDifficulty } from "../ai/bots";
import { applyMove, createInitialSnapshot, getLegalMoves } from "../services/gameRules";
import type { GameOptions, GameSnapshot, LegalMove } from "../types/game";

interface UseFanoronaGameResult {
  snapshot: GameSnapshot;
  selectedCell: number | null;
  canUndo: boolean;
  canRedo: boolean;
  legalTargets: number[];
  handleCellClick: (index: number) => void;
  undo: () => void;
  redo: () => void;
  restart: () => void;
}

const selectHumanMove = (
  snapshot: GameSnapshot,
  selectedCell: number | null,
  targetCell: number
): { move: LegalMove | null; nextSelectedCell: number | null } => {
  const legalMoves = getLegalMoves(snapshot);
  if (snapshot.phase === "placement") {
    const found = legalMoves.find((move) => move.to === targetCell && move.from === null);
    return { move: found ?? null, nextSelectedCell: null };
  }

  const cellValue = snapshot.board[targetCell];
  if (cellValue === snapshot.currentPlayer) {
    return { move: null, nextSelectedCell: targetCell };
  }

  if (selectedCell === null) return { move: null, nextSelectedCell: null };
  const found = legalMoves.find((move) => move.from === selectedCell && move.to === targetCell);
  return { move: found ?? null, nextSelectedCell: found ? null : selectedCell };
};

export const useFanoronaGame = (options: GameOptions): UseFanoronaGameResult => {
  const [timeline, setTimeline] = useState<GameSnapshot[]>([createInitialSnapshot()]);
  const [cursor, setCursor] = useState(0);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);

  const snapshot = timeline[cursor];
  const currentConfig = options.players[snapshot.currentPlayer];
  const isAiTurn = snapshot.phase !== "finished" && currentConfig.type === "ai";

  const legalTargets = useMemo(() => {
    if (snapshot.phase !== "movement" || selectedCell === null) return [];
    return getLegalMoves(snapshot)
      .filter((move) => move.from === selectedCell)
      .map((move) => move.to);
  }, [snapshot, selectedCell]);

  const commitMove = useCallback((move: LegalMove) => {
    const next = applyMove(snapshot, move);
    if (next === snapshot) return;
    const nextTimeline = timeline.slice(0, cursor + 1);
    nextTimeline.push(next);
    setTimeline(nextTimeline);
    setCursor(nextTimeline.length - 1);
    setSelectedCell(null);
  }, [snapshot, timeline, cursor]);

  const handleCellClick = (index: number) => {
    if (snapshot.phase === "finished" || isAiTurn) return;

    const { move, nextSelectedCell } = selectHumanMove(snapshot, selectedCell, index);
    setSelectedCell(nextSelectedCell);
    if (move) commitMove(move);
  };

  useEffect(() => {
    if (!isAiTurn) return;
    const difficulty = currentConfig.difficulty ?? "easy";
    const timer = window.setTimeout(() => {
      const move = pickMoveByDifficulty(difficulty, snapshot, snapshot.currentPlayer);
      if (move) commitMove(move);
    }, options.mode === "AIVSAI" ? options.aiVsAiDelayMs : 350);

    return () => window.clearTimeout(timer);
  }, [isAiTurn, currentConfig.difficulty, snapshot, options.mode, options.aiVsAiDelayMs, commitMove]);

  const undo = () => {
    if (cursor === 0) return;
    setCursor((prev) => prev - 1);
    setSelectedCell(null);
  };

  const redo = () => {
    if (cursor >= timeline.length - 1) return;
    setCursor((prev) => prev + 1);
    setSelectedCell(null);
  };

  const restart = () => {
    setTimeline([createInitialSnapshot()]);
    setCursor(0);
    setSelectedCell(null);
  };

  return {
    snapshot,
    selectedCell,
    canUndo: cursor > 0,
    canRedo: cursor < timeline.length - 1,
    legalTargets,
    handleCellClick,
    undo,
    redo,
    restart
  };
};
