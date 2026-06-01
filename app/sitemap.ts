import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://takumi-portfolio.vercel.app'
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
