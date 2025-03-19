'use client';
import { useState } from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { AddNewIngredientModal } from '@/components/pages/modal/addNewIngredientModal';

const IngredientsPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex flex-col pt-4 h-full w-4/5 mx-auto'>
      <div className='flex justify-between'>
        <h1 className='text-2xl font-bold w-1/3 pl-4'>食材管理</h1>
        <span className='pr-4 '>
          <Button
            onClick={() => setIsOpen(true)}
            className=' hover:cursor-pointer bg-blue-400 hover:bg-blue-200 text-white size-12 w-18'
          >
            <div className='flex items-center gap-1'>
              <Plus /> ADD
            </div>
          </Button>
        </span>
      </div>
      <div className='border-t mx-3 my-2'></div>
      <div className=' w-full h-full'>
        {isOpen && <AddNewIngredientModal onClose={() => setIsOpen(false)} />}
      </div>
    </div>
  );
};

export default IngredientsPage;
