import { evaluateSnapshot } from "./evaluation";
import { applyMove, getLegalMoves, serializeSnapshot } from "../services/gameRules";
import type { GameSnapshot, LegalMove, Player } from "../types/game";

interface SearchResult {
  score: number;
  move: LegalMove | null;
}

interface SearchOptions {
  maxDepth: number;
  useAlphaBeta: boolean;
  timeLimitMs?: number;
}

interface CacheEntry {
  depth: number;
  score: number;
}

const isTerminal = (snapshot: GameSnapshot): boolean => snapshot.phase === "finished" || snapshot.winner !== null;

const minimaxCore = (
  snapshot: GameSnapshot,
  aiPlayer: Player,
  depth: number,
  maximizing: boolean,
  alpha: number,
  beta: number,
  options: SearchOptions,
  transposition: Map<string, CacheEntry>,
  startTime: number
): SearchResult => {
  if (options.timeLimitMs && performance.now() - startTime >= options.timeLimitMs) {
    return { score: evaluateSnapshot(snapshot, aiPlayer), move: null };
  }

  if (depth === 0 || isTerminal(snapshot)) {
    return { score: evaluateSnapshot(snapshot, aiPlayer), move: null };
  }

  const key = serializeSnapshot(snapshot);
  const cached = transposition.get(key);
  if (cached && cached.depth >= depth) {
    return { score: cached.score, move: null };
  }

  const legalMoves = getLegalMoves(snapshot, snapshot.currentPlayer);
  if (legalMoves.length === 0) {
    return { score: evaluateSnapshot(snapshot, aiPlayer), move: null };
  }

  let bestMove: LegalMove | null = null;
  let bestScore = maximizing ? -Infinity : Infinity;

  for (const move of legalMoves) {
    const nextSnapshot = applyMove(snapshot, move);
    const result = minimaxCore(
      nextSnapshot,
      aiPlayer,
      depth - 1,
      !maximizing,
      alpha,
      beta,
      options,
      transposition,
      startTime
    );

    if (maximizing) {
      if (result.score > bestScore) {
        bestScore = result.score;
        bestMove = move;
      }
      alpha = Math.max(alpha, bestScore);
    } else {
      if (result.score < bestScore) {
        bestScore = result.score;
        bestMove = move;
      }
      beta = Math.min(beta, bestScore);
    }

    if (options.useAlphaBeta && beta <= alpha) break;
  }

  transposition.set(key, { depth, score: bestScore });
  return { score: bestScore, move: bestMove };
};

export const pickBestMove = (
  snapshot: GameSnapshot,
  aiPlayer: Player,
  options: SearchOptions
): LegalMove | null => {
  const maximizing = snapshot.currentPlayer === aiPlayer;
  const transposition = new Map<string, CacheEntry>();
  const startTime = performance.now();

  if (!options.useAlphaBeta) {
    return minimaxCore(
      snapshot,
      aiPlayer,
      options.maxDepth,
      maximizing,
      -Infinity,
      Infinity,
      options,
      transposition,
      startTime
    ).move;
  }

  // Iterative deepening helps keep UI responsive and improves move quality in short budgets.
  let bestMove: LegalMove | null = null;
  for (let depth = 1; depth <= options.maxDepth; depth += 1) {
    const result = minimaxCore(
      snapshot,
      aiPlayer,
      depth,
      maximizing,
      -Infinity,
      Infinity,
      options,
      transposition,
      startTime
    );
    if (result.move) bestMove = result.move;
    if (options.timeLimitMs && performance.now() - startTime >= options.timeLimitMs) break;
  }
  return bestMove;
};
