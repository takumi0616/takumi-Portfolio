import React, { useState, useEffect } from 'react';
import { IoIosMenu } from 'react-icons/io';

const menuItems = [
  { id: 'works', label: 'Works' },
  { id: 'skills', label: 'Skills' },
  { id: 'activity', label: 'Activity' },
  { id: 'contributions', label: 'Contributions' },
  { id: 'contact', label: 'Contact' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen && target.closest('.menu-container') === null) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', closeMenu);
      return () => document.removeEventListener('click', closeMenu);
    }
  }, [isOpen]);

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    sectionId: string
  ) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);

    if (section) {
      const offsetTop =
        section.getBoundingClientRect().top + window.pageYOffset;
      const HEADER_HEIGHT = 100;
      const scrollToPosition = offsetTop - HEADER_HEIGHT;

      window.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth',
      });
    }

    setIsOpen(false);
  };

  return (
    <div className="flex justify-between items-center p-6 bg-transparent fixed top-0 left-0 right-0 z-50">
      <div className="text-lg lg:text-3xl ml-[36px] tracking-wider">
        Takasuka Takumi
      </div>
      <IoIosMenu
        className="text-5xl cursor-pointer mr-[36px]"
        onClick={toggleMenu}
      />
      <nav
        className={`absolute top-full right-[36px] mt-2 p-5 bg-white shadow-md rounded-lg select-none transition-opacity duration-500 menu-container ${
          isOpen ? 'opacity-100' : 'opacity-0 invisible'
        }`}
      >
        <ul className="text-lg lg:text-2xl">
          {menuItems.map(({ id, label }) => (
            <li
              key={id}
              className="my-1 hover:bg-gray-200 cursor-pointer rounded-md"
              onClick={(e) => handleClick(e, id)}
            >
              <p className="ml-2">{label}</p>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
