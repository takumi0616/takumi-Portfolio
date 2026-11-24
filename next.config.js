/** @type {import('next').NextConfig} */
const { securityHeaders, redirects } = require('./site-rules')

const isDev = process.env.NODE_ENV !== 'production'
// 公開は Cloudflare Pages（2026-11-20 から）。NEXT_OUTPUT=export の時は out/ へ静的に書き出す
// （npm run build:pages）。書き出しでは headers()・redirects() が効かないので、同じ中身を
// scripts/pages-files.mjs が Pages 用の _headers・_redirects に写す。
// 付けない時は、今までどおり next start で動くサーバーとして作る（戻す道）。
const isExport = process.env.NEXT_OUTPUT === 'export'

const nextConfig = {
  ...(isExport ? { output: 'export' } : {}),
  // 本番でソースコードを公開しないようソースマップを無効化する。
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  // 言語ごとの layout を一番上の layout にして <html lang> を合わせるため、
  // どの言語にも当たらないアドレスの 404 は app/global-not-found.tsx が出す。
  experimental: { globalNotFound: true },
  // 書き出しでは、scripts/gen-images.mjs が作った AVIF の幅違いを image-loader.js が選ぶ。
  // サーバーの時は next/image で AVIF/WebP を優先配信し転送量を削減する。
  images: isExport
    ? { loader: 'custom', loaderFile: './image-loader.js' }
    : { formats: ['image/avif', 'image/webp'] },
  ...(isExport
    ? {}
    : {
        async redirects() {
          // 言語の付かない「/」は、サーバーの時は日本語へ（Pages では functions/ が言語で振り分ける）。
          return [
            { source: '/', destination: '/ja', permanent: false },
            ...redirects,
          ]
        },
        async headers() {
          return [{ source: '/(.*)', headers: securityHeaders(isDev) }]
        },
      }),
}

module.exports = nextConfig
