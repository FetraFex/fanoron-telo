import { motion, AnimatePresence } from "framer-motion";
import type { GameSnapshot } from "../../types/game";

interface VictoryOverlayProps {
  snapshot: GameSnapshot;
  onRestart: () => void;
  onBackHome: () => void;
}

export const VictoryOverlay = ({ snapshot, onRestart, onBackHome }: VictoryOverlayProps) => {
  const { winner, isDraw } = snapshot;
  const show = winner !== null || isDraw;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
        >
          <motion.div
            className="flex flex-col items-center gap-6 rounded-3xl bg-[#F8F3EC] px-12 py-10 shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
          >
            <span className="text-5xl">{isDraw ? "🤝" : "👑"}</span>
            <h2 className="text-2xl font-bold text-[#2E2E2E]">
              {isDraw ? "Match nul !" : `${winner} a gagné !`}
            </h2>
            <p className="text-sm text-[#676767]">
              {isDraw
                ? "Aucun vainqueur, partie terminée."
                : "Félicitations pour cette victoire !"}
            </p>
            <div className="flex gap-3">
              <motion.button
                type="button"
                onClick={onRestart}
                className="rounded-xl bg-fanorona-green px-8 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.15 }}
              >
                Revanche
              </motion.button>
              <motion.button
                type="button"
                onClick={onBackHome}
                className="rounded-xl bg-[#264F2A] px-8 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.15 }}
              >
                Retour au menu
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
