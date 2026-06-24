import { motion } from "framer-motion";

interface PlayerCardProps {
  player: "X" | "O";
  label: string;
  isActive: boolean;
}

export const PlayerCard = ({ player, label, isActive }: PlayerCardProps) => {
  return (
    <motion.div
      className={`rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] ${
        isActive ? "bg-[#264F2A] text-white" : "bg-[#F8F3EC] text-[#2E2E2E]"
      }`}
      animate={isActive ? { scale: 1.02 } : { scale: 1 }}
      transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
    >
      <div className="flex items-center gap-4">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
            player === "X"
              ? "bg-[#2E2E2E]"
              : "border-2 border-[#B37A4C] bg-[#F5EFE0]"
          }`}
        >
          <span className={`h-5 w-5 rounded-full ${isActive ? "shadow-[0_0_0_2px_#8CC63E,0_0_8px_rgba(140,198,62,0.3)]" : ""}`} />
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold uppercase tracking-wide">{label}</p>
        </div>

        {isActive && (
          <motion.span
            className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/90"
            initial={{ opacity: 0.7 }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-[#8CC63E]"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            Actif
          </motion.span>
        )}
      </div>
    </motion.div>
  );
};
