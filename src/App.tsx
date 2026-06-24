import { useState } from "react";
import { GamePage } from "./pages/GamePage";
import { MainMenu } from "./components/main-menu";
import { BackgroundMusic } from "./components/BackgroundMusic";
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
  const [muted, setMuted] = useState(false);

  return (
    <>
      <BackgroundMusic muted={muted} />
      {!inGame ? (
        <MainMenu
          onStart={(newOptions) => {
            setOptions(newOptions);
            setInGame(true);
          }}
          muted={muted}
          onToggleMute={() => setMuted((m) => !m)}
        />
      ) : (
        <GamePage
          options={options}
          stats={stats}
          muted={muted}
          onToggleMute={() => setMuted((m) => !m)}
          onGameFinished={(snapshot) => {
            setStats(registerFinishedGame(snapshot));
          }}
          onBackHome={() => setInGame(false)}
        />
      )}
    </>
  );
};

export default App;
