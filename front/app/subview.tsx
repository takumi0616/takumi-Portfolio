import React, { useState } from 'react';
import ThreeJsComponentBack from './ThreeJsBack';
import Works from './Works';
import WorkModal from './WorkModal';
import { WorkCardProps } from './WorkCard';

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
    <div style={{ marginTop: '-300px' }}>
      <div className="sticky top-0 w-full h-full">
        <ThreeJsComponentBack />
      </div>
      <div className="relative w-full h-full overflow-hidden">
        <Works onOpenModal={openModal} />
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
