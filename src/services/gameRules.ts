import { ADJACENCY } from "../models/board";
import type { CellValue, GameSnapshot, LegalMove, Move, Phase, Player } from "../types/game";
import { checkWinner, cloneBoard, opponentOf } from "../utils/gameHelpers";

export const createInitialSnapshot = (): GameSnapshot => ({
  board: Array<CellValue>(9).fill(null),
  currentPlayer: "X",
  phase: "placement",
  piecesInHand: { X: 3, O: 3 },
  winner: null,
  isDraw: false,
  moveHistory: []
});

const nextPhase = (piecesInHand: Record<Player, number>, winner: Player | null): Phase => {
  if (winner) return "finished";
  if (piecesInHand.X === 0 && piecesInHand.O === 0) return "movement";
  return "placement";
};

export const getLegalMoves = (snapshot: GameSnapshot, player = snapshot.currentPlayer): LegalMove[] => {
  if (snapshot.phase === "finished") return [];
  const { board } = snapshot;

  if (snapshot.phase === "placement") {
    if (snapshot.piecesInHand[player] <= 0) return [];
    return board
      .map((cell, index) => (cell === null ? { from: null, to: index } : null))
      .filter((move): move is LegalMove => move !== null);
  }

  const moves: LegalMove[] = [];
  board.forEach((cell, index) => {
    if (cell !== player) return;
    for (const next of ADJACENCY[index]) {
      if (board[next] === null) {
        moves.push({ from: index, to: next });
      }
    }
  });
  return moves;
};

export const hasAnyLegalMove = (snapshot: GameSnapshot, player = snapshot.currentPlayer): boolean =>
  getLegalMoves(snapshot, player).length > 0;

export const applyMove = (snapshot: GameSnapshot, move: LegalMove): GameSnapshot => {
  const legalMoves = getLegalMoves(snapshot, snapshot.currentPlayer);
  const isLegal = legalMoves.some((candidate) => candidate.from === move.from && candidate.to === move.to);
  if (!isLegal) return snapshot;

  const board = cloneBoard(snapshot.board);
  const player = snapshot.currentPlayer;
  const piecesInHand = { ...snapshot.piecesInHand };

  if (move.from === null) {
    board[move.to] = player;
    piecesInHand[player] -= 1;
  } else {
    board[move.from] = null;
    board[move.to] = player;
  }

  const winner = checkWinner(board);
  const phase = nextPhase(piecesInHand, winner);
  const nextPlayer = winner ? player : opponentOf(player);

  const moveRecord: Move = {
    kind: move.from === null ? "place" : "move",
    player,
    from: move.from,
    to: move.to,
    turn: snapshot.moveHistory.length + 1
  };

  const nextSnapshot: GameSnapshot = {
    board,
    currentPlayer: nextPlayer,
    phase,
    piecesInHand,
    winner,
    isDraw: false,
    moveHistory: [...snapshot.moveHistory, moveRecord]
  };

  if (!winner && phase === "movement" && !hasAnyLegalMove(nextSnapshot, nextPlayer)) {
    return {
      ...nextSnapshot,
      phase: "finished",
      isDraw: true
    };
  }

  return nextSnapshot;
};

export const serializeSnapshot = (snapshot: GameSnapshot): string => {
  const board = snapshot.board.map((cell) => cell ?? "_").join("");
  return [
    board,
    snapshot.currentPlayer,
    snapshot.phase,
    snapshot.piecesInHand.X,
    snapshot.piecesInHand.O
  ].join("|");
};
