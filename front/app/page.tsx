'use client';

import React, { useEffect, useState } from 'react';
import Loader from './_components/layouts/Loader';
import Footer from './_components/layouts/Footer';
import Header from './_components/layouts/Header';
import MainView from './_components/hero/HeroView';
import SubCube from './_components/SubCube';
import Works from './_components/works/Works';
import WorkModal from './_components/works/WorkModal';
import { WorkCardProps } from './_components/works/WorkCard';
import Skills from './_components/skills/Skills';
import Activity from './_components/activity/Activity';
import Contributions from './_components/contributions/Contributions';
import Contact from './_components/contact/Contact';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState<WorkCardProps | undefined>(
    undefined
  );

  const openModal = (work: WorkCardProps) => {
    setSelectedWork(work);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative">
      {isLoading && <Loader />}
      <div
        className={`absolute w-full transition-opacity duration-1000 ease-out ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Header />
        <div className="flex-grow">
          <MainView />
          <div className="mt-[-400px]">
            <div className="sticky top-0 w-full h-full">
              <SubCube />
            </div>
            <div className="relative w-full h-full overflow-hidden">
              <div id="works">
                <Works onOpenModal={openModal} />
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
  );
}
