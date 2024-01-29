import React, { useEffect, useState } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { IoLogoGithub } from 'react-icons/io';
import WorkModal from './WorkModal';

export type WorkCardProps = {
  image: string;
  title: string;
  description: string;
  myPart: string;
  gitHubUrl: string;
} & { onOpenModal: (work: WorkCardProps) => void };

const WorkCard: React.FC<WorkCardProps> = ({
  image,
  title,
  description,
  myPart,
  gitHubUrl,
  onOpenModal,
}) => {
  const handleImageClick = () => {
    onOpenModal({ image, title, description, myPart, gitHubUrl, onOpenModal });
  };

  return (
    <>
      <div className="justify-center items-center w-[70vw] overflow-hidden">
        <div className="flex portrait:flex-col">
          <div className="portrait:w-full portrait:flex portrait:justify-center">
            <div onClick={handleImageClick} className="cursor-pointer">
              <img
                src={image}
                alt={title}
                className="object-cover portrait:w-full portrait:max-w-full portrait:h-auto"
              />
            </div>
          </div>
          <div className="ml-auto w-[45%] space-y-4 portrait:w-[95%] portrait:mx-auto flex flex-col justify-between mb-4">
            <h3 className="text-3xl">{title}</h3>
            <p>{description}</p>
            <p>担当箇所：{myPart}</p>
            <a
              href={gitHubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="git-link-button flex items-center justify-center px-4 py-2 border border-gray-800 rounded text-gray-800 text-lg no-underline hover:bg-[#f0f0f0] hover:text-black"
            >
              <IoLogoGithub className="mr-2.5" />
              <div className="button-text mr-2.5">GitHub</div>
              <FaExternalLinkAlt />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkCard;
