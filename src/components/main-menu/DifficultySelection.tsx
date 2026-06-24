import { useState } from "react";
import { motion } from "framer-motion";
import { LeavesOverlay } from "./LeavesOverlay";
import { GameTitle } from "./GameTitle";
import { MenuButton } from "./MenuButton";
import { useHoverSound } from "../../hooks/useHoverSound";
import { useSound } from "../../hooks/useSound";
import { fadeIn, fadeSlideDown, staggerContainer, fadeSlideUp } from "../../animations";
import type { Difficulty, GameMode, GameOptions } from "../../types/game";

interface DifficultySelectionProps {
  mode: GameMode;
  onStart: (options: GameOptions) => void;
  onBack: () => void;
}

const DIFFICULTIES = [
  {
    id: "easy" as Difficulty,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    ),
    label: "FACILE",
    subtitle: "Niveau débutant"
  },
  {
    id: "medium" as Difficulty,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
    ),
    label: "MOYEN",
    subtitle: "Niveau intermédiaire"
  },
  {
    id: "hard" as Difficulty,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.5 7.5L3 12l7.5 1.5L12 21l1.5-7.5L21 12l-7.5-1.5Z"/></svg>
    ),
    label: "DIFFICILE",
    subtitle: "Niveau avancé"
  }
];

export const DifficultySelection = ({ mode, onStart, onBack }: DifficultySelectionProps) => {
  const [selected, setSelected] = useState<Difficulty>("easy");
  const playHover = useHoverSound();
  const playSelection = useSound("/selection.wav");
  const playConfirmation = useSound("/confirmation.wav");

  const handleStart = () => {
    if (mode === "PVAI") {
      onStart({
        mode: "PVAI",
        aiVsAiDelayMs: 420,
        players: { X: { type: "human" }, O: { type: "ai", difficulty: selected } }
      });
      return;
    }

    if (mode === "AIVSAI") {
      onStart({
        mode: "AIVSAI",
        aiVsAiDelayMs: 420,
        players: {
          X: { type: "ai", difficulty: selected },
          O: { type: "ai", difficulty: selected }
        }
      });
      return;
    }

    onStart({
      mode: "PVP",
      aiVsAiDelayMs: 420,
      players: { X: { type: "human" }, O: { type: "human" } }
    });
  };

  return (
    <motion.div
      className="relative h-screen w-screen overflow-hidden bg-fanorona-bg"
      initial="hidden"
      animate="visible"
    >
      <motion.img
        src="/background.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{ zIndex: 0 }}
        variants={fadeIn}
      />

      <LeavesOverlay />

      <div className="relative z-[2] flex h-full flex-col items-center overflow-y-auto px-6 py-6">
        <motion.div className="mb-4" variants={fadeSlideDown}>
          <GameTitle />
        </motion.div>

        <motion.h2
          className="mb-6 text-center text-xl font-semibold tracking-[1px] text-[#4A2A18] sm:text-2xl md:text-[36px]"
          variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.33, 1, 0.68, 1] } } }}
        >
          {mode === "AIVSAI" ? "Choisir la difficulté IA" : "Sélectionner la difficulté"}
        </motion.h2>

        <motion.div
          className="mb-6 flex w-full max-w-[500px] flex-col items-center gap-3"
          variants={staggerContainer}
        >
          {DIFFICULTIES.map((diff) => (
            <motion.div key={diff.id} variants={fadeSlideUp} style={{ width: "100%" }}>
              <MenuButton
                icon={diff.icon}
                label={diff.label}
                subtitle={diff.subtitle}
                isActive={selected === diff.id}
                onClick={() => { setSelected(diff.id); playSelection(); }}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.33, 1, 0.68, 1] } }}
        >
          <motion.button
            type="button"
            onClick={() => { playConfirmation(); handleStart(); }}
            onMouseEnter={playHover}
            className="flex items-center gap-3 rounded-2xl bg-fanorona-green px-8 py-4 text-base font-bold uppercase tracking-wide text-white shadow-lg sm:px-12 sm:py-5 sm:text-lg"
            whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
            whileTap={{ scale: 0.96, transition: { duration: 0.12 } }}
          >
            <span>{">"}</span>
            Lancer la partie
          </motion.button>

          <button
            type="button"
            onClick={onBack}
            onMouseEnter={playHover}
            className="flex w-full max-w-[220px] items-center justify-center gap-2 rounded-2xl bg-fanorona-btn-idle px-6 py-4 text-sm font-bold uppercase tracking-wide text-fanorona-brown transition-colors duration-150 hover:bg-fanorona-btn-idle/80 sm:w-[220px] sm:px-8"
          >
            ← Retour
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};
