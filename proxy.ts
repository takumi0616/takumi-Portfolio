import { NextRequest, NextResponse } from 'next/server'
import Negotiator from 'negotiator'
import { defaultLanguage, availableLanguages } from './i18n/settings'

const getNegotiatedLanguage = (
  headers: Negotiator.Headers,
): string | undefined => {
  return new Negotiator({ headers }).language([...availableLanguages])
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon\\.ico|favicon\\.svg|robots\\.txt|sitemap\\.xml|.*\\.[^/]+$).*)',
  ],
}

// Next.js 16 で middleware は proxy に名称変更された（言語ネゴシエーション用）。
export default function proxy(request: NextRequest) {
  const headers = {
    'accept-language': request.headers.get('accept-language') ?? '',
  }
  const preferredLanguage = getNegotiatedLanguage(headers) || defaultLanguage
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = availableLanguages.every(
    (lang) => !pathname.startsWith(`/${lang}/`) && pathname !== `/${lang}`,
  )

  if (pathnameIsMissingLocale) {
    // ロケール無しは希望言語（無ければ既定言語）付きパスへ **リダイレクト** する。
    // rewrite はリバースプロキシ(cloudflared)経由だと x-forwarded-proto:https により
    // https://localhost への外部fetch化→TLSエラー(500)になるため使わない。redirect は内部fetchが
    // 無いので安全。Location の公開オリジンは cloudflared の httpHostHeader（公開ドメイン）で正しくなる。
    return NextResponse.redirect(
      new URL(`/${preferredLanguage}${pathname}${request.nextUrl.search}`, request.url),
    )
  }

  // パスからロケールを判定し、ルートレイアウトへ引き渡す。
  const currentLocale =
    availableLanguages.find(
      (lang) => pathname === `/${lang}` || pathname.startsWith(`/${lang}/`),
    ) ?? defaultLanguage
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-locale', currentLocale)

  return NextResponse.next({ request: { headers: requestHeaders } })
}
