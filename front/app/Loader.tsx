import React, { useEffect, useState } from 'react';

export const useTypingText = (text: string, speed: number) => {
  const [textState, setTextState] = useState('');
  const [index, setIndex] = useState(0);
  const chars = text.split('');

  useEffect(() => {
    if (index < chars.length) {
      const timer = setTimeout(() => {
        setTextState((prev) => prev + chars[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [index, chars, speed]);

  return textState;
};

const Loader = () => {
  const typedText = useTypingText('Loading...', 150);
  const [isLoadingEnd, setIsLoadingEnd] = useState(false);

  useEffect(() => {
    if (typedText === 'Loading...') {
      setTimeout(() => setIsLoadingEnd(true), 500);
    }
  }, [typedText]);

  return (
    <div
      className={`loader fixed w-full h-full bg-white z-50 top-0 left-0 flex justify-center items-center transition-opacity duration-1000 ${
        isLoadingEnd ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        backgroundImage: 'linear-gradient(to right, #c9d6df 30%, #fafaff 70%)',
      }}
    >
      <p className="text-4xl color-[rgb(30,50,93)]">{typedText}</p>
    </div>
  );
};

export default Loader;
