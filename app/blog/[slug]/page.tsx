import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { getPosts } from '@/lib/data'
import { articles } from '@/lib/articles'
import { cookies } from 'next/headers'

export function generateStaticParams() {
  const posts = getPosts('es')
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const posts = getPosts('es')
  const post = posts.find((p) => p.slug === slug)
  if (!post) return { title: 'Artículo no encontrado' }
  return { title: post.title, description: post.excerpt }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const cookieStore = await cookies()
  const lang = cookieStore.get('x-lang')?.value === 'en' ? 'en' : 'es'

  const posts = getPosts(lang)
  const post = posts.find((p) => p.slug === slug)
  const blocks = articles[slug]
  if (!post || !blocks) notFound()

  return (
    <article className="bg-white py-10 md:py-14">
      <div className="mx-auto max-w-4xl px-6">
        <h1 className="text-3xl text-balance text-navy-deep md:text-4xl">
          {post.title}
        </h1>

        <div className="relative mt-8 aspect-[16/9] w-full">
          <Image
            src={post.image || '/placeholder.svg'}
            alt={post.title}
            fill
            priority
            sizes="(min-width: 1024px) 56rem, 90vw"
            className="object-cover"
          />
        </div>

        <div className="mt-10 flex flex-col gap-5 text-navy-deep">
          {blocks.map((block, i) => {
            if (block.type === 'lead')
              return (
                <p key={i} className="text-lg font-bold leading-relaxed">
                  {block.text}
                </p>
              )
            if (block.type === 'h2')
              return (
                <h2 key={i} className="mt-4 text-xl md:text-2xl">
                  {block.text}
                </h2>
              )
            if (block.type === 'strong')
              return (
                <p key={i} className="text-sm font-bold leading-relaxed md:text-base">
                  {block.text}
                </p>
              )
            if (block.type === 'ul')
              return (
                <ul key={i} className="ml-6 flex list-disc flex-col gap-2">
                  {block.items.map((item) => (
                    <li key={item} className="text-sm leading-relaxed md:text-base">
                      {item}
                    </li>
                  ))}
                </ul>
              )
            return (
              <p key={i} className="text-sm leading-relaxed md:text-base">
                {block.text}
              </p>
            )
          })}
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/blog"
            className="flex items-center gap-2 border-2 border-navy px-6 py-3 text-sm font-bold text-navy-deep transition-colors hover:bg-navy hover:text-white"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Regresar al blog
          </Link>
          <Link
            href="/contacto"
            className="bg-brick px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brick/90"
          >
            Solicitar asesoría
          </Link>
        </div>
      </div>
    </article>
  )
}
