import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Montserrat } from 'next/font/google'
import { cookies } from 'next/headers'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { getDictionary } from '@/lib/dictionary'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: {
    default: 'Maindsteel Robotics | Automatización industrial y robótica',
    template: '%s | Maindsteel Robotics',
  },
  description:
    'Maquinaria y tecnología para un mundo en evolución. Automatización industrial, integración de robots y venta de maquinaria en Aguascalientes, México.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0b1c44',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const lang = cookieStore.get('x-lang')?.value || 'es'
  const dict = await getDictionary(lang)

  return (
    <html lang={lang} className="bg-background">
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <SiteHeader dict={dict.nav} lang={lang} />
        <main>{children}</main>
        <SiteFooter dict={dict.footer} />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
