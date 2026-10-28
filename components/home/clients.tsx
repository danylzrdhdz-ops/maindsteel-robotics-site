const CLIENTS = ["MARELLI", "IZAWA", "TACHI-S MÉXICO", "COMPAS", "GESTAMP"];

export function Clients({ dict }: { dict: { title: string } }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brick to-brick/95 py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
      <div className="relative mx-auto w-full max-w-[1100px] px-6 md:px-10">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/80">
            <span className="size-1 rounded-full bg-white" aria-hidden="true" />
            {dict.title}
          </span>
          <h2 className="mt-4 text-2xl text-white md:text-3xl">
            {dict.title}
          </h2>
        </div>
        <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {CLIENTS.map((name) => (
            <li
              key={name}
              className="rounded-sm border border-white/15 px-6 py-2 text-lg font-extrabold tracking-[0.12em] text-white/95 shadow-[0_20px_60px_-40px_rgba(255,255,255,0.8)] md:text-xl"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
