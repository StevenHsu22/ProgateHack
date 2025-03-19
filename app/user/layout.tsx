'use client';
import { useState } from 'react';
import { UserPageHeader } from '@/components/molecule/userpage/userPageHeader';
import { UserSidebarMenu } from '@/components/molecule/userpage/userSidebarMenu';

interface UserPageLayoutProps {
  children: React.ReactNode;
}

const UserPageLayout = ({ children }: UserPageLayoutProps) => {
  return (
    <div className='flex h-screen overflow-hidden'>
      <div className='fixed left-0 top-0 h-full w-64 bg-white shadow-sm'>
        <UserSidebarMenu />
      </div>

      <div className='flex flex-col w-full pl-64'>
        {' '}
        <div className='fixed top-0 right-0 left-64 z-10'>
          <UserPageHeader />
        </div>
        <main className='mt-16 flex-1 p-6 bg-gray-100 overflow-y-auto h-[calc(100vh-4rem)]'>
          {children}
        </main>
      </div>
    </div>
  );
};

export default UserPageLayout;
