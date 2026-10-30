import Image from "next/image";

export function Clients() {
  return (
    <section className="relative overflow-hidden bg-white py-10 md:py-14">
      <div className="relative mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <div className="flex justify-center">
          <Image
            src="/images/nuestros-clientes.webp"
            alt="Nuestros clientes"
            width={1100}
            height={200}
            className="h-auto w-full max-w-[1100px]"
            sizes="(min-width: 1024px) 1100px, 90vw"
          />
        </div>
      </div>
    </section>
  );
}
