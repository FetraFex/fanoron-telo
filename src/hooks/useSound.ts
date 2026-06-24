import { useCallback, useRef, useEffect } from "react";

export const useSound = (src: string, volume = 0.3) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(src);
    audioRef.current.volume = volume;
  }, [src, volume]);

  return useCallback(() => {
    if (audioRef.current) {
      const clone = audioRef.current.cloneNode() as HTMLAudioElement;
      clone.volume = volume;
      clone.play().catch(() => {});
    }
  }, [volume]);
};
