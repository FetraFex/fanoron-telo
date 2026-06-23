import type { GameStats } from "../services/statsService";

interface StatsPanelProps {
  stats: GameStats;
}

const items = (stats: GameStats) => [
  { label: "Parties jouées", value: stats.played, color: "text-slate-800" },
  { label: "Victoires X", value: stats.xWins, color: "text-playerX-soft" },
  { label: "Victoires O", value: stats.oWins, color: "text-playerO-soft" },
  { label: "Nuls", value: stats.draws, color: "text-warn-soft" }
];

export const StatsPanel = ({ stats }: StatsPanelProps) => (
  <section className="shrink-0 rounded-2xl border border-panel-border bg-panel-soft/80 p-4 shadow-card">
    <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">Statistiques</h3>
    <div className="mt-3 grid grid-cols-4 gap-2">
      {items(stats).map((item) => (
        <div key={item.label} className="rounded-xl border border-panel-border bg-panel px-2 py-2.5 text-center">
          <p className={`text-lg font-extrabold ${item.color}`}>{item.value}</p>
          <p className="mt-0.5 text-[10px] uppercase tracking-wide text-slate-400">{item.label}</p>
        </div>
      ))}
    </div>
  </section>
);
