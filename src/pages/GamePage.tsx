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
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);
const UndoIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path d="M3 7v6h6" />
    <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13" />
  </svg>
);
const RedoIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path d="M21 7v6h-6" />
    <path d="M3 17a9 9 0 019-9 9 9 0 016 2.3L21 13" />
  </svg>
);
const RestartIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.25 2.25L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);
const SunIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
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
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

// --- Woven Lamba background ---
const LambaBg = ({ isDark }: { isDark: boolean }) => (
  <svg
    className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <pattern
        id="lamba-game"
        x="0"
        y="0"
        width="24"
        height="24"
        patternUnits="userSpaceOnUse"
      >
        <line
          x1="0"
          y1="4"
          x2="24"
          y2="4"
          stroke={isDark ? "#F0A832" : "#C85A2A"}
          strokeWidth="1.5"
        />
        <line
          x1="0"
          y1="12"
          x2="24"
          y2="12"
          stroke={isDark ? "#2E7D4F" : "#2E7D4F"}
          strokeWidth="1.5"
        />
        <line
          x1="0"
          y1="20"
          x2="24"
          y2="20"
          stroke={isDark ? "#F0A832" : "#C85A2A"}
          strokeWidth="1.5"
        />
        <line
          x1="4"
          y1="0"
          x2="4"
          y2="24"
          stroke={isDark ? "#F0A832" : "#C85A2A"}
          strokeWidth="0.75"
          strokeDasharray="2 2"
        />
        <line
          x1="12"
          y1="0"
          x2="12"
          y2="24"
          stroke={isDark ? "#2E7D4F" : "#2E7D4F"}
          strokeWidth="0.75"
          strokeDasharray="2 2"
        />
        <line
          x1="20"
          y1="0"
          x2="20"
          y2="24"
          stroke={isDark ? "#F0A832" : "#C85A2A"}
          strokeWidth="0.75"
          strokeDasharray="2 2"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#lamba-game)" />
  </svg>
);

