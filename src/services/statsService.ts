import type { GameSnapshot } from "../types/game";

export interface GameStats {
  played: number;
  xWins: number;
  oWins: number;
  draws: number;
}

const KEY = "fanoron-stats-v1";

const emptyStats: GameStats = {
  played: 0,
  xWins: 0,
  oWins: 0,
  draws: 0
};

export const readStats = (): GameStats => {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? "");
    if (typeof parsed?.played !== "number") return emptyStats;
    return parsed as GameStats;
  } catch {
    return emptyStats;
  }
};

export const writeStats = (stats: GameStats): void => {
  localStorage.setItem(KEY, JSON.stringify(stats));
};

export const registerFinishedGame = (snapshot: GameSnapshot): GameStats => {
  const current = readStats();
  const next: GameStats = {
    played: current.played + 1,
    xWins: current.xWins,
    oWins: current.oWins,
    draws: current.draws
  };

  if (snapshot.winner === "X") next.xWins += 1;
  else if (snapshot.winner === "O") next.oWins += 1;
  else next.draws += 1;

  writeStats(next);
  return next;
};
