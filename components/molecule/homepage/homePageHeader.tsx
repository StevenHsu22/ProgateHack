import React from 'react';
import { LoginButton } from '../loginButton';
import { SignupButton } from '../signupButton';
const HomePageHeader: React.FC = () => {
  return (
    <header className='flex flex-wrap gap-5 justify-between self-center w-full font-extrabold max-w-4/5 max-md:max-w-max'>
      <h1 className='text-3xl text-neutral-800'>
        <span className='text-[#248aef]'>ラスト</span>バイト
      </h1>
      <nav className='flex gap-5 self-start  text-xl text-black whitespace-nowrap'>
        <LoginButton />
      </nav>
    </header>
  );
};

export default HomePageHeader;
