import { t } from 'i18next'
import React from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { IoLogoGithub } from 'react-icons/io'
import { WorkCardProps } from '@/app/types'

const WorkCard: React.FC<WorkCardProps> = ({
  image,
  title,
  description,
  myPart,
  gitHubUrl,
  onOpenModal,
}) => {
  const handleImageClick = () => {
    onOpenModal({ image, title, description, myPart, gitHubUrl })
  }

  return (
    <div className="w-[70vw] items-center justify-center overflow-hidden portrait:w-[90vw]">
      <div className="flex portrait:flex-col">
        <div className="mr-16 portrait:flex portrait:w-full portrait:justify-center">
          <button onClick={handleImageClick} className="m-3 cursor-pointer">
            <img
              src={image}
              alt={title}
              className="rounded-lg object-cover shadow-custom portrait:h-auto portrait:w-full portrait:max-w-full"
              loading="lazy"
              width="500"
              height="285"
            />
          </button>
        </div>
        <div className="mb-4 ml-auto flex w-[45%] flex-col justify-between space-y-4 portrait:mx-auto portrait:w-[95%]">
          <h3 className="text-3xl">{title}</h3>
          <p>{description}</p>
          <p>
            {t('works.my_part_label')}：{myPart}
          </p>
          <a
            href={gitHubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="git-link-button flex items-center justify-center rounded border border-gray-800 px-4 py-2 text-lg no-underline hover:bg-[#f0f0f0]"
            aria-label={`${title}のソースコードをGitHubで見る`}
          >
            <IoLogoGithub className="mr-2.5" />
            <div className="button-text mr-2.5">GitHub</div>
            <FaExternalLinkAlt />
          </a>
        </div>
      </div>
    </div>
  )
}

export default WorkCard
