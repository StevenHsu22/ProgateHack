import React from 'react';
import HomePageFeatureCard from './homePageFeatureCard';

const HomePageFeatureSection: React.FC = () => {
  return (
    <section className='mt-8 max-md:max-w-full' aria-label='Features'>
      <div className='flex gap-5 max-md:flex-col'>
        <div className='w-[33%] max-md:ml-0 max-md:w-full'>
          <HomePageFeatureCard
            title='簡単な使い方'
            
            content={
              <>
                ① 食材を登録  
                <br />
                ② 提案カートに追加  
                <br />
                ③ AIにレシピをおまかせ 
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
            title='こんな方におすすめ'
            className='pt-36 pr-20 pb-52 pl-6 max-md:px-5 max-md:pb-24'
            content={
              <>
                🍱 献立の悩みを解決
                <br />
                📝 ムダを減らしてスマート管理
                <br />
                📈 食生活をもっと快適に
              </>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default HomePageFeatureSection;
