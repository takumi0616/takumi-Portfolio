import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // `portrait:` は Tailwind 組み込みバリアント（@media (orientation: portrait)）を使用する。
      // 以前ここにあった raw 定義は組み込みに上書きされ無効だったため削除した。
      fontFamily: {
        zenKurenaido: ['var(--font-zenKurenaido)'],
      },
      boxShadow: {
        custom: '4px 4px 8px #aaaaaa',
      },
    },
  },
  plugins: [],
}

export default config
