import React from 'react';
import { LoginButton } from './loginButton';
export const Navbar = () => {
  return (
    <header className='border-b border-palette-lighter sticky top-0 z-20 bg-white'>
      <div className='flex items-center justify-between mx-auto max-w-6xl px-6 pb-4 pt-4 md:pt-6'>
        <a href='/' className='cursor-pointer'>
          <h1 className='text-2xl font-bold'>Home</h1>
        </a>
        <LoginButton />
      </div>
    </header>
  );
};
