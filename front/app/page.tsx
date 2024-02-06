'use client';

import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import MainView from './mainview';
import SubView from './subview';
import Footer from './Footer';
import Header from './Header';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ここでロード画面の表示時間を延長する
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative">
      {isLoading && <Loader />}
      <div
        className={`absolute w-full transition-opacity duration-1000 ease-out ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Header />
        <div className="flex-grow">
          <MainView />
          <SubView />
        </div>
        <Footer />
      </div>
    </div>
  );
}
