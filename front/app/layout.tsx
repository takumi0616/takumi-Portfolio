import type { Metadata } from 'next';
import { Zen_Kurenaido } from 'next/font/google';
import './globals.css';
import React from 'react';

const zenKurenaido = Zen_Kurenaido({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-zenKurenaido',
});

export const metadata: Metadata = {
  title: "takumi's Portfolio",
  description:
    '髙須賀匠のポートフォリオサイト。フロントエンジニア/データエンジニア/データサイエンティスト、長岡技術科学大学 工学部 情報経営システム工学課程 3年 在学、機械学習理論研究室所属',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${zenKurenaido.variable}`}>
      <body className={'font-zenKurenaido'}>{children}</body>
    </html>
  );
}
