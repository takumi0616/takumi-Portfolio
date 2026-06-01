'use client'

import React, { use, useEffect, useState } from 'react'
import Loader from '@/app/components/layouts/Loader'
import Footer from '@/app/components/layouts/Footer'
import Header from '@/app/components/layouts/Header'
import MainView from '@/app/components/hero/HeroView'
import BackAnimation from '@/app/components/layouts/BackAnimation'
import Works from '@/app/components/works/Works'
import WorkModal from '@/app/components/works/WorkModal'
import { WorkCardProps } from '@/app/types'
import Skills from '@/app/components/skills/Skills'
import Activity from '@/app/components/activity/Activity'
import Contributions from '@/app/components/contributions/Contributions'
import Contact from '@/app/components/contact/Contact'
import Publications from '@/app/components/publications/Publications'
import Awards from '@/app/components/awards/Awards'
import { useTranslation } from '@/i18n/client'

export default function Home({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  // Next.js 15 以降、クライアントコンポーネントの params も Promise のため use() で解決する。
  const { lang } = use(params)
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedWork, setSelectedWork] = useState<
    Omit<WorkCardProps, 'onOpenModal'> | undefined
  >(undefined)

  const openModal = (work: Omit<WorkCardProps, 'onOpenModal'>) => {
    setSelectedWork(work)
    setIsModalOpen(true)
  }

  const { t } = useTranslation(lang)

  useEffect(() => {
    // 固定 4 秒待つのではなく、実際の読み込み完了に合わせてローダーを閉じる。
    // ローディングアニメーションが一瞬で消えないよう最小表示時間を確保し、
    // 読み込みが遅い場合の保険として最大表示時間で上限を設ける。
    const MIN_DISPLAY_MS = 1800
    const MAX_DISPLAY_MS = 4000
    const startedAt = performance.now()
    let finished = false

    const finish = () => {
      if (finished) return
      finished = true
      const remaining = Math.max(
        0,
        MIN_DISPLAY_MS - (performance.now() - startedAt),
      )
      window.setTimeout(() => setIsLoading(false), remaining)
    }

    const maxTimer = window.setTimeout(finish, MAX_DISPLAY_MS)

    if (document.readyState === 'complete') {
      finish()
    } else {
      window.addEventListener('load', finish, { once: true })
    }

    return () => {
      window.clearTimeout(maxTimer)
      window.removeEventListener('load', finish)
    }
  }, [])

  return (
    <div className="relative flex min-h-screen flex-col">
      {isLoading && <Loader />}
      <div
        className={`absolute w-full transition-opacity duration-1000 ease-out ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Header />
        <div className="grow">
          <MainView lang={lang} />
          <div className="mt-[-400px]">
            <div className="sticky top-0 size-full">
              <BackAnimation object={undefined} />
            </div>
            <div className="relative size-full overflow-hidden">
              <div id="works">
                <Works lang={lang} onOpenModal={openModal} />
              </div>
              <div id="publications">
                <Publications lang={lang} />
              </div>
              <div id="awards">
                <Awards lang={lang} />
              </div>
              <div id="skills">
                <Skills />
              </div>
              <div id="activity">
                <Activity lang={lang} />
              </div>
              <div id="contributions" className="">
                <Contributions />
              </div>
              <div id="contact">
                <Contact />
              </div>
            </div>

            {isModalOpen && selectedWork && (
              <WorkModal
                title={selectedWork.title}
                image={selectedWork.image}
                onClose={() => setIsModalOpen(false)}
              />
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
