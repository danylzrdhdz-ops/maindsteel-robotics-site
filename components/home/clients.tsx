const CLIENTS = ['MARELLI', 'IZAWA', 'TACHI-S MÉXICO', 'COMPAS', 'GESTAMP']

export function Clients({ dict }: { dict: { title: string } }) {
  return (
    <section className="bg-brick py-16">
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-10">
        <h2 className="text-center text-2xl text-white md:text-3xl">
          {dict.title}
        </h2>
        <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-8">
          {CLIENTS.map((name) => (
            <li
              key={name}
              className="text-lg font-extrabold tracking-[0.08em] text-white/90 md:text-xl"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
