import React, { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PublicationCard, { PublicationCardProps } from './PublicationCard'
import { useTranslation } from '@/i18n/client'

type PublicationsProps = {
  lang: string
}

export default function Publications({ lang }: PublicationsProps) {
  const { t } = useTranslation(lang)

  const publicationsData = t('publications.data', {
    returnObjects: true,
  }) as PublicationCardProps[]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    function updateAnimations() {
      const workCards = gsap.utils.toArray<Element>('.work-card')
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
    }
    updateAnimations()
    window.addEventListener('resize', updateAnimations)

    return () => {
      window.removeEventListener('resize', updateAnimations)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="mb-40">
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
