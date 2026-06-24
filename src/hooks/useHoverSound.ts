import { useCallback, useRef, useEffect } from "react";

export const useHoverSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/click.wav");
    audioRef.current.volume = 0.3;
  }, []);

  return useCallback(() => {
    if (audioRef.current) {
      const clone = audioRef.current.cloneNode() as HTMLAudioElement;
      clone.volume = 0.3;
      clone.play().catch(() => {});
    }
  }, []);
};
