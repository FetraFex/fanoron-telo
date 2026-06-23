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

const tokenClass = (value: CellValue): string => {
  if (value === "X") return "bg-indigo-500 border-indigo-300";
  if (value === "O") return "bg-rose-500 border-rose-300";
  return "bg-transparent border-slate-300/60 dark:border-slate-700";
};

export const Board = ({ board, selectedCell, legalTargets, onCellClick }: BoardProps) => (
  <div className="relative mx-auto aspect-square w-full max-w-[420px] rounded-3xl border border-slate-200 bg-board-light p-8 shadow-xl dark:border-slate-800 dark:bg-board-dark">
    {/* Conteneur des lignes de repère */}
    <div className="pointer-events-none absolute inset-8 border-2 border-slate-300 dark:border-slate-600">
      {/* Ligne Horizontale Médiane */}
      <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-slate-300 dark:bg-slate-600" />
      
      {/* Ligne Verticale Médiane */}
      <div className="absolute bottom-0 top-0 left-1/2 w-[2px] -translate-x-1/2 bg-slate-300 dark:bg-slate-600" />
      
      {/* Diagonale 1 (Haut-Gauche vers Bas-Droite) */}
      <div className="absolute top-1/2 left-1/2 h-[2px] w-[141.4%] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-slate-300 dark:bg-slate-600" />
      
      {/* Diagonale 2 (Bas-Gauche vers Haut-Droite) */}
      <div className="absolute top-1/2 left-1/2 h-[2px] w-[141.4%] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-slate-300 dark:bg-slate-600" />
    </div>

    {/* Grille des boutons de jeu */}
    <div className="relative grid h-full w-full grid-cols-3 grid-rows-3">
      {boardLayout.map(({ idx, row, col }) => {
        const selected = selectedCell === idx;
        const isTarget = legalTargets.includes(idx);
        return (
          <button
            key={idx}
            type="button"
            aria-label={`Intersection ${idx + 1}`}
            onClick={() => onCellClick(idx)}
            className={`relative flex items-center justify-center transition-all duration-200 [grid-row:${row}] [grid-column:${col}] ${
              isTarget ? "scale-105" : ""
            }`}
          >
            <span
              className={`size-14 rounded-full border-4 shadow-md transition-all duration-200 sm:size-16 ${tokenClass(
                board[idx]
              )} ${selected ? "ring-4 ring-accent shadow-glow" : ""} ${isTarget ? "ring-4 ring-emerald-400" : ""}`}
            />
          </button>
        );
      })}
    </div>
  </div>
);