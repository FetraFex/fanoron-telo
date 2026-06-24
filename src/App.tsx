import { useState } from "react";
import { useTheme } from "./hooks/useTheme";
import { GamePage } from "./pages/GamePage";
import { HomePage } from "./pages/HomePage";
import { readStats, registerFinishedGame } from "./services/statsService";
import type { GameOptions } from "./types/game";

const defaultOptions: GameOptions = {
  mode: "PVAI",
  aiVsAiDelayMs: 420,
  players: { X: { type: "human" }, O: { type: "ai", difficulty: "medium" } }
};

const App = () => {
  const [options, setOptions] = useState<GameOptions>(defaultOptions);
  const [inGame, setInGame] = useState(false);
  const [stats, setStats] = useState(readStats);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#0c1317] flex flex-col items-center justify-center p-4">
      {/* COUCHE 1 : MOTIFS GÉOMÉTRIQUES TRADITIONNELS (EFFET GRAVÉ) */}
      <div 
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M40 0L80 40L40 80L0 40Z' fill='none' stroke='%23ffffff' stroke-width='1.5'/%3E%3Cpath d='M40 15L65 40L40 65L15 40Z' fill='none' stroke='%23ffffff' stroke-width='1' stroke-dasharray='2 2'/%3E%3Cpath d='M0 0L80 80M80 0L0 80' fill='none' stroke='%23ffffff' stroke-width='0.5' stroke-opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px'
        }}
      />
      
      {/* COUCHE 2 : EFFET VIGNETTE (Lueur radiale centrée derrière le jeu) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(24,38,48,0.8)_0%,rgba(5,8,10,1)_85%)] pointer-events-none" />

      {/* COUCHE 3 : INTERFACE DYNAMIQUE */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center">
        {!inGame ? (
          <HomePage
            stats={stats}
            theme={theme}
            onToggleTheme={toggleTheme}
            onStart={(newOptions) => {
              setOptions(newOptions);
              setInGame(true);
            }}
          />
        ) : (
          <GamePage
            options={options}
            stats={stats}
            theme={theme}
            onToggleTheme={toggleTheme}
            onGameFinished={(snapshot) => {
              setStats(registerFinishedGame(snapshot));
            }}
            onBackHome={() => setInGame(false)}
          />
        )}
      </div>
    </div>
  );
};

export default App;