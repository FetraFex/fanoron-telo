import { WIN_LINES } from "../models/board";
import type { GameSnapshot, Player } from "../types/game";
import { lineScore, opponentOf } from "../utils/gameHelpers";
import { getLegalMoves } from "../services/gameRules";

export const evaluateSnapshot = (snapshot: GameSnapshot, aiPlayer: Player): number => {
  if (snapshot.winner === aiPlayer) return 1000;
  if (snapshot.winner && snapshot.winner !== aiPlayer) return -1000;
  if (snapshot.isDraw) return 0;

  const opponent = opponentOf(aiPlayer);
  const lineHeuristic = WIN_LINES.reduce((acc, line) => acc + lineScore(line, snapshot.board, aiPlayer), 0);

  const aiMobility = getLegalMoves(snapshot, aiPlayer).length;
  const oppMobility = getLegalMoves(snapshot, opponent).length;
  const mobility = (aiMobility - oppMobility) * (snapshot.phase === "movement" ? 2 : 1);

  return lineHeuristic + mobility;
};
