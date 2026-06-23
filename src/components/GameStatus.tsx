import type { GameSnapshot, PlayerConfig } from "../types/game";

interface GameStatusProps {
  snapshot: GameSnapshot;
  players: Record<"X" | "O", PlayerConfig>;
}

const playerBadge = (player: "X" | "O") =>
  player === "X"
    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200"
    : "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-200";

export const GameStatus = ({ snapshot, players }: GameStatusProps) => {
  const { winner, currentPlayer, phase, isDraw, piecesInHand } = snapshot;

  let statusText = `Tour du joueur ${currentPlayer}`;
  if (phase === "placement") statusText += " (Phase de placement)";
  if (phase === "movement") statusText += " (Phase de mouvement)";
  if (winner) statusText = `Victoire du joueur ${winner} !`;
  if (isDraw) statusText = "Match nul (aucun mouvement légal)";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
      <p className="text-base font-semibold text-slate-800 dark:text-slate-100">{statusText}</p>
      <div className="mt-3 flex flex-wrap gap-2 text-sm">
        {(["X", "O"] as const).map((player) => (
          <span key={player} className={`rounded-full px-3 py-1 font-medium ${playerBadge(player)}`}>
            {player} - {players[player].type === "ai" ? `IA (${players[player].difficulty})` : "Humain"} - Pions a poser:{" "}
            {piecesInHand[player]}
          </span>
        ))}
      </div>
    </section>
  );
};
