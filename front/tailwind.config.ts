import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        portrait: { raw: '(min-aspect-ratio: 1/1)' },
      },
      // カスタムフォントの設定
      fontFamily: {
        zenKurenaido: ['var(--font-zenKurenaido)'],
      },
    },
  },
  plugins: [],
};

export default config;
