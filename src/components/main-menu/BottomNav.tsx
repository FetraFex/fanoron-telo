

function MusicOffIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

function MusicOnIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}

interface BottomNavProps {
  muted: boolean;
  onToggleMute: () => void;
}

export const BottomNav = ({ muted, onToggleMute }: BottomNavProps) => {
  return (
    <nav className="mt-auto flex items-center py-2 text-[11px] uppercase tracking-[0.1em] text-fanorona-muted sm:text-xs">
      <button
        type="button"
        onClick={onToggleMute}
        className="flex items-center gap-1.5 p-2 transition-colors duration-150 hover:text-fanorona-brown"
        aria-label={muted ? "Activer la musique" : "Couper la musique"}
      >
        {muted ? <MusicOffIcon /> : <MusicOnIcon />}
        MUSIQUE
      </button>
    </nav>
  );
};
