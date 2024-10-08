import React, { FC } from 'react'
import { ContactCardProps } from '@/app/types'

const ContactCard: FC<ContactCardProps> = ({ Icon, contactName, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="card flex flex-col items-center"
      aria-label={`${contactName}のページへ`}
    >
      <Icon className="text-6xl" />
      <span className="mt-2">{contactName}</span>
    </a>
  )
}

export default ContactCard
