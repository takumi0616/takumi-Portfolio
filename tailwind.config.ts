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
      fontFamily: {
        zenKurenaido: ['var(--font-zenKurenaido)'],
      },
      boxShadow: {
        custom: '4px 4px 8px #aaaaaa',
      },
    },
  },
  plugins: [],
};

export default config;
