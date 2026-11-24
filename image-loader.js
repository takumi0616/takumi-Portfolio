// 静的な書き出し（Cloudflare Pages）で next/image が使う画像の道（2026-11-24）。
// サーバーで縮める仕組みが無いので、書き出す前に scripts/gen-images.mjs が
// public/_img/ に AVIF の幅違いを作っておき、ここでその道を返す。
import WIDTHS from './image-widths.json'

export default function imageLoader({ src, width }) {
  if (!src.startsWith('/') || src.endsWith('.svg')) return src
  const w = WIDTHS.find((x) => x >= width) ?? WIDTHS[WIDTHS.length - 1]
  return `/_img${src.replace(/\.[^./]+$/, '')}-${w}.avif`
}
