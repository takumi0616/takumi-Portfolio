'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import * as i18next from 'i18next'
import {
  initReactI18next,
  useTranslation as useTranslationOrigin,
} from 'react-i18next'
import ja from './locales/ja/translation.json'
import en from './locales/en/translation.json'
import { getOptions } from './settings'

// 翻訳は 2 つの言語とも最初から持ち、同期で初期化する（2026-11-10）。
// 前は言語ごとの JSON を後から読み込み、言語の切り替えを useEffect（ブラウザの中だけ）で行っていたため、
// サーバーが返す HTML は /en でも日本語だった（JavaScript を動かさない検索や共有のプレビューでは日本語に見えた）。
i18next.use(initReactI18next).init({
  ...getOptions(),
  resources: { ja: { translation: ja }, en: { translation: en } },
  initImmediate: false,
})

export function useTranslation(lang: string) {
  // lng を渡すと、そのページの言語で文を引く（サーバーでの描画も、ブラウザでの最初の描画も同じ言語になる）。
  const { t, i18n } = useTranslationOrigin('translation', { lng: lang })

  useEffect(() => {
    if (lang !== i18n.resolvedLanguage) {
      i18n.changeLanguage(lang)
    }
  }, [lang, i18n])

  return { t, i18n }
}

interface LanguageContextType {
  language: string
  setLanguage: (language: string) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
)

interface LanguageProviderProps {
  children: ReactNode
  initialLanguage: string
}

export const LanguageProvider = ({
  children,
  initialLanguage,
}: LanguageProviderProps) => {
  const [language, setLanguage] = useState<string>(initialLanguage)

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
