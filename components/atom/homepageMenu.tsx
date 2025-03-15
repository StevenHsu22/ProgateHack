import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '../ui/card';
import Link from 'next/link';

interface HomePageMenuProps {
  className?: string;
  children?: React.ReactNode;
  href?: string;
}

const HomePageMenu = ({
  className,
  children,
  href = '#',
}: HomePageMenuProps) => {
  return (
    <Link href={href} className='block h-full w-full'>
      <Card
        className={cn(
          'h-full w-full rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300',
          'flex items-center justify-center cursor-pointer',
          className
        )}
      >
        {children}
      </Card>
    </Link>
  );
};

export default HomePageMenu;
