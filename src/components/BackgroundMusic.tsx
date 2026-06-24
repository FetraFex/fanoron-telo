import { useRef, useEffect } from "react";

interface BackgroundMusicProps {
  muted: boolean;
}

export const BackgroundMusic = ({ muted }: BackgroundMusicProps) => {
  const ref = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = ref.current;
    if (!audio) return;

    const play = () => {
      if (audio.paused) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
    };

    const pause = () => { audio.pause(); };

    muted ? pause() : play();

    const resume = () => {
      if (!muted) play();
    };

    document.addEventListener("click", resume, { once: true });
    document.addEventListener("keydown", resume, { once: true });
    document.addEventListener("touchstart", resume, { once: true });

    return () => {
      document.removeEventListener("click", resume);
      document.removeEventListener("keydown", resume);
      document.removeEventListener("touchstart", resume);
    };
  }, [muted]);

  return <audio ref={ref} src="/background_music.mp3" loop />;
};
