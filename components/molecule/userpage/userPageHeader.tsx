'use client';

import Image from 'next/image';
import { Search, Bell } from 'lucide-react';

export function UserPageHeader() {
  return (
    <header className='flex items-center justify-between px-6 py-4 bg-white shadow-sm h-1/6'>
      <div className='flex-1 max-w-md mx-8'>
        <div className='relative'>
          <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500' />
          <input
            type='text'
            placeholder='Search'
            className='w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-gray-100 focus:outline-none'
          />
        </div>
      </div>

      <div className='flex items-center gap-6'>
        <Image
          src='https://cdn.builder.io/api/v1/image/assets/TEMP/aee87fa79f7a50bb65a021ad4189499f9742351f30b951f5c3d70f6da6c7901e?placeholderIfAbsent=true&apiKey=c44502950afb400e865a11a365c79054'
          alt='avatar'
          width={32}
          height={32}
          className='rounded-full'
        />
        <div className='text-sm'>
          <div className='font-semibold'>サメチーム</div>
          <div className='text-gray-500 text-xs'>Admin</div>
        </div>
      </div>
    </header>
  );
}
