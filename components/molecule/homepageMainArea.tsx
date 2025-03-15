import HomePageMenu from '../atom/homepageMenu';
import { PageContainer } from '../atom/pageContainer';
const HomePageMainArea = () => {
  return (
    <PageContainer>
      <div className='w-3/4 max-w-6xl px-4'>
        <div className='grid grid-cols-2 gap-6'>
          <div className='col-span-1 h-[600px]'>
            <HomePageMenu href='/ingredients'>
              <h1>在庫確認</h1>
            </HomePageMenu>
          </div>
          <div className='col-span-1 grid grid-rows-2 gap-6'>
            <HomePageMenu href='/ingredients/add'>食材追加</HomePageMenu>
            <HomePageMenu href='/recipes'>レシピを決める!</HomePageMenu>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default HomePageMainArea;
