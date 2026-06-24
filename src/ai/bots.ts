import { pickBestMove } from "./minimax";
import { getLegalMoves } from "../services/gameRules";
import type { Difficulty, GameSnapshot, LegalMove, Player } from "../types/game";

export const pickEasyMove = (snapshot: GameSnapshot): LegalMove | null => {
  const legal = getLegalMoves(snapshot, snapshot.currentPlayer);
  if (legal.length === 0) return null;
  const idx = Math.floor(Math.random() * legal.length);
  return legal[idx];
};

export const pickMediumMove = (snapshot: GameSnapshot, aiPlayer: Player): LegalMove | null =>
  pickBestMove(snapshot, aiPlayer, {
    maxDepth: 1,
    useAlphaBeta: false
  });

export const pickHardMove = (snapshot: GameSnapshot, aiPlayer: Player): LegalMove | null =>
  pickBestMove(snapshot, aiPlayer, {
    maxDepth: 7,
    useAlphaBeta: true,
    timeLimitMs: 450
  });

export const pickMoveByDifficulty = (
  difficulty: Difficulty,
  snapshot: GameSnapshot,
  aiPlayer: Player
): LegalMove | null => {
  if (difficulty === "easy") return pickEasyMove(snapshot);
  if (difficulty === "medium") return pickMediumMove(snapshot, aiPlayer);
  return pickHardMove(snapshot, aiPlayer);
};
