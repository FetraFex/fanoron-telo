import { useRef, useEffect } from "react";

interface BackgroundMusicProps {
  muted: boolean;
}

export const BackgroundMusic = ({ muted }: BackgroundMusicProps) => {
  const ref = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = ref.current;
    if (!audio) return;
    if (muted) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  }, [muted]);

  return <audio ref={ref} src="/background_music.mp3" loop />;
};
