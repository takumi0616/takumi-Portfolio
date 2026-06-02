import React, { useState, useEffect } from 'react'
import { IoIosMenu } from 'react-icons/io'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/i18n/client'

const menuItems = [
  { id: 'research', label: 'Research' },
  { id: 'works', label: 'Works' },
  { id: 'awards', label: 'Awards' },
  { id: 'skills', label: 'Skills' },
  { id: 'activity', label: 'Activity' },
  { id: 'contributions', label: 'Contributions' },
  { id: 'contact', label: 'Contact' },
]

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage } = useLanguage()
  const router = useRouter()

  const toggleMenu = () => setIsOpen(!isOpen)

  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isOpen && target.closest('.menu-container') === null) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('click', closeMenu)
      return () => document.removeEventListener('click', closeMenu)
    }
  }, [isOpen])

  const handleClick = (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    sectionId: string,
  ) => {
    event.preventDefault()

    if ('key' in event) {
      if (event.key !== 'Enter' && event.key !== ' ') {
        return
      }
    }

    const section = document.getElementById(sectionId)

    if (section) {
      const offsetTop = section.getBoundingClientRect().top + window.pageYOffset
      const HEADER_HEIGHT = 100
      const scrollToPosition = offsetTop - HEADER_HEIGHT

      window.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth',
      })
    }

    setIsOpen(false)
  }

  const scrollToTop = () => {
    setIsOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLanguageToggle = () => {
    const newLanguage = language === 'ja' ? 'en' : 'ja'
    setLanguage(newLanguage)
    router.push(`/${newLanguage}`)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-transparent p-6">
      <button
        className="ml-8 cursor-pointer text-lg tracking-wider lg:text-3xl portrait:ml-0"
        onClick={scrollToTop}
        aria-label="ページ上部へ戻る"
      >
        Portfolio
      </button>

      <div className="flex items-center">
        <div
          className="mr-6 flex items-center"
          role="group"
          aria-label="言語切り替え"
        >
          <img src="/japan.png" alt="" className="size-8" aria-hidden="true" />
          <label
            htmlFor="language-toggle"
            className="relative mx-3 inline-flex cursor-pointer items-center"
          >
            <span className="sr-only">
              {language === 'ja' ? '英語に切り替える' : 'Switch to Japanese'}
            </span>
            <input
              id="language-toggle"
              type="checkbox"
              checked={language === 'en'}
              onChange={handleLanguageToggle}
              className="sr-only"
              aria-label={
                language === 'ja'
                  ? '言語切り替え: 現在日本語'
                  : 'Language toggle: Currently English'
              }
            />
            <div
              className="h-7 w-14 rounded-full bg-gray-300"
              aria-hidden="true"
            >
              <div
                className={`absolute left-0.5 top-0.5 size-6 rounded-full transition-transform duration-300 ${
                  language === 'en' ? 'translate-x-7 bg-black' : 'bg-black'
                }`}
              ></div>
            </div>
          </label>
          <img src="/us.png" alt="" className="size-8" aria-hidden="true" />
        </div>

        <button
          type="button"
          className="mr-8 flex cursor-pointer items-center bg-transparent p-0 text-5xl leading-none portrait:mr-0"
          onClick={toggleMenu}
          aria-label="メニューを開く"
          aria-expanded={isOpen}
          aria-haspopup="menu"
        >
          <IoIosMenu />
        </button>
      </div>

      <nav
        className={`menu-container absolute right-[36px] top-full mt-2 select-none rounded-lg bg-white p-5 shadow-md transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'invisible opacity-0'
        }`}
        aria-label="ナビゲーションメニュー"
      >
        <ul className="text-lg lg:text-2xl">
          {menuItems.map(({ id, label }) => (
            <li key={id} className="my-1 rounded-md hover:bg-gray-200">
              <button
                className="w-full p-2 text-left"
                onClick={(e) => handleClick(e, id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleClick(e, id)
                  }
                }}
                aria-label={`${label}セクションへ移動`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
