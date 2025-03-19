'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Home, Settings, BookOpen, PlusSquare } from 'lucide-react';

const menuItems = [
  { title: 'ダッシュボード', icon: Home, href: '/user/dashboard' },
  { title: '食材管理', icon: BookOpen, href: '/user/ingredients' },
  { title: 'レシピ提案', icon: PlusSquare, href: '/user/recipes' },
  { title: '料理の好み', icon: BookOpen, href: '/user/preferences' },
];

export const UserSidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  return (
    <aside className='flex flex-col h-screen bg-white shadow-lg'>
      {/* Logo + Toggle */}
      <div className='flex items-center justify-center p-4 mt-4'>
        <Link href='/'>
          <span className='text-xl font-bold'>
            <span className='text-[#248aef]'>ラスト</span>バイト
          </span>
        </Link>
      </div>

      {/* Divider */}
      <div className='border-t mx-3 my-2'></div>

      {/* Menu Items */}
      <nav className='flex flex-col gap-2 p-2'>
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div
              className={`flex items-center gap-3 p-3 rounded-md transition-all hover:bg-gray-200 ${
                pathname === item.href ? 'bg-blue-100 text-blue-600' : ''
              }`}
            >
              <item.icon className='w-5 h-5' />
              <span>{item.title}</span>
            </div>
            {item.title === 'ダッシュボード' && (
              <div className='border-t mx-3 my-2'></div>
            )}
          </Link>
        ))}
      </nav>

      {/* Spacer */}
      <div className='flex-grow'></div>

      {/* Divider */}
      <div className='border-t mx-3 my-2'></div>

      {/* Settings */}
      <div className='flex flex-col p-2'>
        <Link href='/user/settings'>
          <div
            className={`flex items-center gap-3 p-3 rounded-md hover:bg-gray-200 ${
              pathname === '/user/settings' ? 'bg-blue-100 text-blue-600' : ''
            }`}
          >
            <Settings className='w-5 h-5' />
            <span>Settings</span>
          </div>
        </Link>
      </div>
    </aside>
  );
};
