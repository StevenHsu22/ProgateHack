import RecipesPage from '@/components/pages/RecipesPage';

const Recipes = () => {
  return (
    <div className='w-full h-[95%] max-w-9xl px-8'>
      <div className='flex flex-col pt-4 w-full h-full mx-auto bg-white rounded-xl shadow-lg overflow-auto'>
        <RecipesPage />
      </div>
    </div>
  );
};

export default Recipes;
