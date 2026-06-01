import React from 'react'
import Image from 'next/image'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { PublicationCardProps } from '@/app/types'

const PublicationCard: React.FC<PublicationCardProps> = ({
  image,
  title,
  authors_label,
  authors,
  abstract,
  url,
}) => {
  return (
    <div className="flex w-[90vw] flex-col items-center overflow-hidden">
      <div className="w-[70%] max-w-[840px] space-y-4 rounded-lg bg-white/20 p-8 backdrop-blur-md portrait:w-full portrait:max-w-full">
        <h3 className="mb-6 text-3xl">{title}</h3>

        <div className="mb-6 overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={title}
            className="h-auto w-full object-cover shadow-custom"
            width={500}
            height={285}
            sizes="(max-width: 768px) 90vw, 588px"
          />
        </div>

        <p className="text-xl">
          {authors_label}: {authors}
        </p>
        <p className="text-xl">{abstract}</p>

        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:underline"
            aria-label="引用URLを開く"
          >
            <FaExternalLinkAlt aria-hidden="true" />
            <span>引用URL</span>
          </a>
        )}
      </div>
    </div>
  )
}

export default PublicationCard
