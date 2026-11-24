import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://portfolio.personalcast.net'
  const languages = ['ja', 'en']
  const lastModified = new Date()

  const routes: MetadataRoute.Sitemap = []

  // ルートページ（各言語版）
  languages.forEach((lang) => {
    routes.push({
      url: `${baseUrl}/${lang}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    })
  })

  // デフォルトルート（日本語にリダイレクト）
  routes.push({
    url: baseUrl,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  })

  return routes
}

// 静的な書き出し（Cloudflare Pages）でも作れるように、作る時に 1 回だけ作る。
export const dynamic = 'force-static'
