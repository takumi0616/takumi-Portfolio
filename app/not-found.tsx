import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
      style={{
        backgroundImage: 'linear-gradient(to right, #c9d6df 30%, #fafaff 70%)',
      }}
    >
      <p className="text-7xl font-bold tracking-widest text-[rgb(30,50,93)]">
        404
      </p>
      <h1 className="mt-6 text-2xl text-gray-800">
        お探しのページは見つかりませんでした
      </h1>
      <p className="mt-2 text-gray-600">
        The page you are looking for could not be found.
      </p>
      <Link
        href="/"
        className="mt-8 rounded border border-gray-800 px-6 py-2 text-lg no-underline transition-colors hover:bg-white/40"
      >
        ホームへ戻る / Back to Home
      </Link>
    </main>
  )
}
