import React, { useState, useEffect } from 'react'
import { IoIosMenu } from 'react-icons/io'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/i18n/client'

const menuItems = [
  { id: 'works', label: 'Works' },
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

  const reloadPage = () => {
    window.location.reload()
  }

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
    router.push(`/${newLanguage}`)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-transparent p-6">
      <button
        className="ml-8 cursor-pointer text-lg tracking-wider lg:text-3xl portrait:ml-0"
        onClick={reloadPage}
      >
        Takasuka Takumi
      </button>

      <div className="flex items-center">
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="mr-4 cursor-pointer rounded border border-gray-300 p-2"
          aria-label="言語切り替え"
        >
          <option value="ja">Japanese</option>
          <option value="en">English</option>
        </select>
        <IoIosMenu
          className="mr-8 cursor-pointer text-5xl portrait:mr-0"
          onClick={toggleMenu}
          tabIndex={0}
          role="button"
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              toggleMenu()
            }
          }}
        />
      </div>

      <nav
        className={`menu-container absolute right-[36px] top-full mt-2 select-none rounded-lg bg-white p-5 shadow-md transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'invisible opacity-0'
        }`}
      >
        <ul className="text-lg lg:text-2xl">
          {menuItems.map(({ id, label }) => (
            <li key={id} className="my-1 rounded-md hover:bg-gray-200">
              <button
                className="w-full p-2 text-left"
                onClick={(e) => handleClick(e, id)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleClick(e, id)
                  }
                }}
                aria-label={`${label} sectionへスクロールする`}
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
