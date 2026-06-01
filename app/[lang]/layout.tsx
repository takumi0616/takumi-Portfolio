import { Metadata } from 'next'
import { LanguageProvider } from '@/i18n/client'

// 言語ごとの canonical と hreflang（多言語）を付与して SEO を最適化する。
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  return {
    alternates: {
      canonical: `/${lang}`,
      languages: {
        ja: '/ja',
        en: '/en',
        'x-default': '/ja',
      },
    },
    openGraph: {
      locale: lang === 'en' ? 'en_US' : 'ja_JP',
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