// --- Madagascar Landscape SVG (sunset + baobabs) ---
const MadagascarLandscape = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 400 200"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="sunsetGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FF6B35" />
        <stop offset="40%" stopColor="#FFB347" />
        <stop offset="100%" stopColor="#FFE0A0" />
      </linearGradient>
      <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#A0652A" />
        <stop offset="100%" stopColor="#5A3A1A" />
      </linearGradient>
      <radialGradient id="sunGlow" cx="50%" cy="80%" r="50%">
        <stop offset="0%" stopColor="#FFF5D0" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#FFB347" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="400" height="200" fill="url(#sunsetGrad)" />
    <circle cx="200" cy="140" r="80" fill="url(#sunGlow)" />
    <circle cx="200" cy="140" r="28" fill="#FFF5D0" opacity="0.9" />
    <path
      d="M0 180 Q100 150 200 170 Q300 190 400 160 L400 200 L0 200 Z"
      fill="url(#groundGrad)"
    />
    <g transform="translate(60, 120)">
      <rect x="-2" y="0" width="4" height="50" fill="#3A2010" />
      <path d="M-2 10 Q-15 0 -25 15 Q-10 10 -2 10" fill="#3A2010" />
      <path d="M2 10 Q15 -5 25 10 Q10 10 2 10" fill="#3A2010" />
      <path d="M-2 20 Q-20 15 -30 30 Q-15 25 -2 20" fill="#3A2010" />
      <path d="M2 20 Q20 15 30 25 Q15 20 2 20" fill="#3A2010" />
      <rect x="-3" y="0" width="6" height="8" rx="2" fill="#5A3A1A" />
    </g>
    <g transform="translate(280, 130)">
      <rect x="-2" y="0" width="4" height="40" fill="#3A2010" />
      <path d="M-2 8 Q-18 -5 -28 12 Q-12 8 -2 8" fill="#3A2010" />
      <path d="M2 8 Q18 -8 28 8 Q12 8 2 8" fill="#3A2010" />
      <path d="M-2 18 Q-22 10 -32 25 Q-16 20 -2 18" fill="#3A2010" />
      <path d="M2 18 Q22 10 32 22 Q16 18 2 18" fill="#3A2010" />
      <rect x="-3" y="0" width="6" height="6" rx="2" fill="#5A3A1A" />
    </g>
    <g transform="translate(150, 170) scale(0.6)">
      <path
        d="M0 0 Q5 -8 12 -5 L15 0 L13 5 L10 3 L8 8 L5 3 L3 8 L0 5 L-3 8 L-5 3 L-8 8 L-10 5 L-13 3 L-15 0 L-12 -5 Q-5 -8 0 0"
        fill="#2A1A0A"
      />
      <rect x="-1" y="-10" width="2" height="6" fill="#2A1A0A" />
      <circle cx="-8" cy="-6" r="1.5" fill="#2A1A0A" />
      <circle cx="8" cy="-6" r="1.5" fill="#2A1A0A" />
    </g>
    <path
      d="M120 60 Q125 55 130 60 Q135 55 140 60"
      stroke="#2A1A0A"
      strokeWidth="1.5"
      fill="none"
      opacity="0.6"
    />
    <path
      d="M300 50 Q305 45 310 50 Q315 45 320 50"
      stroke="#2A1A0A"
      strokeWidth="1.5"
      fill="none"
      opacity="0.6"
    />
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

  // Helper to get winner colors
  const getWinnerColors = () => {
    if (snapshot.winner === "X") {
      return {
        gradient: isDark
          ? "from-[#1C3A5E] to-[#0F2240]"
          : "from-[#1C3A5E] to-[#2A5085]",
        glow: isDark ? "shadow-[#1C3A5E]/40" : "shadow-[#1C3A5E]/40",
        btn: isDark
          ? "bg-[#1C3A5E] hover:bg-[#2A5085]"
          : "bg-[#1C3A5E] hover:bg-[#2A5085]",
        label: "X remporte la victoire !",
        emoji: "🏆",
      };
    }
    if (snapshot.winner === "O") {
      return {
        gradient: isDark
          ? "from-[#7A2020] to-[#4A1010]"
          : "from-[#C85A2A] to-[#9B3D1A]",
        glow: isDark ? "shadow-[#C85A2A]/40" : "shadow-[#C85A2A]/40",
        btn: isDark
          ? "bg-[#C85A2A] hover:bg-[#9B3D1A]"
          : "bg-[#C85A2A] hover:bg-[#9B3D1A]",
        label: "O remporte la victoire !",
        emoji: "🎉",
      };
    }
    return {
      gradient: isDark
        ? "from-[#2E7D4F] to-[#1A4A30]"
        : "from-[#2E7D4F] to-[#1A4A30]",
      glow: isDark ? "shadow-[#2E7D4F]/40" : "shadow-[#2E7D4F]/40",
      btn: isDark
        ? "bg-[#2E7D4F] hover:bg-[#1A4A30]"
        : "bg-[#2E7D4F] hover:bg-[#1A4A30]",
      label: "Match nul — Vondrona mitovy !",
      emoji: "🤝",
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

  // Convert winningLine from { row, col } to indices (row * 3 + col)
  const winningIndices =
    snapshot.winningLine?.map(({ row, col }) => row * 3 + col) || [];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-[#1A1410]" : "bg-[#FDF6E3]"
      }`}
    >
      {/* Header */}
      <header
        className={`relative overflow-hidden border-b ${
          isDark ? "border-[#3D2E22] bg-[#251D17]" : "border-[#E8D9C0] bg-white"
        }`}
      >
        <LambaBg isDark={isDark} />
        <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <button
            onClick={onBackHome}
            className={`flex items-center gap-2 text-sm font-semibold transition rounded-xl px-3 py-2 border ${
              isDark
                ? "border-[#3D2E22] text-[#7A6050] hover:text-[#FDF6E3]"
                : "border-[#E8D9C0] text-[#9A7A5A] hover:text-[#1A1410]"
            }`}
          >
            <BackIcon />
            <span>Retour</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="text-center">
              <span
                className={`block text-base font-black tracking-tight ${
                  isDark ? "text-[#FDF6E3]" : "text-[#1A1410]"
                }`}
              >
                Fanoron‑telo
              </span>
              <span
                className={`block text-xs ${
                  isDark ? "text-[#A08060]" : "text-[#7A5C3A]"
                }`}
              >
                Jeu traditionnel 🇲🇬
              </span>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold border ${
                isDark
                  ? "bg-[#2A1F14] border-[#F0A832]/30 text-[#F0A832]"
                  : "bg-[#FFF3E8] border-[#C85A2A]/30 text-[#C85A2A]"
              }`}
            >
              {options.mode}
            </span>
          </div>

          <button
            onClick={onToggleTheme}
            className={`rounded-xl p-2.5 transition border ${
              isDark
                ? "border-[#3D2E22] bg-[#251D17] text-[#A08060]"
                : "border-[#E8D9C0] bg-white text-[#7A5C3A]"
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? <MoonIcon /> : <SunIcon />}
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Left: board area */}
          <div className="space-y-4">
            <div
              className={`rounded-2xl border p-4 shadow-sm ${
                isDark
                  ? "border-[#3D2E22] bg-[#251D17]"
                  : "border-[#E8D9C0] bg-white"
              }`}
            >
              <GameStatus
                snapshot={snapshot}
                players={options.players}
                theme={theme}
              />
            </div>

            <div
              className={`relative overflow-hidden rounded-3xl p-5 shadow-xl border-4 ${
                isDark
                  ? "bg-gradient-to-br from-[#2A201A] to-[#1A1208] border-[#3D2E22] shadow-black/40"
                  : "bg-gradient-to-br from-[#C8944A] to-[#A06830] border-[#8A5020] shadow-[#8A5020]/30"
              }`}
            >
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#F0A832]/40 rounded-tl-sm" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#F0A832]/40 rounded-tr-sm" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#F0A832]/40 rounded-bl-sm" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#F0A832]/40 rounded-br-sm" />
              <Board
                board={snapshot.board}
                selectedCell={selectedCell}
                legalTargets={legalTargets}
                onCellClick={handleCellClick}
                theme={theme}
                winningLine={winningIndices}
              />
            </div>

            <div
              className={`rounded-2xl border p-3 shadow-sm ${
                isDark
                  ? "border-[#3D2E22] bg-[#251D17]"
                  : "border-[#E8D9C0] bg-white"
              }`}
            >
              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <button
                  onClick={undo}
                  disabled={!canUndo}
                  className={`rounded-xl p-2.5 border transition ${
                    canUndo
                      ? isDark
                        ? "border-[#3D2E22] text-[#FDF6E3] hover:bg-[#2A1F14] hover:border-[#C85A2A]/40"
                        : "border-[#E8D9C0] text-[#1A1410] hover:bg-[#FFF3E8] hover:border-[#C85A2A]/40"
                      : "border-transparent cursor-not-allowed opacity-30"
                  }`}
                  aria-label="Annuler"
                  title="Annuler"
                >
                  <UndoIcon />
                </button>
                <button
                  onClick={redo}
                  disabled={!canRedo}
                  className={`rounded-xl p-2.5 border transition ${
                    canRedo
                      ? isDark
                        ? "border-[#3D2E22] text-[#FDF6E3] hover:bg-[#2A1F14] hover:border-[#C85A2A]/40"
                        : "border-[#E8D9C0] text-[#1A1410] hover:bg-[#FFF3E8] hover:border-[#C85A2A]/40"
                      : "border-transparent cursor-not-allowed opacity-30"
                  }`}
                  aria-label="Refaire"
                  title="Refaire"
                >
                  <RedoIcon />
                </button>
                <div
                  className={`mx-1 h-6 w-px ${
                    isDark ? "bg-[#3D2E22]" : "bg-[#E8D9C0]"
                  }`}
                />
                <button
                  onClick={restart}
                  className={`rounded-xl p-2.5 border transition ${
                    isDark
                      ? "border-[#3D2E22] text-[#FDF6E3] hover:bg-[#2A1F14] hover:border-[#C85A2A]/40"
                      : "border-[#E8D9C0] text-[#1A1410] hover:bg-[#FFF3E8] hover:border-[#C85A2A]/40"
                  }`}
                  aria-label="Recommencer"
                  title="Recommencer"
                >
                  <RestartIcon />
                </button>
                <button
                  onClick={onBackHome}
                  className={`ml-auto rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                    isDark
                      ? "border-[#3D2E22] text-[#A08060] hover:bg-[#2A1F14]"
                      : "border-[#E8D9C0] text-[#7A5C3A] hover:bg-[#FFF3E8]"
                  }`}
                >
                  Quitter
                </button>
              </div>
            </div>
          </div>

          {/* Right: history + stats */}
          <div className="space-y-4">
            <div
              className={`rounded-2xl border shadow-sm overflow-hidden ${
                isDark
                  ? "border-[#3D2E22] bg-[#251D17]"
                  : "border-[#E8D9C0] bg-white"
              }`}
            >
              <div
                className={`border-b px-4 py-3 flex items-center gap-2 ${
                  isDark ? "border-[#3D2E22]" : "border-[#E8D9C0]"
                }`}
              >
                <span
                  className={`h-3.5 w-1 rounded-full block ${
                    isDark ? "bg-[#F0A832]" : "bg-[#C85A2A]"
                  }`}
                />
                <h3
                  className={`text-xs font-bold uppercase tracking-widest ${
                    isDark ? "text-[#A08060]" : "text-[#7A5C3A]"
                  }`}
                >
                  Tantara — Historique
                </h3>
              </div>
              <div className="max-h-[280px] overflow-y-auto p-3">
                <MoveHistory moves={snapshot.moveHistory} theme={theme} />
              </div>
            </div>

            <div
              className={`rounded-2xl border shadow-sm overflow-hidden ${
                isDark
                  ? "border-[#3D2E22] bg-[#251D17]"
                  : "border-[#E8D9C0] bg-white"
              }`}
            >
              <div
                className={`border-b px-4 py-3 flex items-center gap-2 ${
                  isDark ? "border-[#3D2E22]" : "border-[#E8D9C0]"
                }`}
              >
                <span
                  className={`h-3.5 w-1 rounded-full block ${
                    isDark ? "bg-[#4DB87A]" : "bg-[#2E7D4F]"
                  }`}
                />
                <h3
                  className={`text-xs font-bold uppercase tracking-widest ${
                    isDark ? "text-[#A08060]" : "text-[#7A5C3A]"
                  }`}
                >
                  Statistiques
                </h3>
              </div>
              <div className="p-3">
                <StatsPanel stats={stats} theme={theme} />
              </div>
            </div>

            <div
              className={`rounded-2xl border px-4 py-3 text-sm shadow-sm ${
                isDark
                  ? "border-[#3D2E22] bg-[#251D17] text-[#A08060]"
                  : "border-[#E8D9C0] bg-white text-[#7A5C3A]"
              }`}
            >
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                <span>
                  <span className="font-semibold">Mode</span>{" "}
                  <span
                    className={`font-bold ${
                      isDark ? "text-[#FDF6E3]" : "text-[#1A1410]"
                    }`}
                  >
                    {options.mode}
                  </span>
                </span>
                <span className={isDark ? "text-[#3D2E22]" : "text-[#E8D9C0]"}>
                  ·
                </span>
                <span>
                  <span className="font-semibold">Délai IA</span>{" "}
                  <span
                    className={`font-bold ${
                      isDark ? "text-[#FDF6E3]" : "text-[#1A1410]"
                    }`}
                  >
                    {options.aiVsAiDelayMs}ms
                  </span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-0 overflow-hidden rounded-full h-1 opacity-60">
              <div className="w-1/3 bg-white h-full" />
              <div className="w-1/3 bg-[#FC3D32] h-full" />
              <div className="w-1/3 bg-[#007E3A] h-full" />
            </div>
          </div>
        </div>
      </div>

      {/* ===== VICTORY MODAL with Madagascar Landscape ===== */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div
            className={`relative max-w-sm w-full mx-4 rounded-3xl shadow-2xl overflow-hidden border ${
              isDark
                ? `border-[#3D2E22] ${winner.glow}`
                : `border-[#E8D9C0] ${winner.glow}`
            }`}
          >
            {/* Landscape background */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <MadagascarLandscape />
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <div
                className={`bg-gradient-to-br ${winner.gradient} px-8 pt-8 pb-6 text-center text-white opacity-95`}
              >
                <span className="text-5xl block mb-3">{winner.emoji}</span>
                <h2 className="text-xl font-black tracking-tight">
                  {winner.label}
                </h2>
              </div>

              <div
                className={`px-8 py-6 rounded-b-3xl ${
                  isDark
                    ? "bg-[#251D17] bg-opacity-95"
                    : "bg-white bg-opacity-95"
                }`}
              >
                <div className="text-center space-y-2">
                  <p
                    className={`text-base font-bold ${
                      isDark ? "text-[#FDF6E3]" : "text-[#1A1410]"
                    }`}
                  >
                    Partie terminée en{" "}
                    <span
                      className={isDark ? "text-[#F0A832]" : "text-[#C85A2A]"}
                    >
                      {snapshot.moveHistory.length}
                    </span>{" "}
                    coups
                  </p>
                  <p
                    className={`text-sm ${
                      isDark ? "text-[#A08060]" : "text-[#7A5C3A]"
                    }`}
                  >
                    {snapshot.winner
                      ? `Le joueur ${snapshot.winner} remporte la victoire !`
                      : "Vondrona mitovy — Match nul."}
                  </p>
                </div>

                <div className="my-5 flex items-center gap-0 overflow-hidden rounded-full h-1">
                  <div className="w-1/3 bg-white border border-[#E8D9C0] h-full" />
                  <div className="w-1/3 bg-[#FC3D32] h-full" />
                  <div className="w-1/3 bg-[#007E3A] h-full" />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={handleRestartFromModal}
                    className={`flex-1 rounded-2xl px-5 py-3 font-black text-sm text-white transition hover:brightness-110 hover:shadow-lg active:scale-95 ${winner.btn}`}
                  >
                    🔄 Rejouer
                  </button>
                  <button
                    onClick={handleBackHomeFromModal}
                    className={`flex-1 rounded-2xl border-2 px-5 py-3 font-bold text-sm transition active:scale-95 ${
                      isDark
                        ? "border-[#3D2E22] text-[#FDF6E3] hover:bg-[#2A1F14]"
                        : "border-[#E8D9C0] text-[#1A1410] hover:bg-[#FFF3E8]"
                    }`}
                  >
                    🏠 Accueil
                  </button>
                </div>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={handleBackHomeFromModal}
              className="absolute right-3 top-3 rounded-full p-1.5 text-white/70 hover:text-white hover:bg-white/20 transition z-20"
              aria-label="Fermer"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
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
