import { LeavesOverlay } from "../main-menu/LeavesOverlay";
import { InGameBoard } from "./InGameBoard";
import { TurnBar } from "./TurnBar";
import { LeftSidebar } from "./LeftSidebar";
import { RightSidebar } from "./RightSidebar";
import { MoveHistoryBar } from "./MoveHistoryBar";
import type { GameSnapshot, PlayerConfig } from "../../types/game";

interface GameScreenProps {
  snapshot: GameSnapshot;
  selectedCell: number | null;
  legalTargets: number[];
  canUndo: boolean;
  canRedo: boolean;
  moveCount: number;
  players: Record<"X" | "O", PlayerConfig>;
  onCellClick: (index: number) => void;
  onUndo: () => void;
  onRedo: () => void;
  onRestart: () => void;
  onBackHome: () => void;
}

export const GameScreen = ({
  snapshot,
  selectedCell,
  legalTargets,
  canUndo,
  moveCount,
  players,
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
        <header className="mb-2 flex items-center justify-between">
          <div className="w-[160px]">
            <img src="/title-cropped.png" alt="Fanorona" className="h-6 w-auto object-contain" />
          </div>

          <TurnBar
            currentPlayer={currentPlayer}
            turnNumber={moveHistory.length + 1}
            piecesX={piecesInHand.X}
            piecesO={piecesInHand.O}
          />

          <div className="w-[200px]" />
        </header>

        <div className="flex flex-1 items-start justify-center gap-6 overflow-y-auto">
          <LeftSidebar
            snapshot={snapshot}
            players={players}
            onBackHome={onBackHome}
          />

          <div className="flex flex-1 items-center justify-center py-2">
            <div className="w-full max-w-[55vh]">
              <InGameBoard
                board={snapshot.board}
                selectedCell={selectedCell}
                legalTargets={legalTargets}
                onCellClick={onCellClick}
              />
            </div>
          </div>

          <RightSidebar
            snapshot={snapshot}
            selectedCell={selectedCell}
            moveCount={moveCount}
            onUndo={onUndo}
            canUndo={canUndo}
          />
        </div>

        <div className="mt-4 flex justify-center">
          <MoveHistoryBar moves={moveHistory} />
        </div>
      </div>
    </div>
  );
};
