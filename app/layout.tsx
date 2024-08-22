import type { Metadata } from 'next'
import { Zen_Kurenaido } from 'next/font/google'
import '@/globals.css'
import React from 'react'
import { GoogleAnalytics } from '@/components/thirdparty/GoogleAnalytics'

const zenKurenaido = Zen_Kurenaido({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-zenKurenaido',
})

export const metadata: Metadata = {
  title: "takumi's Portfolio",
  description:
    '髙須賀匠のポートフォリオサイト。フロントエンジニア/データエンジニア/データサイエンティスト、長岡技術科学大学 工学部 情報経営システム工学課程 4年 在学、機械学習理論研究室所属',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={`${zenKurenaido.variable}`}>
      <head>
        <GoogleAnalytics />
        <meta name="theme-color" content="#c9d6df" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={'font-zenKurenaido'}>{children}</body>
    </html>
  )
}
