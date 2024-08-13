import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { IoLogoGithub } from 'react-icons/io';

export type PublicationCardProps = {
  image: string;
  title: string;
  authors: string;
  abstract: string;
};

const PublicationCard: React.FC<PublicationCardProps> = ({
  image,
  title,
  authors,
  abstract,
}) => {
  const handleImageClick = () => {
    console.log('Image clicked!');
  };

  return (
    <div className="flex flex-col items-center overflow-hidden w-[90vw]">
      <img
        src={image}
        alt={title}
        className="object-cover w-full max-w-md h-auto rounded-lg shadow-custom mb-4"
        loading="lazy"
        width="500"
        height="285"
        onClick={handleImageClick}
      />
      <div className="space-y-4 w-[70%]">
        <h3 className="text-3xl">{title}</h3>
        <p>共著者：{authors}</p>
        <p>{abstract}</p>
      </div>
    </div>
  );
};

export default PublicationCard;
