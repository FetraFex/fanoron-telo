import type { GameStats } from "../services/statsService";

interface StatsPanelProps {
  stats: GameStats;
}

export const StatsPanel = ({ stats }: StatsPanelProps) => (
  <section className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
    <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700 dark:text-slate-200">Statistiques</h3>
    <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
      <div className="rounded-lg bg-slate-100 px-3 py-2 dark:bg-slate-800">Parties: {stats.played}</div>
      <div className="rounded-lg bg-slate-100 px-3 py-2 dark:bg-slate-800">Victoires X: {stats.xWins}</div>
      <div className="rounded-lg bg-slate-100 px-3 py-2 dark:bg-slate-800">Victoires O: {stats.oWins}</div>
      <div className="rounded-lg bg-slate-100 px-3 py-2 dark:bg-slate-800">Nuls: {stats.draws}</div>
    </div>
  </section>
);
