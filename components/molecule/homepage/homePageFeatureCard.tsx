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
    <Card className='h-full p-10 bg-yellow-700'>
      <article>
        <h3 className='relative self-start text-3xl font-bold leading-none'>
          {title}
        </h3>
        <div className='relative mt-24 text-2xl font-black leading-10 max-md:mt-10'>
          {content}
        </div>
      </article>
    </Card>
  );
};

export default HomePageFeatureCard;
