import { useEffect, useRef, useState } from "react";
import { Board } from "../components/Board";
import { GameControls } from "../components/GameControls";
import { GameStatus } from "../components/GameStatus";
import { MoveHistory } from "../components/MoveHistory";
import { StatsPanel } from "../components/StatsPanel";
import { useFanoronaGame } from "../hooks/useFanoronaGame";
import type { GameStats } from "../services/statsService";
import type { GameOptions, GameSnapshot } from "../types/game";

interface GamePageProps {
  options: GameOptions;
  stats: GameStats;
  onGameFinished: (snapshot: GameSnapshot) => void;
  onBackHome: () => void;
  onToggleTheme: () => void;
  theme: "light" | "dark";
}

// --- Icons ---
const BackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

const UndoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M3 7v6h6" />
    <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13" />
  </svg>
);

const RedoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M21 7v6h-6" />
    <path d="M3 17a9 9 0 019-9 9 9 0 016 2.3L21 13" />
  </svg>
);

const RestartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.25 2.25L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export const GamePage = ({
  options,
  stats,
  onGameFinished,
  onBackHome,
  onToggleTheme,
  theme,
}: GamePageProps) => {
  const {
    snapshot,
    selectedCell,
    legalTargets,
    canUndo,
    canRedo,
    handleCellClick,
    undo,
    redo,
    restart,
  } = useFanoronaGame(options);
  const reportedKeyRef = useRef<string>("");

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (snapshot.phase !== "finished") {
      reportedKeyRef.current = "";
      setShowModal(false);
      return;
    }
    const key = `${snapshot.moveHistory.length}-${snapshot.winner ?? "draw"}`;
    if (reportedKeyRef.current === key) return;
    reportedKeyRef.current = key;
    onGameFinished(snapshot);
    setShowModal(true);
  }, [snapshot, onGameFinished]);

  const isDark = theme === "dark";

  const bg = isDark ? "bg-[#1a1a1a]" : "bg-[#f0f0f0]";
  const surface = isDark ? "bg-[#262626]" : "bg-white";
  const border = isDark ? "border-[#2d2d2d]" : "border-[#e0e0e0]";
  const textPrimary = isDark ? "text-white" : "text-[#1a1a1a]";
  const textSecondary = isDark ? "text-[#8a8a8a]" : "text-[#6a6a6a]";
  const textMuted = isDark ? "text-[#b0b0b0]" : "text-[#4a4a4a]";

  const getWinnerColors = () => {
    if (snapshot.winner === "X") {
      return {
        bg: "bg-blue-600",
        text: "text-white",
        label: "X gagne !",
      };
    }
    if (snapshot.winner === "O") {
      return {
        bg: "bg-rose-600",
        text: "text-white",
        label: "O gagne !",
      };
    }
    return {
      bg: "bg-gray-500",
      text: "text-white",
      label: "Match nul !",
    };
  };

  const winner = getWinnerColors();

  const handleRestartFromModal = () => {
    setShowModal(false);
    restart();
  };

  const handleBackHomeFromModal = () => {
    setShowModal(false);
    onBackHome();
  };

  return (
    <div className={`min-h-screen ${bg}`}>
      <header className={`border-b ${border} ${surface}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <button
            onClick={onBackHome}
            className={`flex items-center gap-2 text-sm font-medium transition ${textMuted} hover:${textPrimary}`}
          >
            <BackIcon />
            <span>Retour</span>
          </button>

          <div className="flex items-center gap-4">
            <span className={`text-lg font-bold tracking-tight ${textPrimary}`}>
              Fanoron‑telo
            </span>
            <span
              className={`rounded-full px-3 py-0.5 text-xs font-semibold ${
                isDark ? "bg-[#3d3d3d] text-[#b0b0b0]" : "bg-[#e8e8e8] text-[#4a4a4a]"
              }`}
            >
              {options.mode}
            </span>
          </div>

          <button
            onClick={onToggleTheme}
            className={`rounded-lg p-2 transition ${
              isDark
                ? "bg-[#3d3d3d] text-[#b0b0b0] hover:bg-[#4d4d4d] hover:text-white"
                : "bg-[#e8e8e8] text-[#4a4a4a] hover:bg-[#d5d5d5] hover:text-black"
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? <MoonIcon /> : <SunIcon />}
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <div className={`rounded-xl ${surface} p-4 shadow-sm`}>
              <GameStatus snapshot={snapshot} players={options.players} theme={theme} />
            </div>

            <div
              className={`relative overflow-hidden rounded-2xl p-4 shadow-md ${
                isDark ? "bg-[#2a241e]" : "bg-[#d9b382]"
              }`}
            >
              <Board
                board={snapshot.board}
                selectedCell={selectedCell}
                legalTargets={legalTargets}
                onCellClick={handleCellClick}
                theme={theme}
                winningLine={snapshot.winningLine || []}
              />
            </div>

            <div className={`rounded-xl ${surface} p-3 shadow-sm`}>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <button
                  onClick={undo}
                  disabled={!canUndo}
                  className={`rounded-lg p-2 transition ${
                    canUndo
                      ? `${textPrimary} hover:bg-[#e8e8e8] dark:hover:bg-[#3d3d3d]`
                      : "cursor-not-allowed opacity-40"
                  }`}
                  aria-label="Annuler"
                  title="Annuler"
                >
                  <UndoIcon />
                </button>
                <button
                  onClick={redo}
                  disabled={!canRedo}
                  className={`rounded-lg p-2 transition ${
                    canRedo
                      ? `${textPrimary} hover:bg-[#e8e8e8] dark:hover:bg-[#3d3d3d]`
                      : "cursor-not-allowed opacity-40"
                  }`}
                  aria-label="Refaire"
                  title="Refaire"
                >
                  <RedoIcon />
                </button>
                <div className="mx-1 h-6 w-px bg-[#d0d0d0] dark:bg-[#3d3d3d]" />
                <button
                  onClick={restart}
                  className={`rounded-lg p-2 transition ${textPrimary} hover:bg-[#e8e8e8] dark:hover:bg-[#3d3d3d]`}
                  aria-label="Recommencer"
                  title="Recommencer"
                >
                  <RestartIcon />
                </button>
                <button
                  onClick={onBackHome}
                  className={`ml-auto rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                    isDark
                      ? "bg-[#3d3d3d] text-[#b0b0b0] hover:bg-[#4d4d4d] hover:text-white"
                      : "bg-[#e8e8e8] text-[#4a4a4a] hover:bg-[#d5d5d5] hover:text-black"
                  }`}
                >
                  Quitter
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className={`rounded-xl ${surface} shadow-sm overflow-hidden`}>
              <div className={`border-b ${border} px-4 py-3`}>
                <h3 className={`text-xs font-semibold uppercase tracking-wider ${textSecondary}`}>
                  Historique
                </h3>
              </div>
              <div className="max-h-[280px] overflow-y-auto p-3">
                <MoveHistory moves={snapshot.moveHistory} theme={theme} />
              </div>
            </div>

            <div className={`rounded-xl ${surface} shadow-sm overflow-hidden`}>
              <div className={`border-b ${border} px-4 py-3`}>
                <h3 className={`text-xs font-semibold uppercase tracking-wider ${textSecondary}`}>
                  Statistiques
                </h3>
              </div>
              <div className="p-3">
                <StatsPanel stats={stats} theme={theme} />
              </div>
            </div>

            <div
              className={`rounded-xl px-4 py-3 text-sm ${surface} shadow-sm ${textSecondary}`}
            >
              <span className="font-medium">Mode</span>{" "}
              <span className={textPrimary}>{options.mode}</span>
              <span className="mx-2">·</span>
              <span className="font-medium">Délai IA</span>{" "}
              <span className={textPrimary}>{options.aiVsAiDelayMs}ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MODAL ===== */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity">
          <div
            className={`relative max-w-md w-full mx-4 p-8 rounded-2xl shadow-2xl ${surface} border ${border} transform transition-all scale-100`}
          >
            <div
              className={`-mx-8 -mt-8 mb-6 rounded-t-2xl px-8 py-4 ${winner.bg} ${winner.text} text-center`}
            >
              <h2 className="text-2xl font-bold">🏆 {winner.label}</h2>
            </div>

            <div className="space-y-4 text-center">
              <p className={`text-lg ${textPrimary}`}>
                Partie terminée en <span className="font-bold">{snapshot.moveHistory.length}</span> coups.
              </p>
              <p className={`text-sm ${textSecondary}`}>
                {snapshot.winner
                  ? `Le joueur ${snapshot.winner} remporte la victoire !`
                  : "Personne ne marque, c'est un match nul."}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={handleRestartFromModal}
                className={`flex-1 rounded-xl px-6 py-3 font-semibold transition shadow-md ${winner.bg} ${winner.text} hover:brightness-110 hover:shadow-lg`}
              >
                🔄 Rejouer
              </button>
              <button
                onClick={handleBackHomeFromModal}
                className={`flex-1 rounded-xl border ${border} px-6 py-3 font-semibold transition ${textPrimary} hover:bg-[#e8e8e8] dark:hover:bg-[#3d3d3d]`}
              >
                🏠 Accueil
              </button>
            </div>

            <button
              onClick={handleBackHomeFromModal}
              className={`absolute right-4 top-4 rounded-full p-1.5 transition ${textMuted} hover:bg-[#e8e8e8] dark:hover:bg-[#3d3d3d]`}
              aria-label="Fermer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};