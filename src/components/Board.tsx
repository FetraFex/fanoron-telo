import type { CellValue } from "../types/game";

interface BoardProps {
  board: CellValue[];
  selectedCell: number | null;
  legalTargets: number[];
  onCellClick: (index: number) => void;
}

const boardLayout = [
  { idx: 0, row: 0, col: 0 },
  { idx: 1, row: 0, col: 1 },
  { idx: 2, row: 0, col: 2 },
  { idx: 3, row: 1, col: 0 },
  { idx: 4, row: 1, col: 1 },
  { idx: 5, row: 1, col: 2 },
  { idx: 6, row: 2, col: 0 },
  { idx: 7, row: 2, col: 1 },
  { idx: 8, row: 2, col: 2 }
];

const point = (row: number, col: number) => ({
  x: 12 + col * 38,
  y: 12 + row * 38
});

const lines: Array<[number, number]> = [
  [0, 1], [1, 2], [3, 4], [4, 5], [6, 7], [7, 8],
  [0, 3], [3, 6], [1, 4], [4, 7], [2, 5], [5, 8],
  [0, 4], [4, 8], [2, 4], [4, 6]
];

const tokenStyle = (value: CellValue) => {
  if (value === "X") return "bg-playerX border-playerX-soft";
  if (value === "O") return "bg-playerO border-playerO-soft";
  return "bg-transparent border-transparent";
};

export const Board = ({ board, selectedCell, legalTargets, onCellClick }: BoardProps) => (
  <div className="relative mx-auto aspect-square w-full max-w-[360px] rounded-3xl border border-wood-shadow bg-wood-grain p-6 shadow-card">
    <svg
      viewBox="0 0 100 100"
      className="pointer-events-none absolute inset-6 h-[calc(100%-3rem)] w-[calc(100%-3rem)]"
    >
      {lines.map(([a, b], i) => {
        const layoutA = boardLayout[a];
        const layoutB = boardLayout[b];
        const p1 = point(layoutA.row, layoutA.col);
        const p2 = point(layoutB.row, layoutB.col);
        const involvesSelected = selectedCell === a || selectedCell === b;
        const involvesTarget = legalTargets.includes(a) || legalTargets.includes(b);
        return (
          <line
            key={i}
            x1={p1.x}
            y1={p1.y}
            x2={p2.x}
            y2={p2.y}
            stroke={involvesSelected && involvesTarget ? "#fbbf24" : "#3a2410"}
            strokeOpacity={involvesSelected && involvesTarget ? 0.9 : 0.55}
            strokeWidth={involvesSelected && involvesTarget ? 1.6 : 1.1}
          />
        );
      })}
    </svg>

    <div className="relative grid h-full w-full grid-cols-3 grid-rows-3">
      {boardLayout.map(({ idx, row, col }) => {
        const selected = selectedCell === idx;
        const isTarget = legalTargets.includes(idx);
        const value = board[idx];
        const ringShadow = selected
          ? value === "O"
            ? "shadow-glowPurple"
            : "shadow-glowBlue"
          : isTarget
            ? "shadow-glowGreen"
            : "";
        return (
          <button
            key={idx}
            type="button"
            aria-label={`Intersection ${idx + 1}`}
            onClick={() => onCellClick(idx)}
            style={{ gridRow: row + 1, gridColumn: col + 1 }}
            className={`relative flex items-center justify-center transition-transform duration-200 ${
              isTarget ? "scale-105" : ""
            }`}
          >
            {value ? (
              <span
                className={`flex size-12 items-center justify-center rounded-full border-[3px] text-sm font-bold text-white sm:size-14 ${tokenStyle(
                  value
                )} ${ringShadow}`}
              >
                {value}
              </span>
            ) : (
              <span
                className={`size-5 rounded-full border-2 border-amber-400/80 bg-amber-100/40 transition-all sm:size-6 ${
                  isTarget ? `${ringShadow} scale-125` : ""
                }`}
              />
            )}
          </button>
        );
      })}
    </div>
  </div>
);
