import { Metadata, Viewport } from 'next'
import { Zen_Kurenaido } from 'next/font/google'
import '@/app/[lang]/globals.css'
import React from 'react'
import { GoogleAnalytics } from '@/app/components/thirdparty/GoogleAnalytics'
import { LanguageProvider } from '@/i18n/client'

// 2026-11-24：静的な書き出し（Cloudflare Pages）のため、この言語ごとの layout を一番上の layout にした。
// <html lang> を、要求の見出しを読まずに、アドレスの言語から決められる。

const SITE_URL = 'https://portfolio.personalcast.net'
const SITE_NAME = "Takumi's Portfolio"
const DESCRIPTION: Record<string, string> = {
  ja: '髙須賀匠のポートフォリオサイト',
  en: 'Portfolio site of Takumi Takasuka',
}

const zenKurenaido = Zen_Kurenaido({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-zenKurenaido',
})

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
    'Full-Stack Engineer / Data Scientist / Intelligent Information Science Researcher / Deep Tech Entrepreneur',
  sameAs: [
    'https://github.com/takumi0616',
    'https://zenn.dev/takumi0616',
    'https://twitter.com/takumi79977718',
    'https://www.instagram.com/takumin0616t/',
  ],
}

// 書き出す言語の一覧。ここに無い言語のアドレスは 404 にする。
export function generateStaticParams() {
  return [{ lang: 'ja' }, { lang: 'en' }]
}
export const dynamicParams = false

// 言語ごとの canonical と hreflang（多言語）を付与して SEO を最適化する。
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const description = DESCRIPTION[lang] ?? DESCRIPTION.ja
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description,
    applicationName: SITE_NAME,
    authors: [{ name: '髙須賀匠 (Takasuka Takumi)', url: SITE_URL }],
    creator: '髙須賀匠 (Takasuka Takumi)',
    keywords: [
      '髙須賀匠',
      'Takasuka Takumi',
      'ポートフォリオ',
      'Portfolio',
      'Full-Stack Engineer',
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
    alternates: {
      canonical: `/${lang}`,
      languages: {
        ja: '/ja',
        en: '/en',
        'x-default': '/ja',
      },
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title: SITE_NAME,
      description,
      url: `/${lang}`,
      locale: lang === 'en' ? 'en_US' : 'ja_JP',
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
      description,
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
}

// Next.js 15 以降、動的セグメントの params は Promise で渡されるため await して取り出す。
export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return (
    // 一部のブラウザ拡張は hydration 前に <html> へ属性を注入する。
    // その要素自身の属性差分のみ警告を抑制する（子要素の不整合は検出されたまま）。
    <html
      lang={lang}
      className={`${zenKurenaido.variable}`}
      suppressHydrationWarning
    >
      <head>
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={'font-zenKurenaido'}>
        <LanguageProvider initialLanguage={lang}>{children}</LanguageProvider>
      </body>
    </html>
  )
}
