import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://portfolio.personalcast.net/sitemap.xml',
  }
}

// 静的な書き出し（Cloudflare Pages）でも作れるように、作る時に 1 回だけ作る。
export const dynamic = 'force-static'
