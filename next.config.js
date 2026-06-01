/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== 'production'

// 開発時は Next.js / React Refresh が eval を使用するため 'unsafe-eval' を許可するが、
// 本番では不要なため除外して XSS の攻撃面を縮小する。
const scriptSrc = [
  "script-src 'self' 'unsafe-inline'",
  isDev ? "'unsafe-eval'" : '',
  'https://www.googletagmanager.com',
  'https://www.google-analytics.com',
]
  .filter(Boolean)
  .join(' ')

const contentSecurityPolicy = [
  "default-src 'self'",
  scriptSrc,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https: blob:",
  "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://vitals.vercel-insights.com",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  'upgrade-insecure-requests',
].join('; ')

const nextConfig = {
  // 本番でソースコードを公開しないようソースマップを無効化する。
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  // next/image で AVIF/WebP を優先配信し転送量を削減する。
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: contentSecurityPolicy,
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
