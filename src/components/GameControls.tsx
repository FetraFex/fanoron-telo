interface GameControlsProps {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onRestart: () => void;
  onBackHome: () => void;
}

const baseButton =
  "rounded-xl px-4 py-2 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-45";

export const GameControls = ({ canUndo, canRedo, onUndo, onRedo, onRestart, onBackHome }: GameControlsProps) => (
  <div className="flex flex-wrap gap-2">
    <button type="button" onClick={onUndo} disabled={!canUndo} className={`${baseButton} bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-100`}>
      Undo
    </button>
    <button type="button" onClick={onRedo} disabled={!canRedo} className={`${baseButton} bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-100`}>
      Redo
    </button>
    <button type="button" onClick={onRestart} className={`${baseButton} bg-emerald-500 text-white hover:bg-emerald-600`}>
      Rejouer
    </button>
    <button type="button" onClick={onBackHome} className={`${baseButton} bg-accent text-white hover:bg-sky-600`}>
      Accueil
    </button>
  </div>
);
