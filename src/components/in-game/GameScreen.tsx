import { motion } from "framer-motion";
import { LeavesOverlay } from "../main-menu/LeavesOverlay";
import { InGameBoard } from "./InGameBoard";
import { TurnBar } from "./TurnBar";
import { LeftSidebar } from "./LeftSidebar";
import { RightSidebar } from "./RightSidebar";
import { MoveHistoryBar } from "./MoveHistoryBar";
import { VictoryOverlay } from "./VictoryOverlay";
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
  onCellClick: (index: number) => void;
  onUndo: () => void;
  onRedo: () => void;
  onRestart: () => void;
  onBackHome: () => void;
}

const easeOut = [0.33, 1, 0.68, 1];

export const GameScreen = ({
  snapshot,
  selectedCell,
  legalTargets,
  canUndo,
  moveCount,
  players,
  mode,
  stats,
  onCellClick,
  onUndo,
  onBackHome,
}: GameScreenProps) => {
  const { currentPlayer, piecesInHand, moveHistory } = snapshot;

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

      <div className="relative z-[2] flex flex-1 flex-col px-6 pt-0 pb-3">
        <motion.header
          className="mb-8 mt-6 mx-auto grid w-full max-w-[65%] items-center"
          style={{ gridTemplateColumns: "1fr auto 1fr" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: easeOut }}
        >
          <motion.img
            src="/title-cropped.png"
            alt="Fanorona"
            className="h-28 w-auto object-contain justify-self-start"
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeOut, delay: 0.1 }}
          />

          <TurnBar
            currentPlayer={currentPlayer}
            turnNumber={moveHistory.length + 1}
            piecesX={piecesInHand.X}
            piecesO={piecesInHand.O}
          />

          <motion.button
            type="button"
            onClick={onBackHome}
            className="justify-self-end flex items-center justify-center gap-2 rounded-xl bg-[#F8F3EC] px-4 py-3 text-sm font-semibold text-[#676767] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.15, ease: [0.33, 1, 0.68, 1] }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Quitter
          </motion.button>
        </motion.header>

        <div className="flex flex-1 flex-col">
          <div className="relative z-[1] flex flex-1 items-stretch justify-center overflow-y-auto">
            <div className="flex w-full max-w-[65%] items-stretch gap-3">
              <motion.div
                className="flex"
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
                className="flex w-[55vh] items-start justify-center"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
              >
                <InGameBoard
                  board={snapshot.board}
                  selectedCell={selectedCell}
                  legalTargets={legalTargets}
                  onCellClick={onCellClick}
                />
              </motion.div>

              <motion.div
                className="flex"
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
          </div>

          <motion.div
            className="relative z-[1] mt-4 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: easeOut, delay: 0.3 }}
          >
            <MoveHistoryBar moves={moveHistory} />
          </motion.div>
        </div>
      </div>

      <VictoryOverlay snapshot={snapshot} onBackHome={onBackHome} />
    </div>
  );
};
