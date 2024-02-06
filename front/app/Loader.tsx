import React, { useEffect, useState } from 'react';

const Loader = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowText(true), 1000),
      setTimeout(() => setShowText(false), 3500),
      setTimeout(() => {
        const loader = document.querySelector('.loader');
        if (loader) {
          loader.classList.add('hidden');
        }
      }, 4500),
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <div className="loader fixed w-full h-full bg-white z-50 top-0 left-0 flex justify-center items-center"
         style={{backgroundImage: 'linear-gradient(to right, #c9d6df 30%, #fafaff 70%)'}}>
      <p className={`txt font-bold text-4xl color-[rgb(30,50,93)] ${showText ? 'block' : 'hidden'}`}>
        roading ...
      </p>
    </div>
  );
};

export default Loader;
