import { useState } from "react";
import { motion } from "framer-motion";
import { LeavesOverlay } from "../main-menu/LeavesOverlay";
import { InGameBoard } from "./InGameBoard";
import { TurnBar } from "./TurnBar";
import { LeftSidebar } from "./LeftSidebar";
import { RightSidebar } from "./RightSidebar";
import { MoveHistoryBar } from "./MoveHistoryBar";
import { VictoryOverlay } from "./VictoryOverlay";
import { useSound } from "../../hooks/useSound";
import type { GameMode, GameSnapshot, PlayerConfig } from "../../types/game";
import type { GameStats } from "../../services/statsService";

interface GameScreenProps {
  snapshot: GameSnapshot;
  selectedCell: number | null;
  legalTargets: number[];
  canUndo: boolean;
  canRedo: boolean;
  moveCount: number;
  players: Record<"X" | "O", PlayerConfig>;
  mode: GameMode;
  stats: GameStats;
  muted: boolean;
  onToggleMute: () => void;
  onCellClick: (index: number) => void;
  onUndo: () => void;
  onRedo: () => void;
  onRestart: () => void;
  onBackHome: () => void;
}

const easeOut: [number, number, number, number] = [0.33, 1, 0.68, 1];

export const GameScreen = ({
  snapshot,
  selectedCell,
  legalTargets,
  canUndo,
  moveCount,
  players,
  mode,
  stats,
  muted,
  onToggleMute,
  onCellClick,
  onUndo,
  onRestart,
  onBackHome,
}: GameScreenProps) => {
  const { piecesInHand, moveHistory } = snapshot;
  const playSelection = useSound("/selection.wav");
  const [animating, setAnimating] = useState(false);

  return (
    <div className="relative flex h-screen w-screen flex-col overflow-hidden bg-[#F4EFE6]">
      <img
        src="/background.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
        style={{ zIndex: 0 }}
      />
      <LeavesOverlay />

      <div className="relative z-[2] flex flex-1 flex-col overflow-y-auto px-2 pb-3 sm:px-3 lg:px-6">
        <motion.header
          className="mx-auto mb-4 mt-3 flex w-full flex-col items-center gap-2 lg:mb-8 lg:mt-6 lg:grid lg:max-w-[65%] lg:grid-cols-[1fr_auto_1fr] lg:gap-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: easeOut }}
        >
          <motion.img
            src="/title-cropped.png"
            alt="Fanorona"
            className="h-20 w-auto object-contain justify-self-start sm:h-24 lg:h-28"
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeOut, delay: 0.1 }}
          />

          <TurnBar
            turnNumber={moveHistory.length + 1}
            piecesX={piecesInHand.X}
            piecesO={piecesInHand.O}
          />

          <div className="flex items-center justify-center gap-1 lg:justify-self-end lg:gap-2">
            <motion.button
              type="button"
              onClick={onToggleMute}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F8F3EC] shadow-[0_2px_8px_rgba(0,0,0,0.06)] lg:h-[42px] lg:w-[42px]"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.15, ease: [0.33, 1, 0.68, 1] }}
              aria-label={muted ? "Activer la musique" : "Couper la musique"}
            >
              {muted ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#676767" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#676767" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" /></svg>
              )}
            </motion.button>
            <motion.button
              type="button"
              onClick={() => { playSelection(); onRestart(); }}
              className="flex items-center justify-center gap-1 rounded-xl bg-[#F8F3EC] px-2 py-2 text-xs font-semibold text-[#676767] shadow-[0_2px_8px_rgba(0,0,0,0.06)] lg:gap-2 lg:px-4 lg:py-3 lg:text-sm"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.15, ease: [0.33, 1, 0.68, 1] }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
              <span className="hidden sm:inline">Rematch</span>
            </motion.button>
            <motion.button
              type="button"
              onClick={() => { playSelection(); onBackHome(); }}
              className="flex items-center justify-center gap-1 rounded-xl bg-[#F8F3EC] px-2 py-2 text-xs font-semibold text-[#676767] shadow-[0_2px_8px_rgba(0,0,0,0.06)] lg:gap-2 lg:px-4 lg:py-3 lg:text-sm"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.15, ease: [0.33, 1, 0.68, 1] }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              <span className="hidden sm:inline">Quitter</span>
            </motion.button>
          </div>
        </motion.header>

        <div className="mx-auto flex w-full flex-col items-center gap-3 lg:max-w-[65%] lg:flex-row lg:items-stretch">
          <motion.div
            className="hidden w-full lg:flex lg:flex-1"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: easeOut, delay: 0.1 }}
          >
            <LeftSidebar
              snapshot={snapshot}
              players={players}
              mode={mode}
            />
          </motion.div>

          <motion.div
            className="flex w-full items-start justify-center lg:w-[55vh]"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
          >
            <InGameBoard
              board={snapshot.board}
              selectedCell={selectedCell}
              legalTargets={legalTargets}
              onCellClick={onCellClick}
              onAnimatingChange={setAnimating}
            />
          </motion.div>

          <motion.div
            className="hidden w-full lg:flex lg:flex-1"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: easeOut, delay: 0.1 }}
          >
            <RightSidebar
              snapshot={snapshot}
              selectedCell={selectedCell}
              moveCount={moveCount}
              stats={stats}
              onUndo={onUndo}
              canUndo={canUndo}
            />
          </motion.div>
        </div>

        <motion.div
          className="mt-3 grid w-full grid-cols-2 gap-3 lg:hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: easeOut, delay: 0.25 }}
        >
          <LeftSidebar
            snapshot={snapshot}
            players={players}
            mode={mode}
          />
          <RightSidebar
            snapshot={snapshot}
            selectedCell={selectedCell}
            moveCount={moveCount}
            stats={stats}
            onUndo={onUndo}
            canUndo={canUndo}
          />
        </motion.div>

        <motion.div
          className="relative z-[1] mt-3 flex justify-center lg:mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: easeOut, delay: 0.3 }}
        >
          <MoveHistoryBar moves={moveHistory} />
        </motion.div>
      </div>

      {!animating && <VictoryOverlay snapshot={snapshot} onRestart={onRestart} onBackHome={onBackHome} />}
    </div>
  );
};
