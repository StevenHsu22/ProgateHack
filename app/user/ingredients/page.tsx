'use client';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';

import { Plus, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { AddNewIngredientModal } from '@/components/pages/modal/addNewIngredientModal';
import { IngredientsTable } from '@/components/molecule/Ingredients/ingredientsTable';
import { Ingredient } from '@/types/ingredients';

import { selectedIngredientCartState } from '@/store/selectedIngredientCartState';
import Link from 'next/link';

import { fetchIngredients, deleteIngredientApi } from '@/lib/api/ingredients';

const IngredientsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableDataIndex, setTableDataIndex] = useState(0);
  const [tableShowData, setTableShowData] = useState<Ingredient[]>([]);
  const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedIngredients, setSelectedIngredients] = useAtom(
    selectedIngredientCartState
  );

  let numPerPage = 10;

  // get食材
  const loadIngredients = async () => {
    try {
      setLoading(true);
      const data = await fetchIngredients();
      setAllIngredients(data);
      updateTableShowData(0, data);
      setLoading(false);
    } catch (err) {
      setError('食材の読み込みに失敗しました');
      setLoading(false);
      console.error(err);
    }
  };

  // delete食材
  const deleteSelectedIngredients = async () => {
    try {
      setLoading(true);
      await Promise.all(
        selectedIngredients.map((ingredient) =>
          deleteIngredientApi(ingredient.id!)
        )
      );
      loadIngredients();
      setSelectedIngredients([]);
    } catch (err) {
      setError('食材の削除に失敗しました');
      setLoading(false);
      console.error(err);
    }
  };

  const handleNext = () => {
    if ((tableDataIndex + 1) * numPerPage < allIngredients.length) {
      setTableDataIndex(tableDataIndex + 1);
    }
  };

  const handlePrev = () => {
    if (tableDataIndex - 1 >= 0) {
      setTableDataIndex(tableDataIndex - 1);
    }
  };

  const updateTableShowData = (index: number, data = allIngredients) => {
    setTableShowData(
      data.slice(index * numPerPage, index * numPerPage + numPerPage)
    );
  };

  const clearAll = () => {
    setSelectedIngredients([]);
  };

  // 新しい食材を追加した後にハンドルを更新する
  const handleIngredientAdded = () => {
    setIsOpen(false);
    loadIngredients();
  };

  useEffect(() => {
    loadIngredients();
  }, []);

  useEffect(() => {
    updateTableShowData(tableDataIndex);
  }, [tableDataIndex, allIngredients]);

  return (
    <div className='flex flex-col pt-4 h-full w-4/5 mx-auto bg-white rounded-xl shadow-lg p-6 overflow-auto'>
      <div className='flex justify-between'>
        <h1 className='text-2xl font-bold w-1/3 pl-4'>食材管理</h1>
        <span className='pr-4 '>
          {selectedIngredients.length !== 0 ? (
            <div className='flex items-center gap-2'>
              <span className='text-sm text-gray-500'>
                {selectedIngredients.length} 点選択中
              </span>
              <Button
                className=' hover:cursor-pointer bg-gray-400 hover:bg-gray-600 text-white size-12 w-18 mr-1'
                onClick={clearAll}
              >
                <div className='flex items-center gap-1 font-bold'>Clear</div>
              </Button>
              <Button
                className=' hover:cursor-pointer bg-red-400 hover:bg-red-700 text-white size-12 w-18 mr-1'
                onClick={deleteSelectedIngredients}
              >
                <div className='flex items-center gap-1'>
                  <Trash2 />
                </div>
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => setIsOpen(true)}
              className=' hover:cursor-pointer bg-blue-400 hover:bg-blue-800 text-white size-12 w-18'
            >
              <div className='flex items-center gap-1 font-bold'>
                <Plus /> ADD
              </div>
            </Button>
          )}
        </span>
      </div>
      <div className='border-t mx-3 my-2'></div>
      <div className=' w-full h-full'>
        {isOpen && (
          <AddNewIngredientModal
            onClose={() => setIsOpen(false)}
            onSuccess={handleIngredientAdded}
          />
        )}
        <div className='flex flex-col h-full w-full'>
          {loading ? (
            <div className='flex justify-center items-center h-32'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500'></div>
            </div>
          ) : error ? (
            <div className='text-red-500 text-center'>{error}</div>
          ) : (
            <>
              <div className='w-full h-4/5'>
                <IngredientsTable ingredients={tableShowData} />
              </div>
              <footer className='w-full h-1/5 flex flex-col justify-end gap-3 items-center'>
                <div className='w-full flex justify-end items-center gap-2'>
                  <Button
                    className='bg-gray-400 cursor-pointer hover:bg-gray-500'
                    onClick={handlePrev}
                    disabled={tableDataIndex === 0}
                  >
                    <ChevronLeft />
                  </Button>
                  <span className='w-2.5'>{tableDataIndex + 1}</span>
                  <Button
                    className='bg-gray-400 cursor-pointer hover:bg-gray-500'
                    onClick={handleNext}
                    disabled={
                      (tableDataIndex + 1) * numPerPage >= allIngredients.length
                    }
                  >
                    <ChevronRight />
                  </Button>
                </div>
                <Button
                  disabled={selectedIngredients.length === 0}
                  className=' hover:cursor-pointer bg-blue-400 hover:bg-blue-800 text-white size-12 w-22 font-bold'
                >
                  <Link href='/user/cart/'>レシピ提案</Link>
                </Button>
              </footer>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default IngredientsPage;
