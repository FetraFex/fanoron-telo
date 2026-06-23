import type { GameSnapshot, PlayerConfig } from "../types/game";

interface GameStatusProps {
  snapshot: GameSnapshot;
  players: Record<"X" | "O", PlayerConfig>;
}

const playerLook: Record<"X" | "O", { ring: string }> = {
  X: { ring: "border-playerX shadow-glowBlue" },
  O: { ring: "border-playerO shadow-glowPurple" }
};

const playerLabel = (config: PlayerConfig) =>
  config.type === "ai" ? `IA (${config.difficulty === "easy" ? "Facile" : config.difficulty === "hard" ? "Difficile" : "Moyen"})` : "Vous";

export const GameStatus = ({ snapshot, players }: GameStatusProps) => {
  const { winner, currentPlayer, phase, isDraw, piecesInHand } = snapshot;

  let phaseLabel = phase === "placement" ? "Phase de placement" : "Phase de mouvement";
  if (winner) phaseLabel = `Victoire du joueur ${winner} !`;
  if (isDraw) phaseLabel = "Match nul";

  return (
    <section className="flex items-center justify-between gap-3 rounded-2xl border border-panel-border bg-panel-soft/80 px-4 py-3 shadow-card">
      {(["X", "O"] as const).map((player, i) => (
        <div key={player} className="flex items-center gap-2.5">
          {i === 1 && (
            <span className="mx-1 rounded-xl border border-panel-border bg-panel px-2.5 py-1.5 text-xs font-bold text-slate-500">
              VS
            </span>
          )}
          <div className={`flex size-9 items-center justify-center rounded-full border-2 bg-panel font-bold text-white ${playerLook[player].ring}`}>
            {player}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">{playerLabel(players[player])}</p>
            <p className={`text-xs ${currentPlayer === player && !winner && !isDraw ? "text-good" : "text-slate-500"}`}>
              {currentPlayer === player && !winner && !isDraw ? "Votre tour" : `Pions: ${piecesInHand[player]}`}
            </p>
          </div>
        </div>
      ))}
      <span className="ml-auto rounded-full bg-panel-soft px-3 py-1 text-xs font-semibold text-slate-600">{phaseLabel}</span>
    </section>
  );
};
