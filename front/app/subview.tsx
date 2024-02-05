import React, { useState } from 'react';
import SubCube from './SubCube';
import Works from './Works';
import WorkModal from './WorkModal';
import { WorkCardProps } from './WorkCard';
import Skill from './Skill';
import Activity from './Activity';
import Contributions from './Contributions';

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
      <div className="sticky top-0 w-full h-full z-0">
        <SubCube />
      </div>
      <div className="relative w-full h-full overflow-hidden z-10">
        <Works onOpenModal={openModal} />
      </div>
      <div>
        <Skills />
      </div>
      <div>
        <Activity />
        <div className="z-20">
          <Contributions />
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
