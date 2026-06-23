export type Player = "X" | "O";
export type CellValue = Player | null;
export type Phase = "placement" | "movement" | "finished";
export type GameMode = "PVP" | "PVAI" | "AIVSAI";
export type Difficulty = "easy" | "medium" | "hard";

export interface PlayerConfig {
  type: "human" | "ai";
  difficulty?: Difficulty;
}

export interface Move {
  kind: "place" | "move";
  player: Player;
  from: number | null;
  to: number;
  turn: number;
}

export interface GameSnapshot {
  board: CellValue[];
  currentPlayer: Player;
  phase: Phase;
  piecesInHand: Record<Player, number>;
  winner: Player | null;
  isDraw: boolean;
  moveHistory: Move[];
}

export interface GameOptions {
  mode: GameMode;
  players: Record<Player, PlayerConfig>;
  aiVsAiDelayMs: number;
}

export interface LegalMove {
  from: number | null;
  to: number;
}
