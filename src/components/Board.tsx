import type { CellValue } from "../types/game";

interface BoardProps {
  board: CellValue[];
  selectedCell: number | null;
  legalTargets: number[];
  onCellClick: (index: number) => void;
}

const boardLayout = [
  { idx: 0, row: 1, col: 1 },
  { idx: 1, row: 1, col: 2 },
  { idx: 2, row: 1, col: 3 },
  { idx: 3, row: 2, col: 1 },
  { idx: 4, row: 2, col: 2 },
  { idx: 5, row: 2, col: 3 },
  { idx: 6, row: 3, col: 1 },
  { idx: 7, row: 3, col: 2 },
  { idx: 8, row: 3, col: 3 }
];

export const Board = ({ board, selectedCell, legalTargets, onCellClick }: BoardProps) => {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[400px] rounded-2xl border-4 border-amber-900 bg-gradient-to-br from-amber-600 to-amber-800 p-4 shadow-2xl dark:border-stone-900 dark:from-stone-700 dark:to-stone-900">
      
      {/* LIGNES PYROGRAVÉES / CREUSÉES EN SVG */}
      <svg 
        className="pointer-events-none absolute inset-0 h-full w-full stroke-amber-950/80 drop-shadow-sm dark:stroke-stone-950/90" 
        strokeWidth="5" 
        strokeLinecap="round"
      >
        {/* Lignes horizontales */}
        <line x1="16.66%" y1="16.66%" x2="83.33%" y2="16.66%" />
        <line x1="16.66%" y1="50%"     x2="83.33%" y2="50%" />
        <line x1="16.66%" y1="83.33%" x2="83.33%" y2="83.33%" />
        
        {/* Lignes verticales */}
        <line x1="16.66%" y1="16.66%" x2="16.66%" y2="83.33%" />
        <line x1="50%"     y1="16.66%" x2="50%"     y2="83.33%" />
        <line x1="83.33%" y1="16.66%" x2="83.33%" y2="83.33%" />
        
        {/* Diagonales */}
        <line x1="16.66%" y1="16.66%" x2="83.33%" y2="83.33%" />
        <line x1="83.33%" y1="16.66%" x2="16.66%" y2="83.33%" />
      </svg>

      {/* INTERSECTIONS ET GALETS */}
      <div className="relative grid h-full w-full grid-cols-3 grid-rows-3">
        {boardLayout.map(({ idx, row, col }) => {
          const value = board[idx];
          const isSelected = selectedCell === idx;
          const isTarget = legalTargets.includes(idx);

          return (
            <button
              key={idx}
              type="button"
              aria-label={`Intersection ${idx + 1}`}
              onClick={() => onCellClick(idx)}
              className={`relative flex items-center justify-center transition-transform active:scale-90 [grid-row:${row}] [grid-column:${col}]`}
            >
              {/* GALET BLANC (Joueur X) */}
              {value === "X" && (
                <span className={`size-12 sm:size-14 rounded-full bg-gradient-to-b from-stone-100 to-stone-300 border border-stone-400 shadow-[inset_0_-4px_4px_rgba(0,0,0,0.15),0_6px_8px_rgba(0,0,0,0.5)] transition-all ${
                  isSelected ? "ring-4 ring-offset-2 ring-offset-amber-700 ring-stone-200 scale-110 -translate-y-1 dark:ring-offset-stone-800" : ""
                }`} />
              )}

              {/* GALET NOIR (Joueur O) */}
              {value === "O" && (
                <span className={`size-12 sm:size-14 rounded-full bg-gradient-to-b from-stone-700 to-stone-900 border border-stone-950 shadow-[inset_0_-4px_4px_rgba(0,0,0,0.4),0_6px_8px_rgba(0,0,0,0.6)] transition-all ${
                  isSelected ? "ring-4 ring-offset-2 ring-offset-amber-700 ring-stone-500 scale-110 -translate-y-1 dark:ring-offset-stone-800" : ""
                }`} />
              )}

              {/* CIBLE DE DÉPLACEMENT LÉGAL (Halo lumineux naturel) */}
              {!value && isTarget && (
                <span className="size-10 rounded-full bg-white/30 animate-pulse border-2 border-dashed border-white/60 shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
              )}

              {/* ENCOCHE VIDE (Creux dans le plateau) */}
              {!value && !isTarget && (
                <span className="size-4 rounded-full bg-amber-950/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] dark:bg-black/60" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};