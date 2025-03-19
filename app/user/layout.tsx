'use client';
import { useState } from 'react';
import { UserPageHeader } from '@/components/molecule/userpage/userPageHeader';
import { UserSidebarMenu } from '@/components/molecule/userpage/userSidebarMenu';
import { SessionProvider } from 'next-auth/react';

interface UserPageLayoutProps {
  children: React.ReactNode;
}

const UserPageLayout = ({ children }: UserPageLayoutProps) => {
  return (
    <SessionProvider>
      <div className='flex h-screen'>
        <UserSidebarMenu />
        <div className='flex flex-col flex-1'>
          <UserPageHeader />
          <main className='flex-1 p-6 bg-gray-100'>{children}</main>
        </div>
      </div>
    </SessionProvider>
  );
};

export default UserPageLayout;
