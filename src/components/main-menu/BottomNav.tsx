const NAV_ITEMS = [
  { id: "classement", label: "CLASSEMENT", icon: <TrophyIcon /> },
  { id: "statistiques", label: "STATISTIQUES", icon: <ChartIcon /> },
  { id: "apropos", label: "À PROPOS", icon: <InfoIcon /> }
];

function TrophyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

interface BottomNavProps {
  onNavigate?: (id: string) => void;
}

export const BottomNav = ({ onNavigate }: BottomNavProps) => {
  return (
    <nav className="mt-auto flex items-center gap-3 text-[11px] uppercase tracking-[0.1em] text-fanorona-muted">
      {NAV_ITEMS.map((item, i) => (
        <span key={item.id} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-fanorona-separator">|</span>}
          <button
            type="button"
            onClick={() => onNavigate?.(item.id)}
            className="flex items-center gap-1.5 transition-colors duration-150 hover:text-fanorona-brown"
          >
            {item.icon}
            {item.label}
          </button>
        </span>
      ))}
    </nav>
  );
};
