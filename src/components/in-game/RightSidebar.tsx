import { motion } from "framer-motion";
import type { GameSnapshot } from "../../types/game";
import type { GameStats } from "../../services/statsService";

interface RightSidebarProps {
  snapshot: GameSnapshot;
  selectedCell: number | null;
  moveCount: number;
  onUndo: () => void;
  canUndo: boolean;
  stats: GameStats;
}

export const RightSidebar = ({ snapshot, selectedCell, moveCount, onUndo, canUndo, stats }: RightSidebarProps) => {
  const { phase, currentPlayer, winner, isDraw } = snapshot;

  let statusText = `Tour du joueur ${currentPlayer === "X" ? "X" : "O"}`;
  if (phase === "placement") statusText += " (Placement)";
  if (phase === "movement") statusText += " (Mouvement)";
  if (winner) statusText = `${winner === "X" ? "X" : "O"} a gagné !`;
  if (isDraw) statusText = "Match nul";

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="rounded-2xl bg-[#264F2A] p-5 text-center shadow-md">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#8CC63E]/80">
          {winner || isDraw ? "Partie terminée" : phase === "placement" ? "Placement" : "Tour"}
        </h4>
        <p className="mt-2 text-lg font-bold text-white">{statusText}</p>
        {!winner && !isDraw && (
          <p className="mt-1 text-xs text-white/60">
            {selectedCell !== null
              ? "Sélectionnez une destination"
              : phase === "placement"
                ? "Placez un pion sur une intersection vide"
                : "Sélectionnez un pion"}
          </p>
        )}
      </div>

      <div className="rounded-2xl bg-[#F8F3EC] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#676767]">Coups</h4>
        <div className="space-y-1">
          <div className="flex items-center justify-between rounded-lg bg-white/60 px-3 py-2 text-sm">
            <span className="text-[#676767]">Total</span>
            <span className="font-bold text-[#2E2E2E]">{moveCount}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-white/60 px-3 py-2 text-sm">
            <span className="text-[#676767]">Phase</span>
            <span className="font-semibold text-[#264F2A]">
              {phase === "placement" ? "Placement" : phase === "movement" ? "Mouvement" : "Terminé"}
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-[#F8F3EC] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#676767]">Statistiques</h4>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-white/60 px-3 py-2 text-center text-sm">
            <span className="block text-[10px] uppercase tracking-wide text-[#676767]/70">Parties</span>
            <span className="text-lg font-bold text-[#2E2E2E]">{stats.played}</span>
          </div>
          <div className="rounded-lg bg-white/60 px-3 py-2 text-center text-sm">
            <span className="block text-[10px] uppercase tracking-wide text-[#676767]/70">X gagne</span>
            <span className="text-lg font-bold text-[#2E2E2E]">{stats.xWins}</span>
          </div>
          <div className="rounded-lg bg-white/60 px-3 py-2 text-center text-sm">
            <span className="block text-[10px] uppercase tracking-wide text-[#676767]/70">O gagne</span>
            <span className="text-lg font-bold text-[#2E2E2E]">{stats.oWins}</span>
          </div>
          <div className="rounded-lg bg-white/60 px-3 py-2 text-center text-sm">
            <span className="block text-[10px] uppercase tracking-wide text-[#676767]/70">Nuls</span>
            <span className="text-lg font-bold text-[#2E2E2E]">{stats.draws}</span>
          </div>
        </div>
      </div>

        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-[#F8F3EC] px-4 py-3 text-sm font-semibold text-[#676767] shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
          Annuler le coup
        </button>
    </div>
  );
};
