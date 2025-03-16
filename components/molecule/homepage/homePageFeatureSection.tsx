import React from 'react';
import HomePageFeatureCard from './homePageFeatureCard';

const HomePageFeatureSection: React.FC = () => {
  return (
    <section className='mt-8 max-md:max-w-full' aria-label='Features'>
      <div className='flex gap-5 max-md:flex-col'>
        <div className='w-[33%] max-md:ml-0 max-md:w-full'>
          <HomePageFeatureCard
            title='サービス紹介'
            
            content={
              <>
                食材を登録する
                <br />
                AIがレシピを提案
                <br />
                美味しく消費して、廃棄ゼロへ
              </>
            }
          />
        </div>
        <div className='ml-5 w-[33%] max-md:ml-0 max-md:w-full'>
          <HomePageFeatureCard
            title='メリット'
            className='px-3.5'
            content={
              <>
                🥦 食材の消費期限を一目でチェック
                <br />
                🤖 AIレシピで毎日の献立をサポート
                <br />
                💡 節約にも環境にもやさしい
              </>
            }
          />
        </div>
        <div className='ml-5 w-[33%] max-md:ml-0 max-md:w-full'>
          <HomePageFeatureCard
            title='デモ画像'
            className='pt-36 pr-20 pb-52 pl-6 max-md:px-5 max-md:pb-24'
            content={
              <div className='self-center mt-36 text-4xl font-black leading-tight text-center max-md:mt-10'>
                写真
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default HomePageFeatureSection;
