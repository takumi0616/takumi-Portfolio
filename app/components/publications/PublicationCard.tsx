import React from 'react'
import { PublicationCardProps } from '@/app/types'

const PublicationCard: React.FC<PublicationCardProps> = ({
  image,
  title,
  authors_label,
  authors,
  abstract,
}) => {
  return (
    <div className="flex w-[90vw] flex-col items-center overflow-hidden">
      <div className="mb-4 h-auto w-full max-w-md overflow-hidden rounded-lg">
        <img
          src={image}
          alt={title}
          className="w-full object-cover shadow-custom"
          loading="lazy"
          width="500"
          height="285"
        />
      </div>
      <div className="w-[70%] max-w-[840px] space-y-4 rounded-lg bg-white/20 p-8 backdrop-blur-md portrait:w-full portrait:max-w-full">
        <h3 className="mb-10 text-3xl">{title}</h3>
        <p className="text-xl">
          {authors_label}: {authors}
        </p>
        <p className="text-xl">{abstract}</p>
      </div>
    </div>
  )
}

export default PublicationCard
