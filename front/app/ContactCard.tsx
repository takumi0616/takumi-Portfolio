import React, { FC } from 'react';

type ContactProps = {
  Icon: React.ElementType;
  contactName: string;
  link: string;
};

const ContactCard: FC<ContactProps> = ({ Icon, contactName, link }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="card flex flex-col items-center">
      <Icon className="text-6xl" />
      <span className="mt-2">{contactName}</span>
    </a>
  );
};

export default ContactCard;
