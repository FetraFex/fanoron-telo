import { motion } from "framer-motion";
import type { CellValue } from "../../types/game";

interface InGameBoardProps {
  board: CellValue[];
  selectedCell: number | null;
  legalTargets: number[];
  onCellClick: (index: number) => void;
}

const POSITIONS = [
  { idx: 0, x: 16.67, y: 16.67 },
  { idx: 1, x: 50, y: 16.67 },
  { idx: 2, x: 83.33, y: 16.67 },
  { idx: 3, x: 16.67, y: 50 },
  { idx: 4, x: 50, y: 50 },
  { idx: 5, x: 83.33, y: 50 },
  { idx: 6, x: 16.67, y: 83.33 },
  { idx: 7, x: 50, y: 83.33 },
  { idx: 8, x: 83.33, y: 83.33 }
];

const PIECE_RADIUS = 6.5;

const pieceFill = (value: CellValue, selected: boolean): string => {
  if (value === "X") return "#2E2E2E";
  if (value === "O") return "#F5EFE0";
  return "transparent";
};

const pieceStroke = (value: CellValue, selected: boolean): string => {
  if (value === "O") return "#B37A4C";
  return "none";
};

const pieceShadowClass = (value: CellValue, selected: boolean): string => {
  if (value === "X") return selected ? "drop-shadow-[0_0_8px_rgba(140,198,62,0.5)]" : "drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]";
  if (value === "O") return selected ? "drop-shadow-[0_0_8px_rgba(140,198,62,0.5)]" : "drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]";
  return "";
};

export const InGameBoard = ({ board, selectedCell, legalTargets, onCellClick }: InGameBoardProps) => {
  return (
    <div className="relative mx-auto w-full max-w-[55vh]" style={{ aspectRatio: "712/683" }}>
      <div className="absolute inset-0 drop-shadow-lg">
        <img
          src="/assets/ui/ui-board.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-contain"
        />
      </div>

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g pointerEvents="none">
          <line x1="16.67" y1="16.67" x2="83.33" y2="16.67" stroke="#1a1a1a" strokeWidth="0.3" opacity="0.7" />
          <line x1="16.67" y1="50" x2="83.33" y2="50" stroke="#1a1a1a" strokeWidth="0.3" opacity="0.7" />
          <line x1="16.67" y1="83.33" x2="83.33" y2="83.33" stroke="#1a1a1a" strokeWidth="0.3" opacity="0.7" />
          <line x1="16.67" y1="16.67" x2="16.67" y2="83.33" stroke="#1a1a1a" strokeWidth="0.3" opacity="0.7" />
          <line x1="50" y1="16.67" x2="50" y2="83.33" stroke="#1a1a1a" strokeWidth="0.3" opacity="0.7" />
          <line x1="83.33" y1="16.67" x2="83.33" y2="83.33" stroke="#1a1a1a" strokeWidth="0.3" opacity="0.7" />
          <line x1="16.67" y1="16.67" x2="83.33" y2="83.33" stroke="#1a1a1a" strokeWidth="0.3" opacity="0.7" />
          <line x1="83.33" y1="16.67" x2="16.67" y2="83.33" stroke="#1a1a1a" strokeWidth="0.3" opacity="0.7" />
        </g>

        {POSITIONS.map(({ idx, x, y }) => {
          const value = board[idx];
          const selected = selectedCell === idx;
          const isTarget = legalTargets.includes(idx);
          const isPossibleTarget = isTarget && value === null;

          return (
          <g key={idx} className="pointer-events-auto cursor-pointer">
            <circle cx={x} cy={y} r={PIECE_RADIUS + 2.5} fill="rgba(0,0,0,0.001)" onClick={() => onCellClick(idx)} />

            {isPossibleTarget && (
              <circle cx={x} cy={y} r={2.5} fill="#8CC63E" opacity="0.4" />
            )}

            {value !== null && (
              <>
                <motion.circle
                  cx={x}
                  cy={y}
                  r={PIECE_RADIUS}
                  fill={pieceFill(value, selected)}
                  stroke={pieceStroke(value, selected)}
                  strokeWidth={pieceStroke(value, selected) !== "none" ? 0.4 : 0}
                  filter={selected ? "url(#glow)" : undefined}
                  className={pieceShadowClass(value, selected)}
                  initial={false}
                  animate={selected ? { r: PIECE_RADIUS + 1 } : { r: PIECE_RADIUS }}
                  transition={selected ? { duration: 0.25, ease: [0.33, 1, 0.68, 1] } : { duration: 0.2 }}
                />

                {isTarget && value !== null && (
                  <circle
                    cx={x}
                    cy={y}
                    r={PIECE_RADIUS + 1.5}
                    fill="none"
                    stroke="#8CC63E"
                    strokeWidth="0.3"
                    opacity="0.6"
                  />
                )}
              </>
            )}
          </g>
          );
        })}
      </svg>
    </div>
  );
};
