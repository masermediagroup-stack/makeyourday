type Stat = {
  value: string;
  label: string;
};

type StatStripProps = {
  stats: Stat[];
};

export default function StatStrip({ stats }: StatStripProps) {
  return (
    <section aria-labelledby="stat-strip-heading" className="bg-primaryGreen py-12">
      <h2 id="stat-strip-heading" className="sr-only">
        TexasGrounds company stats
      </h2>
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 text-center sm:px-6 md:grid-cols-3 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-5xl tracking-tight text-white md:text-6xl">
              {stat.value}
            </p>
            <p className="mt-2 text-sm uppercase tracking-[0.12em] text-white/80">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
