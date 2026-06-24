import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CellValue } from "../../types/game";

interface InGameBoardProps {
  board: CellValue[];
  selectedCell: number | null;
  legalTargets: number[];
  onCellClick: (index: number) => void;
  onAnimatingChange?: (animating: boolean) => void;
}

const P = 16.67;
const M = 50;
const Q = 83.33;

const POSITIONS = [
  { idx: 0, left: `${P}%`, top: `${P}%` },
  { idx: 1, left: `${M}%`, top: `${P}%` },
  { idx: 2, left: `${Q}%`, top: `${P}%` },
  { idx: 3, left: `${P}%`, top: `${M}%` },
  { idx: 4, left: `${M}%`, top: `${M}%` },
  { idx: 5, left: `${Q}%`, top: `${M}%` },
  { idx: 6, left: `${P}%`, top: `${Q}%` },
  { idx: 7, left: `${M}%`, top: `${Q}%` },
  { idx: 8, left: `${Q}%`, top: `${Q}%` }
];

const SPAN = Q - P;

const pieceClass = (value: CellValue, selected: boolean): string => {
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

const LINE_STYLE: React.CSSProperties = {
  position: "absolute",
  background: "#1a1a1a",
  opacity: 0.7,
  pointerEvents: "none"
};

export const InGameBoard = ({ board, selectedCell, legalTargets, onCellClick, onAnimatingChange }: InGameBoardProps) => {
  const prevBoard = useRef<CellValue[]>(board);
  const [moveAnim, setMoveAnim] = useState<{ from: number; to: number; player: Exclude<CellValue, null> } | null>(null);

  useEffect(() => {
    if (moveAnim) return;

    const prev = prevBoard.current;
    let movingFrom: number | null = null;
    let movingTo: number | null = null;
    let player: CellValue = null;

    for (let i = 0; i < 9; i++) {
      if (prev[i] !== null && board[i] === null) {
        movingFrom = i;
        player = prev[i] as Exclude<CellValue, null>;
      }
      if (prev[i] === null && board[i] !== null) {
        movingTo = i;
      }
    }

    if (movingFrom !== null && movingTo !== null && player !== null) {
      setMoveAnim({ from: movingFrom, to: movingTo, player });
    }

    prevBoard.current = board;
  }, [board, moveAnim]);

  useEffect(() => {
    onAnimatingChange?.(moveAnim !== null);
    return () => onAnimatingChange?.(false);
  }, [moveAnim, onAnimatingChange]);

  return (
    <div className="relative mx-auto w-full max-w-full lg:max-w-[55vh]" style={{ aspectRatio: "712/683" }}>
      <div className="absolute inset-0">
        <img
          src="/assets/ui/ui-board.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-contain"
        />
      </div>

      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <div style={{ ...LINE_STYLE, left: `${P}%`, top: `${P}%`, width: `${SPAN}%`, height: "1px" }} />
        <div style={{ ...LINE_STYLE, left: `${P}%`, top: `${M}%`, width: `${SPAN}%`, height: "1px" }} />
        <div style={{ ...LINE_STYLE, left: `${P}%`, top: `${Q}%`, width: `${SPAN}%`, height: "1px" }} />
        <div style={{ ...LINE_STYLE, top: `${P}%`, left: `${P}%`, height: `${SPAN}%`, width: "1px" }} />
        <div style={{ ...LINE_STYLE, top: `${P}%`, left: `${M}%`, height: `${SPAN}%`, width: "1px" }} />
        <div style={{ ...LINE_STYLE, top: `${P}%`, left: `${Q}%`, height: `${SPAN}%`, width: "1px" }} />
      </div>

      <div className="absolute inset-0" style={{ zIndex: 2, pointerEvents: "none" }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
          <line x1={P} y1={P} x2={Q} y2={Q} stroke="#1a1a1a" strokeWidth="0.3" opacity="0.7" />
          <line x1={Q} y1={P} x2={P} y2={Q} stroke="#1a1a1a" strokeWidth="0.3" opacity="0.7" />
        </svg>
      </div>

      <div className="absolute inset-0" style={{ zIndex: 3 }}>
        {POSITIONS.map(({ idx, left, top }) => {
          const value = board[idx];
          const selected = selectedCell === idx;
          const isTarget = legalTargets.includes(idx);
          const isPossibleTarget = isTarget && value === null;
          const hidePiece = moveAnim !== null && (idx === moveAnim.from || idx === moveAnim.to);

          return (
            <button
              key={idx}
              type="button"
              aria-label={`Intersection ${idx + 1}`}
              onClick={() => onCellClick(idx)}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left, top }}
            >
              <motion.span
                className={`flex h-12 w-12 items-center justify-center rounded-full sm:h-14 sm:w-14 ${hidePiece ? "bg-transparent" : pieceClass(value, selected)}`}
                animate={selected ? { scale: [1, 1.12, 1.08] } : { scale: 1 }}
                transition={selected ? { duration: 0.25, ease: [0.33, 1, 0.68, 1] } : { duration: 0.2 }}
              >
                <AnimatePresence>
                  {isPossibleTarget && (
                    <motion.span
                      className="h-4 w-4 rounded-full bg-[#8CC63E]/40"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.15, ease: [0.33, 1, 0.68, 1] }}
                    />
                  )}
                </AnimatePresence>

                {value !== null && !hidePiece && (
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    animate={isTarget ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                    transition={isTarget ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" } : undefined}
                  />
                )}
              </motion.span>
            </button>
          );
        })}
      </div>

      {moveAnim && (
        <motion.div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          initial={{ left: POSITIONS[moveAnim.from].left, top: POSITIONS[moveAnim.from].top }}
          animate={{ left: POSITIONS[moveAnim.to].left, top: POSITIONS[moveAnim.to].top }}
          transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
          onAnimationComplete={() => setMoveAnim(null)}
        >
          <motion.span
            className={`flex h-12 w-12 items-center justify-center rounded-full sm:h-14 sm:w-14 ${pieceClass(moveAnim.player, false)}`}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
          />
        </motion.div>
      )}
    </div>
  );
};
