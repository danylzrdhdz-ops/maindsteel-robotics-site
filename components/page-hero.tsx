import Image from 'next/image'

export function PageHero({
  title,
  subtitle,
  image,
  alt,
  underline = false,
  size = 'md',
}: {
  title: string
  subtitle?: string
  image: string
  alt: string
  underline?: boolean
  size?: 'sm' | 'md'
}) {
  return (
    <section
      className={
        'relative flex items-center justify-center overflow-hidden ' +
        (size === 'sm' ? 'h-48 md:h-56' : 'h-56 md:h-72')
      }
    >
      <Image
        src={image || '/placeholder.svg'}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-navy-deep/35" />
      <div className="relative flex flex-col items-center px-6 text-center">
        <h1 className="text-3xl text-balance text-white drop-shadow-md md:text-5xl">
          {title}
        </h1>
        {underline && <span className="mt-3 h-1 w-full max-w-[26rem] bg-brick md:w-[34rem]" />}
        {subtitle && (
          <p className="mt-3 text-sm font-bold text-white drop-shadow md:text-base">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
