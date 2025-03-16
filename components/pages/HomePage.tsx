'use client';
import * as React from 'react';
import HomePageHeader from '../molecule/homepage/homePageHeader';
import HomePageHeroSection from '../molecule/homepage/homePageHeroSection';
import HomePageFeatureSection from '../molecule/homepage/homePageFeatureSection';

function HomePage() {
  return (
    <main className='flex flex-col pr-5 pb-16 bg-white items-center'>
      <div className='flex flex-col px-16 pt-16 pb-8 w-4/5  bg-white max-md:px-5 max-md:max-w-full'>
        <HomePageHeader />
        <HomePageHeroSection />
        <HomePageFeatureSection />
      </div>
    </main>
  );
}

export default HomePage;
