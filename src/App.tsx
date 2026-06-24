import { useState } from "react";
import { useTheme } from "./hooks/useTheme";
import { GamePage } from "./pages/GamePage";
import { MainMenu } from "./components/main-menu";
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

  if (!inGame) {
    return (
      <MainMenu
        onStart={(newOptions) => {
          setOptions(newOptions);
          setInGame(true);
        }}
      />
    );
  }

  return (
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
  );
};

export default App;
