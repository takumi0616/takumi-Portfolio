'use client'

import React, { useEffect, useState } from 'react'
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
import { useTranslation } from '@/i18n/client'

export default function Home({ params }: { params: { lang: string } }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedWork, setSelectedWork] = useState<
    Omit<WorkCardProps, 'onOpenModal'> | undefined
  >(undefined)

  const openModal = (work: Omit<WorkCardProps, 'onOpenModal'>) => {
    setSelectedWork(work)
    setIsModalOpen(true)
  }

  const { t } = useTranslation(params.lang)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4000)

    return () => clearTimeout(timer)
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
          <MainView lang={params.lang} />
          <div className="mt-[-400px]">
            <div className="sticky top-0 size-full">
              <BackAnimation object={undefined} />
            </div>
            <div className="relative size-full overflow-hidden">
              <div id="works">
                <Works lang={params.lang} onOpenModal={openModal} />
              </div>
              <div id="publications">
                <Publications lang={params.lang} />
              </div>
              <div id="skills">
                <Skills />
              </div>
              <div id="activity">
                <Activity lang={params.lang} />
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
