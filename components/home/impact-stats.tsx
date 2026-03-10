import type { ImpactStat } from "@/types/content";

type ImpactStatsProps = {
  stats: ImpactStat[];
};

export function ImpactStats({ stats }: ImpactStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <article
          key={stat.label}
          className="animate-rise rounded-2xl border border-brand-100 bg-brand-50 p-5 shadow-card"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <p className="text-4xl font-display text-brand-800">{stat.value}</p>
          <h3 className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-brand-700">{stat.label}</h3>
          <p className="mt-2 text-base text-brand-900/75">{stat.description}</p>
        </article>
      ))}
    </div>
  );
}
