import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // カスタムフォントの設定
      fontFamily: {
        sans: ['Zen Kurenaido', 'sans-serif'],
      },
      // カスタムカラーの設定
      colors: {
        white: '#FFFFFF',
        black: '#1F2022',
        gray: '#E1E1E1',
        'gray-dark': '#4F626D',
        'gray-light': '#C6D7E0',
        'off-white': '#F7F9FD',
      },
      // カスタム背景イメージの設定
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config
