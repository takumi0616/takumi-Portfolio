// 静的な書き出し（out/）に、Cloudflare Pages 用の _headers・_redirects・_routes.json を足す（2026-11-24）。
// 中身は site-rules.js（next.config.js と共通）から作るので、ヘッダーと転送は 1 か所で直せばよい。
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const root = process.cwd()
const out = path.join(root, 'out')
if (!fs.existsSync(out)) {
  console.error(
    'out/ がありません。先に NEXT_OUTPUT=export で書き出してください',
  )
  process.exit(1)
}
const require = createRequire(import.meta.url)
const { securityHeaders, redirects } = require(path.join(root, 'site-rules.js'))
const LANGS = ['ja', 'en']

// _headers：全部の頁に安全のヘッダー、/_next/static は長く持たせる。
const headers = [
  '/*',
  ...securityHeaders(false).map((h) => `  ${h.key}: ${h.value}`),
  '/_next/static/*',
  '  Cache-Control: public, max-age=31536000, immutable',
  '',
].join('\n')
fs.writeFileSync(path.join(out, '_headers'), headers)

// _redirects：'/:lang(ja|en)/…' の形の転送を言語ごとに展開する。
const lines = []
for (const r of redirects) {
  const m = r.source.match(/^\/:lang\(([^)]+)\)(.*)$/)
  if (!m) continue
  for (const lang of m[1].split('|')) {
    const to = r.destination.replace(':lang', lang)
    lines.push(`/${lang}${m[2]} ${to} ${r.permanent ? 308 : 307}`)
  }
}
fs.writeFileSync(path.join(out, '_redirects'), lines.join('\n') + '\n')

// _routes.json：Function（言語の振り分け）を動かす道を「/」と、言語の付かない頁のアドレスだけに絞る。
const include = ['/']
const pagesFile = path.join(root, 'app/config/pages.ts')
if (fs.existsSync(pagesFile)) {
  const src = fs.readFileSync(pagesFile, 'utf8')
  for (const m of src.matchAll(/pages:\s*\[([^\]]*)\]/g)) {
    for (const s of m[1].matchAll(/'([a-z-]+)'/g)) include.push(`/${s[1]}`)
  }
  for (const r of redirects) {
    const m = r.source.match(/^\/:lang\([^)]+\)(\/[a-z-]+)$/)
    if (m && !include.includes(m[1])) include.push(m[1])
  }
}
fs.writeFileSync(
  path.join(out, '_routes.json'),
  JSON.stringify({ version: 1, include, exclude: [] }) + '\n',
)
console.log(
  `pages-files: _headers, _redirects (${lines.length}), _routes.json (${include.length}) — langs ${LANGS.join(',')}`,
)
