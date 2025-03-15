import React from 'react';
import { cn } from '@/lib/utils';

interface pageContainerProps {
  className?: string;
  children?: React.ReactNode;
}

export const PageContainer = ({ className, children }: pageContainerProps) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center h-[calc(100vh-80px)] ',
        className
      )}
    >
      {children}
    </div>
  );
};
