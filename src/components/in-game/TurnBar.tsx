interface TurnBarProps {
  currentPlayer: "X" | "O";
  turnNumber: number;
  piecesX: number;
  piecesO: number;
}

export const TurnBar = ({ currentPlayer, turnNumber, piecesX, piecesO }: TurnBarProps) => {
  return (
    <div className="mx-auto flex h-[44px] items-center gap-5 rounded-full bg-[#F8F3EC]/90 px-7 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      <span className="flex items-center gap-2 text-xs font-semibold text-[#2E2E2E]">
        <span className="h-2.5 w-2.5 rounded-full bg-[#2E2E2E]" />
        {piecesX} pions
      </span>

      <span className="text-xs font-bold uppercase tracking-wider text-[#8B6A4A]">
        Tour {turnNumber}
      </span>

      <span className="flex items-center gap-2 text-xs font-semibold text-[#2E2E2E]">
        {piecesO} pions
        <span className="h-2.5 w-2.5 rounded-full border border-[#B37A4C] bg-[#F5EFE0]" />
      </span>
    </div>
  );
};
