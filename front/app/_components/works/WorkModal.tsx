import React, { useEffect } from 'react';
import { CiCircleRemove } from 'react-icons/ci';
import gsap from 'gsap';

type WorkModalProps = {
  title: string;
  image: string;
  onClose: () => void;
};

const WorkModal: React.FC<WorkModalProps> = ({ title, image, onClose }) => {
  useEffect(() => {
    gsap.fromTo(
      '.modal-content',
      { y: 30, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power1.out' }
    );
  }, []);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center w-screen h-screen top-0 left-0"
      onClick={handleOutsideClick}
    >
      <div className="modal-content bg-white p-6 rounded-lg z-60 relative pointer-events-auto">
        <CiCircleRemove
          className="absolute top-4 right-4 text-4xl text-gray-600 cursor-pointer"
          onClick={onClose}
        />
        <h2 className="text-2xl mb-4">{title}</h2>
        <img
          src={image}
          alt={title}
          className="max-w-full h-auto rounded"
          loading="lazy"
          width="815"
          height="486"
        />
      </div>
    </div>
  );
};

export default WorkModal;
