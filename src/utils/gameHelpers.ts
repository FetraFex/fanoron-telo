import { WIN_LINES } from "../models/board";
import type { CellValue, Player } from "../types/game";

export const opponentOf = (player: Player): Player => (player === "X" ? "O" : "X");

export const cloneBoard = (board: CellValue[]): CellValue[] => [...board];

export const lineScore = (line: readonly number[], board: CellValue[], player: Player): number => {
  const values = line.map((index) => board[index]);
  const own = values.filter((cell) => cell === player).length;
  const opp = values.filter((cell) => cell && cell !== player).length;

  if (own > 0 && opp > 0) return 0;
  if (own === 0 && opp === 0) return 1;
  if (own > 0) return own * own * 4;
  return -(opp * opp * 5);
};

export const checkWinner = (board: CellValue[]): Player | null => {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};
