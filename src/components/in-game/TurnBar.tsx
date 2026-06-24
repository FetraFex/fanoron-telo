import { motion } from "framer-motion";

interface TurnBarProps {
  turnNumber: number;
  piecesX: number;
  piecesO: number;
}

export const TurnBar = ({ turnNumber, piecesX, piecesO }: TurnBarProps) => {
  return (
    <div className="flex h-10 items-center gap-3 rounded-full bg-[#F8F3EC]/90 px-4 text-xs shadow-[0_2px_12px_rgba(0,0,0,0.06)] lg:h-[52px] lg:gap-6 lg:px-8 lg:text-sm">
      <span className="flex items-center gap-1.5 font-semibold text-[#2E2E2E] lg:gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#2E2E2E] lg:h-3 lg:w-3" />
        {piecesX}
      </span>

      <motion.span
        key={turnNumber}
        className="font-bold uppercase tracking-wider text-[#8B6A4A]"
        initial={{ opacity: 0.6 }}
        animate={{
          opacity: 1,
          textShadow: [
            "0 0 0px rgba(139, 106, 74, 0)",
            "0 0 8px rgba(139, 106, 74, 0.3)",
            "0 0 0px rgba(139, 106, 74, 0)",
          ],
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        Tour {turnNumber}
      </motion.span>

      <span className="flex items-center gap-1.5 font-semibold text-[#2E2E2E] lg:gap-2">
        {piecesO}
        <span className="h-2.5 w-2.5 rounded-full border border-[#B37A4C] bg-[#F5EFE0] lg:h-3 lg:w-3" />
      </span>
    </div>
  );
};
