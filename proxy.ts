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
    if (preferredLanguage !== defaultLanguage) {
      return NextResponse.redirect(
        new URL(`/${preferredLanguage}${pathname}`, request.url),
      )
    } else {
      // 既定言語へリライトする際、ルートレイアウトが <html lang> を解決できるよう
      // 現在のロケールをリクエストヘッダーで引き渡す。
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('x-locale', defaultLanguage)
      return NextResponse.rewrite(
        new URL(`/${defaultLanguage}${pathname}`, request.url),
        { request: { headers: requestHeaders } },
      )
    }
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
