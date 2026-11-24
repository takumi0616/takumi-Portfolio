// "/" だけで動く。ブラウザの言語で /ja か /en へ送る（今の proxy.ts の代わり。2026-11-20）
const LANGS = ['ja', 'en']
function pick(header) {
  const items = (header || '')
    .split(',')
    .map((part, i) => {
      const [tag, ...params] = part.trim().split(';')
      const qp = params.find((p) => p.trim().startsWith('q='))
      const q = qp ? parseFloat(qp.trim().slice(2)) : 1
      return { tag: tag.toLowerCase(), q: isNaN(q) ? 0 : q, i }
    })
    .filter((x) => x.tag && x.q > 0)
  items.sort((a, b) => b.q - a.q || a.i - b.i)
  for (const it of items) {
    const base = it.tag.split('-')[0]
    if (LANGS.includes(base)) return base
  }
  return 'ja'
}
export function onRequest({ request }) {
  const url = new URL(request.url)
  return Response.redirect(
    new URL(
      '/' + pick(request.headers.get('accept-language')) + url.search,
      url,
    ),
    307,
  )
}
