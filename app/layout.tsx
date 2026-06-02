import { Metadata, Viewport } from 'next'
import { Zen_Kurenaido } from 'next/font/google'
import { headers } from 'next/headers'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '@/app/[lang]/globals.css'
import React from 'react'
import { GoogleAnalytics } from '@/app/components/thirdparty/GoogleAnalytics'

const SITE_URL = 'https://takumi-portfolio.vercel.app'
const SITE_NAME = "Takumi's Portfolio"
const SITE_DESCRIPTION = '髙須賀匠のポートフォリオサイト'

const zenKurenaido = Zen_Kurenaido({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-zenKurenaido',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: '髙須賀匠 (Takasuka Takumi)', url: SITE_URL }],
  creator: '髙須賀匠 (Takasuka Takumi)',
  keywords: [
    '髙須賀匠',
    'Takasuka Takumi',
    'ポートフォリオ',
    'Portfolio',
    'Front-end Engineer',
    'Data Scientist',
    'Next.js',
    'React',
  ],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: '/screenshot.png',
        width: 1706,
        height: 1348,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ['/screenshot.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#c9d6df',
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Takasuka Takumi',
  alternateName: '髙須賀匠',
  url: SITE_URL,
  image: `${SITE_URL}/screenshot.png`,
  jobTitle:
    'All-Round Engineer / Data Scientist / Intelligent Information Science Researcher / Deep Tech Entrepreneur',
  sameAs: [
    'https://github.com/takumi0616',
    'https://zenn.dev/takumi0616',
    'https://twitter.com/takumi79977718',
    'https://www.instagram.com/takumin0616t/',
  ],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // proxy.ts が付与した x-locale を読み、<html lang> を実際の表示言語に合わせる。
  const headersList = await headers()
  const lang = headersList.get('x-locale') ?? 'ja'

  return (
    <html lang={lang} className={`${zenKurenaido.variable}`}>
      <head>
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={'font-zenKurenaido'}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
