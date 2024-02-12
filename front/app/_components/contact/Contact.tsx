import React, { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ContactCard, { ContactCardProps } from './ContactCard';
import { MdOutlineEmail } from 'react-icons/md';
import { SiGithub, SiZenn } from 'react-icons/si';
import { FaXTwitter } from 'react-icons/fa6';
import { AiOutlineInstagram } from 'react-icons/ai';

const contacts: ContactCardProps[] = [
  {
    Icon: MdOutlineEmail,
    contactName: 'Gmail',
    link: 'mailto:takumi0616.mrt@gmail.com',
  },
  {
    Icon: SiGithub,
    contactName: 'Github',
    link: 'https://github.com/takumi0616',
  },
  {
    Icon: SiZenn,
    contactName: 'Zenn',
    link: 'https://zenn.dev/takumi0616',
  },
  {
    Icon: FaXTwitter,
    contactName: 'X(Twitter)',
    link: 'https://twitter.com/takumi79977718',
  },
  {
    Icon: AiOutlineInstagram,
    contactName: 'Instagram',
    link: 'https://www.instagram.com/takumi0616t/',
  },
];

const Contact: React.FC = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    function updateAnimations() {
      const cards = gsap.utils.toArray<Element>('.card');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 50 },
          {
            duration: 1,
            autoAlpha: 1,
            y: 0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              toggleActions: 'play none none none',
              invalidateOnRefresh: true,
            },
          }
        );
      });
    }
    updateAnimations();
    window.addEventListener('resize', updateAnimations);

    return () => {
      window.removeEventListener('resize', updateAnimations);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="mb-80 text-center">
      <h2 className="text-center text-4xl mb-20">Contact</h2>
      <div className="flex flex-wrap justify-center items-center gap-8">
        {contacts.map((contact, index) => (
          <ContactCard
            key={index}
            Icon={contact.Icon}
            contactName={contact.contactName}
            link={contact.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Contact;
