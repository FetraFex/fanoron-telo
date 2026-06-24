import { motion } from "framer-motion";

interface TurnBarProps {
  turnNumber: number;
  piecesX: number;
  piecesO: number;
}

export const TurnBar = ({ turnNumber, piecesX, piecesO }: TurnBarProps) => {
  return (
    <div className="flex h-[52px] items-center gap-6 rounded-full bg-[#F8F3EC]/90 px-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      <span className="flex items-center gap-2 text-sm font-semibold text-[#2E2E2E]">
        <span className="h-3 w-3 rounded-full bg-[#2E2E2E]" />
        {piecesX} pions
      </span>

      <motion.span
        key={turnNumber}
        className="text-sm font-bold uppercase tracking-wider text-[#8B6A4A]"
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

      <span className="flex items-center gap-2 text-sm font-semibold text-[#2E2E2E]">
        {piecesO} pions
        <span className="h-3 w-3 rounded-full border border-[#B37A4C] bg-[#F5EFE0]" />
      </span>
    </div>
  );
};
