import React from 'react';

const HomePageHeroSection: React.FC = () => {
  return (
    <section className='flex relative flex-col justify-center items-center px-20 py-16 mt-14  bg-blue-500 rounded-2xl text-white  max-md:px-5 max-md:mt-10 max-md:mr-1 max-md:max-w-full'>
      <div className='flex relative flex-col items-center w-full max-md:max-w-full'>
        <h2 className='text-4xl font-semibold leading-none text-center max-md:max-w-full'>
          もう、食材を無駄にしない。
        </h2>
        <p className='self-stretch mt-20 text-4xl font-black leading-tight text-center max-md:mt-10 max-md:max-w-full'>
          消費期限が近い食材を賢く使って、
          <span className='text-[#fd6767]'>AIレシピ</span>
          で美味しく節約。
        </p>
        <a
          href='#get-started'
          className='px-9 py-2 mt-14 max-w-full font-bold tracking-wider leading-7 bg-orange-400 rounded-xl w-[156px] max-md:px-5 max-md:mt-10 text-center hover:shadow-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 text-xl'
        >
          Get Started
        </a>
      </div>
    </section>
  );
};

export default HomePageHeroSection;
