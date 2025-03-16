import React from 'react';

interface HomePageCardProps {
  backgroundImage: string;
  title: string;
  content: React.ReactNode;
  className?: string;
}

const HomePageFeatureCard: React.FC<HomePageCardProps> = ({
  backgroundImage,
  title,
  content,
  className = '',
}) => {
  return (
    <article
      className={`flex relative flex-col grow px-6 pt-36 pb-40 text-white rounded-none min-h-[462px] max-md:px-5 max-md:pb-24 max-md:mt-8 ${className}`}
    >
      <img
        src={backgroundImage}
        alt={`${title} background`}
        className='object-cover absolute inset-0 size-full'
        aria-hidden='true'
      />
      <h3 className='relative self-start text-3xl font-bold leading-none'>
        {title}
      </h3>
      <div className='relative mt-24 text-2xl font-black leading-10 max-md:mt-10'>
        {content}
      </div>
    </article>
  );
};

export default HomePageFeatureCard;
