type StatDict = { value: string; label: string }

export function StatsBar({ dict }: { dict: StatDict[] }) {
  return (
    <section aria-label="Cifras de Maindsteel Robotics" className="bg-navy">
      <ul className="mx-auto grid w-full max-w-[1200px] gap-8 px-6 py-12 text-center sm:grid-cols-3 md:px-10">
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
  )
}

