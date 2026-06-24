import type { Move } from "../../types/game";

interface MoveHistoryBarProps {
  moves: Move[];
}

const formatMove = (move: Move): string => {
  if (move.kind === "place") return `${move.player} pose en ${move.to + 1}`;
  return `${move.player} ${move.from! + 1}→${move.to + 1}`;
};

export const MoveHistoryBar = ({ moves }: MoveHistoryBarProps) => {
  return (
    <div className="mx-auto w-full rounded-2xl bg-[#2D2A24]/90 px-4 py-3 shadow-lg backdrop-blur-sm lg:max-w-[65%] lg:px-6 lg:py-4">
      <h4 className="mb-2 text-center text-[10px] font-bold uppercase tracking-[2px] text-[#8CC63E]/60">
        Historique des coups
      </h4>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {moves.length === 0 ? (
          <p className="w-full text-center text-sm text-white/40">Aucun coup pour le moment.</p>
        ) : (
          moves.map((move) => (
            <span
              key={move.turn}
              className="shrink-0 rounded-lg bg-white/10 px-3 py-1.5 text-xs text-white/70"
            >
              #{move.turn} {formatMove(move)}
            </span>
          ))
        )}
      </div>
    </div>
  );
};
