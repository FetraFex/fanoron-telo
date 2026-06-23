import type { Move } from "../types/game";

interface MoveHistoryProps {
  moves: Move[];
}

const formatMove = (move: Move): string => {
  if (move.kind === "place") return `pose en ${move.to + 1}`;
  return `${move.from! + 1} → ${move.to + 1}`;
};

export const MoveHistory = ({ moves }: MoveHistoryProps) => (
  <section className="flex min-h-0 flex-1 flex-col rounded-2xl border border-panel-border bg-panel-soft/80 p-4 shadow-card">
    <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">Historique des coups</h3>
    <ol className="mt-3 min-h-0 flex-1 space-y-1.5 overflow-auto pr-1 text-sm">
      {moves.length === 0 ? (
        <li className="text-slate-400">Aucun coup pour le moment.</li>
      ) : (
        moves.map((move) => (
          <li key={move.turn} className="flex items-center gap-2 rounded-lg bg-panel px-3 py-1.5 text-slate-700">
            <span
              className={`flex size-5 items-center justify-center rounded-full text-[10px] font-bold text-white ${
                move.player === "X" ? "bg-playerX" : "bg-playerO"
              }`}
            >
              {move.player}
            </span>
            <span className="text-slate-400">#{move.turn}</span>
            {formatMove(move)}
          </li>
        ))
      )}
    </ol>
  </section>
);
