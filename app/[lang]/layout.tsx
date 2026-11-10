import { Metadata } from 'next'
import { LanguageProvider } from '@/i18n/client'

const SITE_NAME = "Takumi's Portfolio"
const DESCRIPTION: Record<string, string> = {
  ja: '髙須賀匠のポートフォリオサイト',
  en: 'Portfolio site of Takumi Takasuka',
}

// 言語ごとの canonical と hreflang（多言語）を付与して SEO を最適化する。
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const description = DESCRIPTION[lang] ?? DESCRIPTION.ja
  return {
    description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        ja: '/ja',
        en: '/en',
        'x-default': '/ja',
      },
    },
    // 子の layout が openGraph／twitter を返すと、親（app/layout.tsx）のものは丸ごと置き換わる（深い合併ではない）。
    // 画像・サイト名・URL・種別・カードの形式も、ここで書き直す。
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
  return <LanguageProvider initialLanguage={lang}>{children}</LanguageProvider>
}
