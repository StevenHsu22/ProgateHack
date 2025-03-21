import RecipesPage from '@/components/pages/RecipesPage';
import { Dialog } from '@/components/molecule/dialog';

const Recipes = () => {
  return (
    <div className='w-full h-[95%] max-w-9xl px-8 rounded-xl bg-white shadow-lg p-2.5 overflow-auto'>
      <div className='flex flex-col pt-4 w-full h-full mx-auto  '>
        <Dialog />
        <RecipesPage />
      </div>
    </div>
  );
};

export default Recipes;
