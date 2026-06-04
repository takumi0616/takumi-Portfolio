import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PublicationCard from './PublicationCard'
import { useTranslation } from '@/i18n/client'
import { PublicationCardProps, PublicationsProps } from '@/app/types'

export default function Publications({ lang }: PublicationsProps) {
  const { t } = useTranslation(lang)
  const scopeRef = useRef<HTMLDivElement>(null)

  const publicationsData = t('publications.data', {
    returnObjects: true,
  }) as PublicationCardProps[]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const root = scopeRef.current
    if (!root) return

    // 自コンポーネント内の .work-card のみを対象にスコープ化（Works との衝突を回避）。
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<Element>(
        root.querySelectorAll('.work-card'),
      )
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
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <div className="mb-40" ref={scopeRef}>
      <h2 className="mb-20 text-center text-4xl">Publications</h2>

      <div className="flex flex-col items-center justify-center">
        {publicationsData.map((publication, index) => (
          <div key={index} className="work-card mb-20 mt-10">
            <PublicationCard {...publication} />
          </div>
        ))}
      </div>
    </div>
  )
}
