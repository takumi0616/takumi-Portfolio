'use client';

import React from 'react';
import MainView from './mainview';
import SubView from './subview';
import Footer from './Footer';
import Header from './Header';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />
      <div className="flex-grow">
        <MainView />
        <SubView />
      </div>
      <Footer />
    </div>
  );
}
