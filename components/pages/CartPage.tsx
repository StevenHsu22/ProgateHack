'use client';
import React, { useState } from 'react';
import { usePagination } from '@/hooks/usePagination';
import { useIngredientsCart } from '@/hooks/useIngredientsCart';

import { IngredientsTable } from '../molecule/IngredientsCart/cartTable';
import { CartFilter } from '../molecule/IngredientsCart/cartFilterArea';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const CartPage = () => {
  const itemsPerPage = 10;

  const {
    ingredients,
    removeIngredient,
    updateQuantity,
    clearAll,
    filterIngredients,
  } = useIngredientsCart(itemsPerPage);

  const { currentPage, totalPages, handlePageChange, getCurrentPageItems } =
    usePagination(ingredients.length, itemsPerPage);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const displayedIngredients = getCurrentPageItems(ingredients);
  const hasIngredients = ingredients.length > 0;

  const handleRemoveIngredient = (id: string) => {
    removeIngredient(id, currentPage, handlePageChange);
  };

  const handleClearAll = () => {
    clearAll();
    setIsDialogOpen(false);
  };

  const openConfirmDialog = () => {
    setIsDialogOpen(true);
  };

  const handleFilterApply = (filterParams: any) => {
    // The original filtering logic will remain the same
    if (filterParams.category) {
      filterIngredients(filterParams.category);
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <div className='w-full mb-6'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-bold'>提案する食材リスト</h2>
          <Button
            onClick={openConfirmDialog}
            className='hover:cursor-pointer bg-red-400 hover:bg-red-700 text-white size-12 w-18 mr-1'
          >
            <div className='flex items-center gap-1'>
              <Trash2 />
            </div>
          </Button>
        </div>

        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>削除確認</AlertDialogTitle>
              <AlertDialogDescription>
                すべての食材を削除してもよろしいですか？この操作は元に戻せません。
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>キャンセル</AlertDialogCancel>
              <AlertDialogAction onClick={handleClearAll}>
                削除を確認
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className='bg-white overflow-hidden'>
          <IngredientsTable
            ingredients={displayedIngredients}
            onRemove={handleRemoveIngredient}
            onQuantityChange={updateQuantity}
          />

          <div className='p-4 border-t flex justify-between items-center text-sm text-gray-500'>
            <span>
              {ingredients.length > 0
                ? `${ingredients.length} 件中 ${
                    (currentPage - 1) * itemsPerPage + 1
                  }-${Math.min(
                    currentPage * itemsPerPage,
                    ingredients.length
                  )} 件を表示`
                : '表示する食材がありません'}
            </span>
            <div className='flex space-x-2'>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className='p-2 border rounded-md disabled:opacity-50'
              >
                &lt;
              </button>
              <span className='p-2'>
                ページ {currentPage} / {totalPages || 1}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages || totalPages === 0}
                className='p-2 border rounded-md disabled:opacity-50'
              >
                &gt;
              </button>
            </div>
          </div>
        </div>

        <div className='mt-6'>
          <CartFilter
            onApplyFilter={handleFilterApply}
            hasIngredients={hasIngredients}
            ingredients={ingredients}
          />
        </div>
      </div>
    </div>
  );
};

export default CartPage;