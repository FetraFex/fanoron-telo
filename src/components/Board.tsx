import type { CellValue } from "../types/game";
import boardImage from "../assets/woodboard.png";

interface BoardProps {
  board: CellValue[];
  selectedCell: number | null;
  legalTargets: number[];
  onCellClick: (index: number) => void;
}

// Coordonnées absolues en % (ajustées sur-mesure pour ton image de plateau)
// 8% correspond aux lignes extérieures, 50% au centre exact
const boardLayout = [
  { idx: 0, top: "8%",  left: "8%" },   // Top-Left
  { idx: 1, top: "8%",  left: "50%" },     // Top-Middle
  { idx: 2, top: "8%",  left: "92%" },   // Top-Right
  { idx: 3, top: "50%",   left: "8%" },   // Middle-Left
  { idx: 4, top: "50%",   left: "50%" },     // Center
  { idx: 5, top: "50%",   left: "92%" },   // Middle-Right
  { idx: 6, top: "92%", left: "8%" },   // Bottom-Left
  { idx: 7, top: "92%", left: "50%" },     // Bottom-Middle
  { idx: 8, top: "92%", left: "92%" }    // Bottom-Right
];

const tokenClass = (value: CellValue): string => {
  if (value === "X") {
    return "scale-100 opacity-100 " +
           "bg-gradient-to-br from-teal-300 via-teal-500 to-teal-800 " +
           "border-teal-300/40 shadow-[0_8px_16px_rgba(0,0,0,0.6),inset_0_4px_6px_rgba(255,255,255,0.4)]";
  }
  if (value === "O") {
    return "scale-100 opacity-100 " +
           "bg-gradient-to-br from-amber-300 via-amber-600 to-amber-900 " +
           "border-amber-400/40 shadow-[0_8px_16px_rgba(0,0,0,0.6),inset_0_4px_6px_rgba(255,255,255,0.4)]";
  }
  return "bg-transparent border-transparent scale-0 opacity-0 pointer-events-none";
};

export const Board = ({ board, selectedCell, legalTargets, onCellClick }: BoardProps) => (
  <div 
    className="relative mx-auto aspect-square w-full max-w-[420px] rounded-[32px] bg-cover bg-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden select-none"
    style={{ backgroundImage: `url(${boardImage})` }}
  >
    
    {/* Conteneur absolu global qui englobe toute la surface active */}
    <div className="absolute inset-0 z-10">
      {boardLayout.map(({ idx, top, left }) => {
        const selected = selectedCell === idx;
        const isTarget = legalTargets.includes(idx);
        const hasToken = board[idx] !== null;

        return (
          <button
            key={idx}
            type="button"
            aria-label={`Intersection ${idx + 1}`}
            onClick={() => onCellClick(idx)}
            // -translate-x-1/2 -translate-y-1/2 permet de centrer parfaitement le bouton sur son repère top/left
            className="absolute size-14 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-all duration-200 group"
            style={{ top, left }}
          >
            {/* Indicateur de cible (Halo vert discret) */}
            {!hasToken && isTarget && (
              <div className="absolute size-5 rounded-full bg-emerald-400/40 ring-4 ring-emerald-400/20 scale-110 animate-pulse shadow-[0_0_15px_#34d399]" />
            )}

            {/* Le Pion */}
            <span
              className={`size-12 rounded-full border-t border-l transition-all duration-300 sm:size-14 relative ${tokenClass(
                board[idx]
              )} ${selected ? "ring-4 ring-emerald-400 scale-105 shadow-[0_0_25px_rgba(52,211,153,0.6)]" : ""}`}
            >
              {/* Petit reflet de lumière 3D interne au pion */}
              {hasToken && (
                <span className="absolute top-1 left-2 w-3 h-1.5 bg-white/40 rounded-full blur-[0.5px] -rotate-12" />
              )}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);