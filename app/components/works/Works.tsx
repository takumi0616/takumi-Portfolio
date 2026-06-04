import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import WorkCard from './WorkCard'
import { useTranslation } from '@/i18n/client'
import { WorkCardProps, WorksProps } from '@/app/types'

export default function Works({ lang, onOpenModal }: WorksProps) {
  const { t } = useTranslation(lang)
  const scopeRef = useRef<HTMLDivElement>(null)

  const worksData = t('works.data', { returnObjects: true }) as Omit<
    WorkCardProps,
    'onOpenModal'
  >[]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const root = scopeRef.current
    if (!root) return

    // gsap.context でこのコンポーネント内に限定し、cleanup では自分の
    // アニメ／ScrollTrigger だけを破棄する（resize は ScrollTrigger が自動 refresh）。
    const ctx = gsap.context(() => {
      const workCards = gsap.utils.toArray<Element>(
        root.querySelectorAll('.work-card'),
      )
      workCards.forEach((card) => {
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
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <div className="mb-40" ref={scopeRef}>
      <h2 className="mb-20 text-center text-4xl">Works</h2>

      <div className="flex flex-col items-center justify-center">
        {worksData.map((work, index) => (
          <div key={index} className="work-card mb-20 mt-10">
            <WorkCard {...work} onOpenModal={() => onOpenModal(work)} />
          </div>
        ))}
      </div>
    </div>
  )
}
