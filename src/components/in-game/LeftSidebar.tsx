import { PlayerCard } from "./PlayerCard";
import type { GameSnapshot, PlayerConfig } from "../../types/game";
import type { GameMode } from "../../types/game";

interface LeftSidebarProps {
  snapshot: GameSnapshot;
  players: Record<"X" | "O", PlayerConfig>;
  mode: GameMode;
}

export const LeftSidebar = ({ snapshot, players, mode }: LeftSidebarProps) => {
  const { currentPlayer, piecesInHand } = snapshot;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <PlayerCard
        player="X"
        label={players.X.type === "ai" ? `IA X (${players.X.difficulty})` : "Joueur X"}
        type={players.X.type}
        isActive={currentPlayer === "X"}
        piecesInHand={piecesInHand.X}
      />

      <div className="flex items-center justify-center py-1">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#264F2A] text-xs font-bold text-white shadow-md">
          VS
        </span>
      </div>

      <PlayerCard
        player="O"
        label={players.O.type === "ai" ? `IA O (${players.O.difficulty})` : "Joueur O"}
        type={players.O.type}
        isActive={currentPlayer === "O"}
        piecesInHand={piecesInHand.O}
      />

      <div className="mt-2 rounded-2xl bg-[#264F2A] p-5 text-center shadow-md">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#8CC63E]/80">Mode</h4>
        <p className="mt-2 text-lg font-bold text-white">
          {mode === "PVP" ? "Joueur contre Joueur" : mode === "PVAI" ? "Joueur contre IA" : "IA contre IA"}
        </p>
      </div>

    </div>
  );
};
