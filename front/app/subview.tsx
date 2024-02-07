import React, { useState } from 'react';
import SubCube from './SubCube';
import Works from './Works';
import WorkModal from './WorkModal';
import { WorkCardProps } from './WorkCard';
import Skills from './Skills';
import Activity from './Activity';
import Contributions from './Contributions';
import Contact from './Contact';

export default function SubView() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState<WorkCardProps | undefined>(
    undefined
  );

  const openModal = (work: WorkCardProps) => {
    setSelectedWork(work);
    setIsModalOpen(true);
  };

  return (
    <div className="mt-[-300px]">
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
  );
}
