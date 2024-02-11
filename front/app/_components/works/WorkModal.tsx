import React from 'react';
import { CiCircleRemove } from 'react-icons/ci';

type WorkModalProps = {
  title: string;
  image: string;
  onClose: () => void;
};

const WorkModal: React.FC<WorkModalProps> = ({ title, image, onClose }) => {
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
      <div className="bg-white p-6 rounded-lg z-60 relative pointer-events-auto">
        <CiCircleRemove
          className="absolute top-4 right-4 text-4xl text-gray-600 cursor-pointer"
          onClick={onClose}
        />
        <h2 className="text-2xl mb-4">{title}</h2>
        <img src={image} alt={title} className="max-w-full h-auto rounded" loading='lazy'/>
      </div>
    </div>
  );
};

export default WorkModal;
