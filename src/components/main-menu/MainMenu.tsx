import { useState } from "react";
import { motion } from "framer-motion";
import { MenuButton } from "./MenuButton";
import { BottomNav } from "./BottomNav";
import { BoardSection } from "./BoardSection";
import { LeavesOverlay } from "./LeavesOverlay";
import { GameTitle } from "./GameTitle";
import { DifficultySelection } from "./DifficultySelection";
import { useHoverSound } from "../../hooks/useHoverSound";
import { useSound } from "../../hooks/useSound";
import { fadeIn, logoReveal, fadeSlideLeft, staggerContainer } from "../../animations";
import type { GameMode, GameOptions } from "../../types/game";

interface MainMenuProps {
  onStart: (options: GameOptions) => void;
  muted: boolean;
  onToggleMute: () => void;
}

const BUTTONS = [
  {
    id: "PVP" as GameMode,
    label: "JOUEUR VS JOUEUR",
    subtitle: "Deux joueurs sur le même écran",
    badge: undefined,
    icon: <UsersIcon />
  },
  {
    id: "PVAI" as GameMode,
    label: "JOUEUR VS IA",
    subtitle: "Solo contre l'ordinateur",
    badge: undefined,
    icon: <UserBoltIcon />
  },
  {
    id: "AIVSAI" as GameMode,
    label: "IA VS IA",
    subtitle: "Regarder les IA jouer",
    badge: "DEMO",
    icon: <RobotIcon />
  }
];

function UsersIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function UserBoltIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="m19 8-3 4h4l-3 4" />
    </svg>
  );
}

function RobotIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="10" x="3" y="11" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" x2="8" y1="16" y2="16" />
      <line x1="16" x2="16" y1="16" y2="16" />
    </svg>
  );
}

export const MainMenu = ({ onStart, muted, onToggleMute }: MainMenuProps) => {
  const [active, setActive] = useState<GameMode>("PVP");
  const [screen, setScreen] = useState<"menu" | "difficulty">("menu");
  const playHover = useHoverSound();
  const playSelection = useSound("/selection.wav");
  const playConfirmation = useSound("/confirmation.wav");

  const handleStart = () => {
    if (active === "PVP") {
      onStart({
        mode: "PVP",
        aiVsAiDelayMs: 420,
        players: { X: { type: "human" }, O: { type: "human" } }
      });
      return;
    }

    setScreen("difficulty");
  };

  if (screen === "difficulty") {
    return (
      <DifficultySelection
        mode={active}
        onStart={onStart}
        onBack={() => setScreen("menu")}
      />
    );
  }

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

      <div className="relative z-[2] flex h-full flex-col md:flex-row">
        <div className="relative flex w-full flex-col px-6 py-8 md:w-[48%] md:pl-48 md:pr-12 md:pt-24 md:pb-10">
          <motion.div variants={logoReveal}>
            <GameTitle />
          </motion.div>

          <motion.nav
            className="flex flex-col gap-3"
            variants={staggerContainer}
          >
            {BUTTONS.map((btn) => (
              <motion.div key={btn.id} variants={fadeSlideLeft}>
                <MenuButton
                  icon={btn.icon}
                  label={btn.label}
                  subtitle={btn.subtitle}
                  badge={btn.badge}
                  isActive={active === btn.id}
                  onClick={() => { setActive(btn.id); playSelection(); }}
                />
              </motion.div>
            ))}
          </motion.nav>

          <div className="mt-6 flex justify-center md:justify-start">
            <button
              type="button"
              onClick={() => { playConfirmation(); handleStart(); }}
              onMouseEnter={playHover}
              className="rounded-xl bg-fanorona-green px-10 py-4 text-base font-bold uppercase tracking-wide text-white transition-colors duration-150 hover:bg-fanorona-green/90"
            >
              Lancer la partie
            </button>
          </div>

          <BottomNav muted={muted} onToggleMute={onToggleMute} />
        </div>

          <BoardSection />
      </div>
    </motion.div>
  );
};
