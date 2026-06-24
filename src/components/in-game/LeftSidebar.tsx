import { PlayerCard } from "./PlayerCard";
import type { GameSnapshot, PlayerConfig } from "../../types/game";

interface LeftSidebarProps {
  snapshot: GameSnapshot;
  players: Record<"X" | "O", PlayerConfig>;
  onBackHome: () => void;
}

export const LeftSidebar = ({ snapshot, players, onBackHome }: LeftSidebarProps) => {
  const { currentPlayer, piecesInHand } = snapshot;

  return (
    <div className="flex w-[260px] shrink-0 flex-col gap-4">
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

      <div className="mt-2 rounded-2xl bg-[#264F2A] p-5 shadow-md">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#8CC63E]/80">Objectif</h4>
        <p className="mt-2 text-sm leading-relaxed text-white/85">
          Capturer tous les pions adverses ou bloquer tous les mouvements légaux.
        </p>
      </div>

      <div className="mt-auto flex flex-col gap-2 pt-4">
        <button
          type="button"
          onClick={onBackHome}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#F8F3EC] px-4 py-3 text-sm font-semibold text-[#676767] shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Quitter
        </button>
      </div>
    </div>
  );
};
