import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MainCube from './HeroCube'
import { useTranslation } from '@/i18n/client'

export default function MainView({ lang }: { lang: string }) {
  const threeJsRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })
  const [mainContainerHeight, setMainContainerHeight] = useState(0)

  const { t } = useTranslation(lang) // 言語に応じて翻訳データを取得

  const handleResize = (width: number, height: number) => {
    setCanvasSize({ width, height })
    updatePadding(height)
  }

  const updatePadding = (canvasHeight: number) => {
    const windowHeight = window.innerHeight
    const windowWidth = window.innerWidth

    let paddingTop = 45
    if (windowHeight <= windowWidth) {
      paddingTop = Math.max(0, (windowHeight - canvasHeight) / 2)
    }

    if (threeJsRef.current) {
      threeJsRef.current.style.paddingTop = `${paddingTop}px`
    }
  }

  const updateMainContainerHeight = () => {
    if (contentRef.current) {
      setMainContainerHeight(contentRef.current.clientHeight)
    }
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    function updateAnimations() {
      const sections = gsap.utils.toArray('.content section:not(.no-animation)')
      sections.forEach((section) => {
        const el = section as Element
        gsap.fromTo(
          el,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top center',
              toggleActions: 'play none none none',
              invalidateOnRefresh: true,
            },
          },
        )
      })
    }

    updateAnimations()
    window.addEventListener('resize', updateAnimations)
    window.addEventListener('resize', updateMainContainerHeight)

    updateMainContainerHeight()

    return () => {
      window.removeEventListener('resize', updateAnimations)
      window.removeEventListener('resize', updateMainContainerHeight)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div>
      <div className="relative flex max-w-full items-start portrait:flex-col-reverse">
        <div
          className="w-1/2 portrait:mr-0 portrait:mt-[-200px] portrait:w-full"
          ref={contentRef}
        >
          <div className="content ml-[10vw] mr-[5vw] portrait:mt-0">
            <section className="no-animation mb-[55vh] mt-[45vh] opacity-100 portrait:mt-0">
              <h1 className="text-5xl">{t('hero.title')}</h1>
            </section>

            <div className="mb-[55vh] mt-[45vh]">
              <section className="opacity-0">
                <h2 className="text-5xl">{t('hero.title')}</h2>
                <p className="my-4 text-base leading-normal">
                  {t('hero.description1')}
                  <br />
                  {t('hero.description2')}
                  <br />
                  {t('hero.description3')}
                </p>
              </section>
            </div>

            <div className="mb-[55vh] mt-[45vh]">
              <section className="opacity-0">
                <p className="my-4 text-base leading-normal">
                  {t('hero.extra_info1')}
                  <br />
                  {t('hero.extra_info2')}
                  <br />
                  {t('hero.extra_info3')}
                </p>
              </section>
            </div>
          </div>
        </div>

        <div
          className="sticky right-0 top-0"
          style={{ height: `${mainContainerHeight / 2.2}px` }}
        >
          <div
            className="stickyThreeJsPadding"
            style={{ paddingTop: 'var(--stickyThreeJsPaddingTop)' }}
            ref={threeJsRef}
          >
            <MainCube onResize={handleResize} />
          </div>
        </div>
      </div>
    </div>
  )
}
