"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPosts } from "@/lib/data";
import { localePath } from "@/lib/i18n";

export function Portfolio({
  dict,
  lang = "es",
}: {
  dict: any;
  lang?: "es" | "en";
}) {
  const filtersEs = ["TODOS", "RECIENTES", "ANTERIORES"] as const;
  const filtersEn = ["ALL", "RECENT", "OLDER"] as const;
  const filters = lang === "en" ? filtersEn : filtersEs;
  const [active, setActive] = useState<(typeof filters)[number]>(
    lang === "en" ? "ALL" : "TODOS",
  );

  const posts = getPosts(lang);

  const visible = posts.filter((post) => {
    if (active === "RECIENTES" || active === "RECENT") return post.recent;
    if (active === "ANTERIORES" || active === "OLDER") return !post.recent;
    return true;
  });

  return (
    <section className="relative overflow-hidden bg-navy py-14 md:py-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute -left-24 top-10 h-56 w-56 rounded-full bg-brick/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/70">
              <span className="size-1 rounded-full bg-brick" aria-hidden="true" />
              {dict.title}
            </span>
            <h2 className="mt-4 text-2xl text-balance text-white md:text-3xl">
              {dict.title}
            </h2>
            <span className="mt-4 block h-1 w-24 bg-brick" />
          </div>
          <div className="flex flex-wrap gap-4">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                aria-pressed={active === filter}
                className={
                  "border px-6 py-2.5 text-xs font-bold tracking-wide transition-colors " +
                  (active === filter
                    ? "border-brick bg-brick text-white"
                    : "border-white/70 text-white hover:bg-white/10")
                }
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {visible.map((post, index) => (
              <article
                key={post.slug}
                className={
                  "group relative flex min-h-[20rem] flex-col justify-end overflow-hidden rounded-sm ring-1 ring-white/10 shadow-[0_40px_80px_-60px_rgba(0,0,0,0.9)] " +
                  (post.featured ? "md:min-h-[26rem]" : "") +
                  (index === 0 ? " md:min-h-[19rem]" : "")
                }
              >
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  sizes="(min-width: 768px) 45vw, 90vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  quality={80}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/70 to-transparent" />
                <div className="relative flex flex-col items-start gap-3 p-6 md:p-8">
                  <h3 className="text-lg text-balance text-white md:text-2xl">
                    {post.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-white/85 md:text-sm">
                    {post.excerpt}
                  </p>
                  <Link
                    href={localePath(lang, `/blog/${post.slug}`)}
                    className="mt-2 rounded-full border border-white/80 px-5 py-2 text-xs font-bold tracking-wide text-white transition-colors hover:bg-white hover:text-navy-deep"
                  >
                    {dict.readMore}
                  </Link>
                </div>
              </article>
          ))}
        </div>
      </div>
    </section>
  );
}
