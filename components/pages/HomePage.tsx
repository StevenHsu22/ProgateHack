'use client';
import * as React from 'react';
import HomePageHeader from '../molecule/homepage/homePageHeader';
import HomePageHeroSection from '../molecule/homepage/homePageHeroSection';
import HomePageFeatureSection from '../molecule/homepage/homePageFeatureSection';

function HomePage() {
  return (
    <main className='flex flex-col pb-16 bg-white items-center'>
      <div className='flex flex-col px-16 pt-16 pb-8 w-2/3 bg-white md:w-full max-md:px-5'>
        <HomePageHeader />
        <HomePageHeroSection />
        <HomePageFeatureSection />
      </div>
    </main>
  );
}

export default HomePage;
