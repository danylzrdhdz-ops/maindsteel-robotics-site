type StatDict = { value: string; label: string };

export function StatsBar({ dict }: { dict: StatDict[] }) {
  return (
    <section aria-label="Cifras de Maindsteel Robotics" className="relative overflow-hidden bg-navy">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <ul className="relative mx-auto grid w-full max-w-[1200px] gap-8 px-6 py-12 text-center sm:grid-cols-3 md:px-10">
        {dict.map((stat, i) => (
          <li key={i} className="flex flex-col items-center gap-1">
            <span className="text-4xl font-extrabold text-white md:text-5xl">
              {stat.value}
            </span>
            <span className="text-xs font-semibold tracking-wide text-white/70">
              {stat.label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
