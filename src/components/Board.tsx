import type { CellValue } from "../types/game";

interface BoardProps {
  board: CellValue[];
  selectedCell: number | null;
  legalTargets: number[];
  onCellClick: (index: number) => void;
  theme: "light" | "dark";                      // 👈 added
  winningLine?: number[];                      // 👈 added (indices of winning cells)
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
  { idx: 8, row: 3, col: 3 },
];

const tokenClass = (value: CellValue): string => {
  if (value === "X") return "bg-indigo-500 border-indigo-300";
  if (value === "O") return "bg-rose-500 border-rose-300";
  return "bg-transparent border-slate-300/60 dark:border-slate-700";
};

export const Board = ({
  board,
  selectedCell,
  legalTargets,
  onCellClick,
  theme,
  winningLine = [],
}: BoardProps) => {
  const isDark = theme === "dark";

  // Check if a cell is part of the winning line
  const isWinning = (idx: number) => winningLine.includes(idx);

  // Render the winning line as an SVG (connecting centers of first and last winning cells)
  const renderWinningLine = () => {
    if (winningLine.length < 2) return null;

    // Compute percentage positions (0–100%) within the board area
    const getPosition = (idx: number) => {
      const cell = boardLayout.find((b) => b.idx === idx)!;
      const x = ((cell.col - 1 + 0.5) / 3) * 100;
      const y = ((cell.row - 1 + 0.5) / 3) * 100;
      return { x, y };
    };

    const first = getPosition(winningLine[0]);
    const last = getPosition(winningLine[winningLine.length - 1]);

    return (
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <line
          x1={first.x}
          y1={first.y}
          x2={last.x}
          y2={last.y}
          stroke={isDark ? "#facc15" : "#eab308"}
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    );
  };

  return (
    <div
      className={`relative mx-auto aspect-square w-full max-w-[420px] rounded-2xl border-4 ${
        isDark
          ? "border-[#3d2b1f] shadow-2xl shadow-black/40"
          : "border-[#8b6b4d] shadow-2xl shadow-black/20"
      } overflow-hidden bg-[#4a3a2b] p-1`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-xl">
        {/* Grid lines – 2 horizontal, 2 vertical */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 right-0 top-1/3 h-[2px] bg-[#4a3a2b] dark:bg-[#2a241e]" />
          <div className="absolute left-0 right-0 top-2/3 h-[2px] bg-[#4a3a2b] dark:bg-[#2a241e]" />
          <div className="absolute bottom-0 left-1/3 top-0 w-[2px] bg-[#4a3a2b] dark:bg-[#2a241e]" />
          <div className="absolute bottom-0 left-2/3 top-0 w-[2px] bg-[#4a3a2b] dark:bg-[#2a241e]" />
        </div>

        {/* Cells */}
        <div className="relative grid h-full w-full grid-cols-3 grid-rows-3">
          {boardLayout.map(({ idx, row, col }) => {
            const selected = selectedCell === idx;
            const isTarget = legalTargets.includes(idx);
            const winning = isWinning(idx);
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
                    board[idx],
                  )} ${selected ? "ring-4 ring-blue-400 shadow-glow" : ""} ${
                    isTarget ? "ring-4 ring-emerald-400" : ""
                  } ${winning ? "ring-4 ring-yellow-400" : ""}`}
                />
              </button>
            );
          })}
        </div>

        {/* Winning line overlay */}
        {renderWinningLine()}
      </div>
    </div>
  );
};