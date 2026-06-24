import { useState } from "react";
import { LeavesOverlay } from "./LeavesOverlay";
import { GameTitle } from "./GameTitle";
import { MenuButton } from "./MenuButton";
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

  const handleStart = () => {
    if (mode === "PVAI") {
      onStart({
        mode: "PVAI",
        aiVsAiDelayMs: 420,
        players: { X: { type: "human" }, O: { type: "ai", difficulty: selected } }
      });
      return;
    }

    onStart({
      mode: "AIVSAI",
      aiVsAiDelayMs: 420,
      players: {
        X: { type: "ai", difficulty: selected },
        O: { type: "ai", difficulty: selected }
      }
    });
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-fanorona-bg">
      <img
        src="/background.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{ zIndex: 0 }}
      />

      <LeavesOverlay />

      <div className="relative z-[2] flex h-full flex-col items-center overflow-y-auto px-6 py-6">
        <div className="mb-4">
          <GameTitle />
        </div>

        <h2 className="mb-6 text-center text-[28px] font-semibold tracking-[1px] text-[#4A2A18] md:text-[36px]">
          {mode === "AIVSAI" ? "Choisir la difficulté IA" : "Sélectionner la difficulté"}
        </h2>

        <div className="mb-6 flex w-full max-w-[500px] flex-col items-center gap-3">
          {DIFFICULTIES.map((diff) => (
            <MenuButton
              key={diff.id}
              icon={diff.icon}
              label={diff.label}
              subtitle={diff.subtitle}
              isActive={selected === diff.id}
              onClick={() => setSelected(diff.id)}
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={handleStart}
            className="flex items-center gap-3 rounded-2xl bg-fanorona-green px-12 py-5 text-lg font-bold uppercase tracking-wide text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl"
          >
            <span>{">"}</span>
            Lancer la partie
          </button>

          <button
            type="button"
            onClick={onBack}
            className="flex w-[220px] items-center justify-center gap-2 rounded-2xl bg-fanorona-btn-idle px-8 py-4 text-sm font-bold uppercase tracking-wide text-fanorona-brown transition-colors duration-150 hover:bg-fanorona-btn-idle/80"
          >
            ← Retour
          </button>
        </div>
      </div>
    </div>
  );
};
