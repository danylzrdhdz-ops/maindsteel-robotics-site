import Image from "next/image";

export function Clients({ dict }: { dict: { title: string } }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brick to-brick/95 py-2 md:py-3">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
      <div className="relative mx-auto w-full max-w-[1100px] px-6 md:px-10">
        <div className="flex flex-col items-center text-center">
          <h2 className="mt-3 text-2xl text-white md:mt-4 md:text-4xl">{dict.title}</h2>
        </div>
        <div className="mt-1 flex justify-center md:mt-1">
          <Image
            src="/images/logotipos-industriales.png"
            alt="Clientes industriales"
            width={1400}
            height={220}
            className="h-auto w-full max-w-[980px]"
            sizes="(min-width: 1024px) 980px, 90vw"
            quality={95}
          />
        </div>
      </div>
    </section>
  );
}
