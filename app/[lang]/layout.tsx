import { Metadata } from 'next'
import { Zen_Kurenaido } from 'next/font/google'
import { dir } from 'i18next'
import '@/app/[lang]/globals.css'
import React from 'react'
import { GoogleAnalytics } from '@/app/components/thirdparty/GoogleAnalytics'
import { LanguageProvider } from '@/i18n/client'

const zenKurenaido = Zen_Kurenaido({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-zenKurenaido',
})

export const metadata: Metadata = {
  title: "Takumi's Portfolio",
  description: '髙須賀匠のポートフォリオサイト',
}

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <html lang={lang} dir={dir(lang)} className={`${zenKurenaido.variable}`}>
      <head>
        <GoogleAnalytics />
        <meta name="theme-color" content="#c9d6df" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={'font-zenKurenaido'}>
        <LanguageProvider initialLanguage={lang}>{children}</LanguageProvider>
      </body>
    </html>
  )
}
