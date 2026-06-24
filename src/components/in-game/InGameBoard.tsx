interface InGameBoardProps {
  board: CellValue[];
  selectedCell: number | null;
  legalTargets: number[];
  onCellClick: (index: number) => void;
}

const POSITIONS = [
  { idx: 0, left: "16.67%", top: "16.67%" },
  { idx: 1, left: "50%", top: "16.67%" },
  { idx: 2, left: "83.33%", top: "16.67%" },
  { idx: 3, left: "16.67%", top: "50%" },
  { idx: 4, left: "50%", top: "50%" },
  { idx: 5, left: "83.33%", top: "50%" },
  { idx: 6, left: "16.67%", top: "83.33%" },
  { idx: 7, left: "50%", top: "83.33%" },
  { idx: 8, left: "83.33%", top: "83.33%" }
];

const pieceClass = (value: CellValue, selected: boolean, isTarget: boolean): string => {
  if (value === "X") {
    return selected
      ? "bg-[#2E2E2E] shadow-[0_0_0_3px_#8CC63E,0_0_16px_rgba(140,198,62,0.4)]"
      : "bg-[#2E2E2E] shadow-[0_2px_8px_rgba(0,0,0,0.3)]";
  }
  if (value === "O") {
    return selected
      ? "bg-[#F5EFE0] border-2 border-[#B37A4C] shadow-[0_0_0_3px_#8CC63E,0_0_16px_rgba(140,198,62,0.4)]"
      : "bg-[#F5EFE0] border-2 border-[#B37A4C] shadow-[0_2px_8px_rgba(0,0,0,0.15)]";
  }
  return "bg-transparent";
};

import type { CellValue } from "../../types/game";

export const InGameBoard = ({ board, selectedCell, legalTargets, onCellClick }: InGameBoardProps) => {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[55vh]">
      <div className="absolute inset-0 drop-shadow-lg">
        <img
          src="/assets/ui/ui-board.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-contain"
        />
      </div>

      <div className="pointer-events-none absolute inset-0" style={{ transform: "translateY(-2%)" }}>
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <line x1="16.67" y1="16.67" x2="83.33" y2="16.67" stroke="#1a1a1a" strokeWidth="1.2" opacity="0.7" />
          <line x1="16.67" y1="50" x2="83.33" y2="50" stroke="#1a1a1a" strokeWidth="1.2" opacity="0.7" />
          <line x1="16.67" y1="83.33" x2="83.33" y2="83.33" stroke="#1a1a1a" strokeWidth="1.2" opacity="0.7" />
          <line x1="16.67" y1="16.67" x2="16.67" y2="83.33" stroke="#1a1a1a" strokeWidth="1.2" opacity="0.7" />
          <line x1="50" y1="16.67" x2="50" y2="83.33" stroke="#1a1a1a" strokeWidth="1.2" opacity="0.7" />
          <line x1="83.33" y1="16.67" x2="83.33" y2="83.33" stroke="#1a1a1a" strokeWidth="1.2" opacity="0.7" />
          <line x1="16.67" y1="16.67" x2="83.33" y2="83.33" stroke="#1a1a1a" strokeWidth="1.2" opacity="0.7" />
          <line x1="83.33" y1="16.67" x2="16.67" y2="83.33" stroke="#1a1a1a" strokeWidth="1.2" opacity="0.7" />
        </svg>

        <div className="absolute inset-0 pointer-events-auto">
          {POSITIONS.map(({ idx, left, top }) => {
            const selected = selectedCell === idx;
            const isTarget = legalTargets.includes(idx);
            return (
              <button
                key={idx}
                type="button"
                aria-label={`Intersection ${idx + 1}`}
                onClick={() => onCellClick(idx)}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left, top }}
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 sm:h-14 sm:w-14 ${pieceClass(board[idx], selected, isTarget)} ${isTarget ? "scale-110 ring-2 ring-[#8CC63E]/60" : ""}`}
                >
                  {isTarget && board[idx] === null && (
                    <span className="h-4 w-4 rounded-full bg-[#8CC63E]/40" />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
