import React from 'react';

const HomePageHeroSection: React.FC = () => {
  return (
    <section className='flex relative flex-col justify-center items-center px-20 py-16 mt-14 text-white rounded-none min-h-[387px] max-md:px-5 max-md:mt-10 max-md:mr-1 max-md:max-w-full'>
      <img
        src='https://cdn.builder.io/api/v1/image/assets/TEMP/da03811f85aef6364122a3265691989a22600de1b22144ea7d40c89234998956?placeholderIfAbsent=true&apiKey=c2e787b3df024015b92bb0f8acb7922a'
        alt='Hero background'
        className='object-cover absolute inset-0 size-full'
        aria-hidden='true'
      />
      <div className='flex relative flex-col items-center w-full max-w-[1036px] max-md:max-w-full'>
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
          className='px-9 py-2 mt-14 max-w-full text-sm font-bold tracking-wider leading-7 bg-orange-400 rounded-xl w-[156px] max-md:px-5 max-md:mt-10 text-center hover:bg-orange-500 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2'
        >
          Get Started
        </a>
      </div>
    </section>
  );
};

export default HomePageHeroSection;
