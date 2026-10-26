import Image from "next/image";
import QRCode from "qrcode";

export async function ArBanner() {
  const qrSvg = await QRCode.toString("https://maindsteel.mx/ar", {
    type: "svg",
    margin: 0,
    color: { dark: "#0b1c44", light: "#ffffff" },
  });

  return (
    <section className="relative overflow-hidden">
      <Image
        src="/images/warehouse-ar.png"
        alt="Interior de una nave industrial vacía lista para instalación de robots"
        fill
        sizes="100vw"
        className=""

        style={{ objectFit: "contain" }}
        quality={80}
      />
      <div className="absolute inset-0 bg-navy-deep/55" />

      <div className="relative mx-auto w-full max-w-[1100px] px-6 py-16 md:px-10 md:py-20">
        <div className="rounded-3xl border-[10px] border-white/15 bg-navy-deep/85 p-6 md:p-10">
          <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
            <div className="relative h-64 w-40 shrink-0 overflow-hidden rounded-2xl border border-white/20 md:h-80 md:w-52">
              <Image
                src="/images/ar-robot-phone.png"
                alt="Teléfono mostrando un robot industrial en realidad aumentada"
                fill
                sizes="200px"
                className=""

                style={{ objectFit: "contain" }}
                quality={80}
              />
            </div>

            <div className="flex flex-1 flex-col items-center gap-6 text-center md:items-start md:text-left">
              <h2 className="text-xl leading-snug text-balance text-white md:text-3xl">
                VISUALICE SU LAYOUT EN TIEMPO REAL CON REALIDAD AUMENTADA
              </h2>
              <div
                className="h-32 w-32 bg-white p-2 md:h-40 md:w-40"
                aria-label="Código QR para abrir la experiencia de realidad aumentada"
                role="img"
                dangerouslySetInnerHTML={{ __html: qrSvg }}
              />
              <p className="text-sm font-bold tracking-wide text-white md:text-base">
                ESCANEE PARA PROBAR EN PLANTA 1:1
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
