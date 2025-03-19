'use client';
import React, { useState, useEffect } from 'react';
import { IngredientsTable } from '../molecule/IngredientsCart/cartTable';
import { CartFilter } from '../molecule/IngredientsCart/cartFilterArea';
import { Ingredient } from '@/types/ingredients';
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

const dummyData = [] as Ingredient[];

for (let i = 0; i < 10; i++) {
  dummyData.push({
    id: i.toString(),
    name: `トマト+${i}`,
    quantity: 1,
    unit: '個',
    expirationDate: new Date('2022-12-31'),
    createdAt: new Date(),
    category: '野菜',
    status: 'active',
  });
}
for (let i = 10; i < 20; i++) {
  dummyData.push({
    id: i.toString(),
    name: `牛肉${i}`,
    quantity: 1,
    unit: '個',
    expirationDate: new Date('2022-12-31'),
    createdAt: new Date(),
    category: '肉',
    status: 'active',
  });
}

const CartPage = () => {
  const [allIngredients, setAllIngredients] = useState<Ingredient[]>(dummyData);
  const [displayedIngredients, setDisplayedIngredients] = useState<
    Ingredient[]
  >([]);
  const [totalItems, setTotalItems] = useState(dummyData.length);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Update displayed ingredients when all ingredients or page changes
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, allIngredients.length);
    setDisplayedIngredients(allIngredients.slice(startIndex, endIndex));
    setTotalItems(allIngredients.length);
  }, [allIngredients, currentPage, itemsPerPage]);

  const handleFilterApply = (filterParams: any) => {
    // In a real application, you would fetch filtered data from an API
    console.log('Applying filters:', filterParams);

    // For demonstration, we'll filter the dummy data based on category
    if (filterParams.category) {
      const filtered = dummyData.filter((item) =>
        item.category
          .toLowerCase()
          .includes(filterParams.category.toLowerCase())
      );
      setAllIngredients(filtered);
    } else {
      setAllIngredients(dummyData);
    }

    // Reset to first page when applying new filters
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > Math.ceil(totalItems / itemsPerPage)) return;
    setCurrentPage(page);
  };

  const handleRemoveIngredient = (id: string) => {
    const updatedIngredients = allIngredients.filter(
      (ingredient) => ingredient.id !== id
    );
    setAllIngredients(updatedIngredients);

    // If removing the last item on a page, go to previous page (except if we're on page 1)
    const newTotalItems = updatedIngredients.length;
    const newTotalPages = Math.ceil(newTotalItems / itemsPerPage);

    if (currentPage > newTotalPages && currentPage > 1) {
      setCurrentPage(newTotalPages || 1);
    }
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    const updatedIngredients = allIngredients.map((ingredient) =>
      ingredient.id === id ? { ...ingredient, quantity } : ingredient
    );
    setAllIngredients(updatedIngredients);
  };

  const handleClearAll = () => {
    setAllIngredients([]);
    setCurrentPage(1);
    setIsDialogOpen(false);
  };

  const openConfirmDialog = () => {
    setIsDialogOpen(true);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

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

        <div className='bg-white rounded-lg shadow-md overflow-hidden'>
          <IngredientsTable
            ingredients={displayedIngredients}
            onRemove={handleRemoveIngredient}
            onQuantityChange={handleQuantityChange}
          />

          <div className='p-4 border-t flex justify-between items-center text-sm text-gray-500'>
            <span>
              {totalItems > 0
                ? `${(currentPage - 1) * itemsPerPage + 1}-${Math.min(
                    currentPage * itemsPerPage,
                    totalItems
                  )} 件中 ${totalItems} 件を表示`
                : '表示するレシピがありません'}
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
          <CartFilter onApplyFilter={handleFilterApply} />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
