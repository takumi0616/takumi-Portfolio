import React, { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { useTranslation } from '@/i18n/client'
import { ResearchProps, ResearchGroup, ResearchTheme } from '@/app/types'

export default function Research({ lang }: ResearchProps) {
  const { t } = useTranslation(lang)

  const overview = t('research.overview', { returnObjects: true }) as string[]
  const themes = t('research.themes', {
    returnObjects: true,
  }) as ResearchTheme[]
  const groups = t('research.groups', {
    returnObjects: true,
  }) as ResearchGroup[]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    function updateAnimations() {
      // 他セクションと干渉しないよう Research 専用クラスでアニメーションを登録する。
      const cards = gsap.utils.toArray<Element>('.research-item')
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 50 },
          {
            duration: 1,
            autoAlpha: 1,
            y: 0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              toggleActions: 'play none none none',
              invalidateOnRefresh: true,
            },
          },
        )
      })
    }
    updateAnimations()
    window.addEventListener('resize', updateAnimations)

    return () => {
      window.removeEventListener('resize', updateAnimations)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section className="mb-60">
      <h2 className="mb-20 text-center text-4xl">Research</h2>

      <div className="mx-auto flex w-[90vw] max-w-[840px] flex-col">
        {/* 研究概要 + 研究テーマ */}
        <div className="research-item space-y-8 rounded-lg bg-white/20 p-8 backdrop-blur-md portrait:p-6">
          <div className="space-y-3">
            <h3 className="text-2xl">{t('research.overview_title')}</h3>
            {overview.map((paragraph, index) => (
              <p key={index} className="text-base leading-relaxed sm:text-lg">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl">{t('research.themes_title')}</h3>
            <ul className="space-y-3">
              {themes.map((theme, index) => (
                <li
                  key={index}
                  className="rounded-md border-l-2 border-[rgb(30,50,93)]/40 bg-white/20 p-3"
                >
                  <p className="font-medium text-gray-800">{theme.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-700">
                    {theme.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <a
            href={t('research.lab_url')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:underline"
            aria-label={t('research.lab_label')}
          >
            <FaExternalLinkAlt aria-hidden="true" />
            <span>{t('research.lab_label')}</span>
          </a>
        </div>

        {/* 研究成果（業績一覧） */}
        <div className="research-item mt-12">
          <h3 className="mb-6 text-center text-2xl">
            {t('research.achievements_title')}
          </h3>

          <div className="space-y-8">
            {groups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h4 className="mb-3 border-b border-[rgb(30,50,93)]/30 pb-1 text-lg font-medium text-gray-800">
                  {group.category}
                </h4>
                <ul className="space-y-3">
                  {group.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="rounded-lg bg-white/20 p-4 backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      <p className="leading-relaxed text-gray-800">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-gray-700">
                        {item.authors}
                      </p>
                      <p className="mt-1 text-sm text-gray-600">
                        {item.venue}
                        {item.year ? `, ${item.year}` : ''}
                      </p>
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
                        >
                          <FaExternalLinkAlt aria-hidden="true" />
                          <span>Link</span>
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
