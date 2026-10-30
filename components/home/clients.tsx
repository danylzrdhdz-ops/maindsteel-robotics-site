import Image from "next/image";

export function Clients() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brick to-brick/95 py-12 md:py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
      <div className="relative mx-auto w-full max-w-[1100px] px-6 md:px-10">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl text-white md:text-3xl">Nuestros clientes</h2>
        </div>
        <div className="mt-8 flex justify-center md:mt-10">
          <Image
            src="/images/nuestros-clientes.webp"
            alt="Nuestros clientes"
            width={1100}
            height={200}
            className="h-auto w-full max-w-[1050px] drop-shadow-[0_4px_30px_rgba(255,255,255,0.15)]"
            sizes="(min-width: 1024px) 1050px, 90vw"
          />
        </div>
      </div>
    </section>
  );
}
