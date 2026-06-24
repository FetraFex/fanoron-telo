import { PlayerCard } from "./PlayerCard";
import type { GameSnapshot, PlayerConfig } from "../../types/game";
import type { GameMode } from "../../types/game";

interface LeftSidebarProps {
  snapshot: GameSnapshot;
  players: Record<"X" | "O", PlayerConfig>;
  mode: GameMode;
}

export const LeftSidebar = ({ snapshot, players, mode }: LeftSidebarProps) => {
  const { currentPlayer } = snapshot;

  return (
    <div className="flex flex-1 flex-col">
      <PlayerCard
        player="X"
        label={players.X.type === "ai" ? `IA (${players.X.difficulty})` : "Joueur"}
        isActive={currentPlayer === "X"}
      />

      <div className="flex items-center justify-center py-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#264F2A] text-xs font-bold text-white shadow-md">
          VS
        </span>
      </div>

      <PlayerCard
        player="O"
        label={players.O.type === "ai" ? `IA (${players.O.difficulty})` : "Joueur"}
        isActive={currentPlayer === "O"}
      />

      <div className="mt-auto rounded-2xl bg-[#264F2A] p-5 text-center shadow-md">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#8CC63E]/80">Mode</h4>
        <p className="mt-2 text-lg font-bold text-white">
          {mode === "PVP" ? "Joueur contre Joueur" : mode === "PVAI" ? "Joueur contre IA" : "IA contre IA"}
        </p>
      </div>
    </div>
  );
};
