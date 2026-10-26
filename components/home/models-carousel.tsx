"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getProducts } from "@/lib/data";
import { localePath } from "@/lib/i18n";

type ModelsDict = { title: string; moreInfo: string };

export function ModelsCarousel({
  dict,
  lang = "es",
}: {
  dict: ModelsDict;
  lang?: "es" | "en";
}) {
  const trackRef = useRef<HTMLUListElement>(null);

  const products = getProducts(lang);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section className="bg-white py-16">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <h2 className="text-center text-2xl text-card-foreground md:text-3xl">
          {dict.title}
        </h2>

        <div className="relative mt-10 flex items-center gap-4">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Ver modelos anteriores"
            className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-card-foreground shadow-[0_2px_12px_rgba(0,0,0,0.18)] md:flex"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>

          <ul
            ref={trackRef}
            className="flex flex-1 snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {products.map((product) => (
              <li
                key={product.slug}
                className="w-[16rem] shrink-0 snap-start bg-white shadow-[0_2px_14px_rgba(0,0,0,0.14)]"
              >
                <div className="p-4">
                  <div className="relative aspect-4/3 overflow-hidden bg-muted/20">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 70vw, 260px"
                      className="object-cover"
                      quality={80}
                    />
                  </div>
                  <p className="mt-5 text-center text-sm text-card-foreground">
                    {product.name}
                  </p>
                  <Link
                    href={localePath(lang, `/productos/${product.slug}`)}
                    className="mx-auto mt-5 block w-max border-2 border-brick px-4 py-2 text-xs font-bold text-card-foreground transition-colors hover:bg-brick hover:text-white"
                  >
                    {dict.moreInfo}
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Ver más modelos"
            className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-card-foreground shadow-[0_2px_12px_rgba(0,0,0,0.18)] md:flex"
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
