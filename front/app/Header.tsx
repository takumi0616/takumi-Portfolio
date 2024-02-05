import React, { useState, useEffect } from 'react';
import { IoIosMenu } from 'react-icons/io';

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
    }

    return () => {
      document.removeEventListener('click', closeMenu);
    };
  }, [isOpen]);

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);

    if (section) {
      const offsetTop =
        section.getBoundingClientRect().top + window.pageYOffset;
      const headerHeight = 100;
      const scrollToPosition = offsetTop - headerHeight;

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
      <div
        className={`absolute top-full right-[36px] mt-2 p-5 bg-white shadow-md rounded-lg select-none transition-opacity duration-500 menu-container ${
          isOpen ? 'opacity-100' : 'opacity-0 invisible'
        }`}
      >
        <ul className="text-lg lg:text-2xl">
          <li className="my-1">
            <a href="#works" onClick={(e) => handleClick(e, 'works')}>
              Works
            </a>
          </li>
          <li className="my-1">
            <a href="#skills" onClick={(e) => handleClick(e, 'skills')}>
              Skills
            </a>
          </li>
          <li className="my-1">
            <a href="#activity" onClick={(e) => handleClick(e, 'activity')}>
              Activity
            </a>
          </li>
          <li className="my-1">
            <a
              href="#contributions"
              onClick={(e) => handleClick(e, 'contributions')}
            >
              Contributions
            </a>
          </li>
          <li className="my-1">
            <a href="#contact" onClick={(e) => handleClick(e, 'contact')}>
              Contact
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
