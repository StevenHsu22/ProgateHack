import React from 'react';
import { Card } from '@/components/ui/card';
interface HomePageCardProps {
  title: string;
  content: React.ReactNode;
  className?: string;
}

const HomePageFeatureCard: React.FC<HomePageCardProps> = ({
  title,
  content,
  className = '',
}) => {
  return (
    <Card
      className='min-h-[320px] p-6 text-white'
      style={{ backgroundColor: '#796868' }}
    >
      <article>
        <div className='inline-block'>
          <h3 className='text-2xl font-bold leading-none text-white'>
            {title}
          </h3>
          <div className='h-0.5 mt-2 mb-4 bg-white w-full' />
        </div>
        <div className='relative mt-15 text-l font-black leading-10 max-md:mt-10'>
          {content}
        </div>
      </article>
    </Card>
  );
};

export default HomePageFeatureCard;
