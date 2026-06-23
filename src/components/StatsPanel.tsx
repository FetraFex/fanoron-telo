import type { GameStats } from "../services/statsService";

interface StatsPanelProps {
  stats: GameStats;
}

export const StatsPanel = ({ stats }: StatsPanelProps) => (
  <section className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 backdrop-blur-sm">
    <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Statistiques globales</h3>
      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
        {stats.played} {stats.played > 1 ? "parties" : "partie"}
      </span>
    </div>
    
    <div className="mt-4 grid grid-cols-3 gap-3 text-center">
      <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-2.5 dark:border-slate-800/60 dark:bg-slate-950/40">
        <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-slate-500">
          <span className="h-2 w-2 rounded-full bg-indigo-500" />
          Victoires X
        </div>
        <p className="mt-1 text-lg font-black text-slate-900 dark:text-slate-100">{stats.xWins}</p>
      </div>

      <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-2.5 dark:border-slate-800/60 dark:bg-slate-950/40">
        <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-slate-500">
          <span className="h-2 w-2 rounded-full bg-rose-500" />
          Victoires O
        </div>
        <p className="mt-1 text-lg font-black text-slate-900 dark:text-slate-100">{stats.oWins}</p>
      </div>

      <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-2.5 dark:border-slate-800/60 dark:bg-slate-950/40">
        <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-slate-500">
          <span className="h-2 w-2 rounded-full bg-slate-400" />
          Égalités
        </div>
        <p className="mt-1 text-lg font-black text-slate-900 dark:text-slate-100">{stats.draws}</p>
      </div>
    </div>
  </section>
);