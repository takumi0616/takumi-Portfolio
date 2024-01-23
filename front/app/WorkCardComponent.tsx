import React from 'react';
import './WorkCardComponent.css'; // CSSファイルをインポート
import { FaExternalLinkAlt } from 'react-icons/fa';
import { IoLogoGithub } from 'react-icons/io';

interface WorkCardProps {
  image: string;
  title: string;
  description: string;
  myPart: string;
  gitUrl: string;
}

const WorkCard: React.FC<WorkCardProps> = ({
  image,
  title,
  description,
  myPart,
  gitUrl,
}) => {
  return (
    <div className="work-card">
      <div className="container">
        <div className="work-image">
          <img src={image} alt={title} />
        </div>
        <div className="work-text">
          <h3>{title}</h3>
          <p>{description}</p>
          <p>担当箇所：{myPart}</p>
          <a
            href={gitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="git-link-button"
          >
            <IoLogoGithub />
            <div className="button-text">GitHub</div>
            <FaExternalLinkAlt />
          </a>
        </div>
      </div>
    </div>
  );
};

export default WorkCard;
