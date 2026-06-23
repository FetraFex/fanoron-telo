import type { Move } from "../types/game";

interface MoveHistoryProps {
  moves: Move[];
}

const formatMove = (move: Move): string => {
  if (move.kind === "place") return `${move.player} pose en ${move.to + 1}`;
  return `${move.player} ${move.from! + 1} -> ${move.to + 1}`;
};

export const MoveHistory = ({ moves }: MoveHistoryProps) => (
  <section className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
    <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700 dark:text-slate-200">Historique des coups</h3>
    <ol className="mt-3 max-h-60 space-y-1 overflow-auto pr-2 text-sm">
      {moves.length === 0 ? (
        <li className="text-slate-500 dark:text-slate-400">Aucun coup pour le moment.</li>
      ) : (
        moves.map((move) => (
          <li key={move.turn} className="rounded-lg bg-slate-100 px-3 py-1.5 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            #{move.turn} - {formatMove(move)}
          </li>
        ))
      )}
    </ol>
  </section>
);
