'use client'

import React, { useEffect, useState } from 'react'
import Loader from '@/components/layouts/Loader'
import Footer from '@/components/layouts/Footer'
import Header from '@/components/layouts/Header'
import MainView from '@/components/hero/HeroView'
import BackAnimation from '@/components/layouts/BackAnimation'
import Works from '@/components/works/Works'
import WorkModal from '@/components/works/WorkModal'
import { WorkCardProps } from '@/components/works/WorkCard'
import Skills from '@/components/skills/Skills'
import Activity from '@/components/activity/Activity'
import Contributions from '@/components/contributions/Contributions'
import Contact from '@/components/contact/Contact'
import Publications from '@/components/publications/Publications'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedWork, setSelectedWork] = useState<
    Omit<WorkCardProps, 'onOpenModal'> | undefined
  >(undefined)

  const openModal = (work: Omit<WorkCardProps, 'onOpenModal'>) => {
    setSelectedWork(work)
    setIsModalOpen(true)
  }

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
          <MainView />
          <div className="mt-[-400px]">
            <div className="sticky top-0 size-full">
              <BackAnimation />
            </div>
            <div className="relative size-full overflow-hidden">
              <div id="works">
                <Works onOpenModal={openModal} />
              </div>
              <div id="publications">
                <Publications />
              </div>
              <div id="skills">
                <Skills />
              </div>
              <div id="activity">
                <Activity />
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
