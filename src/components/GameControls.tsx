interface GameControlsProps {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onRestart: () => void;
  onBackHome: () => void;
}

const baseButton =
  "flex items-center gap-2 rounded-xl border border-panel-border bg-panel px-3.5 py-2 text-sm font-semibold text-slate-700 transition duration-200 hover:bg-panel-soft disabled:cursor-not-allowed disabled:opacity-40";

export const GameControls = ({ canUndo, canRedo, onUndo, onRedo, onRestart, onBackHome }: GameControlsProps) => (
  <div className="flex flex-wrap gap-2">
    <button type="button" onClick={onRestart} className={baseButton}>
      <span aria-hidden>↻</span> Rejouer
    </button>
    <button type="button" onClick={onUndo} disabled={!canUndo} className={baseButton}>
      <span aria-hidden>↩</span> Annuler
    </button>
    <button type="button" onClick={onRedo} disabled={!canRedo} className={baseButton}>
      <span aria-hidden>↪</span> Refaire
    </button>
    <button
      type="button"
      onClick={onBackHome}
      className="ml-auto flex items-center gap-2 rounded-xl border border-red-300 bg-red-50 px-3.5 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
    >
      Abandonner
    </button>
  </div>
);
