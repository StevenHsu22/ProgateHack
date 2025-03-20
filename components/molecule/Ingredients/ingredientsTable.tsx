import { useState } from 'react';

import { useAtom } from 'jotai';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { cn } from '@/lib/utils';
import { Ingredient } from '@/types/ingredients';
import { Checkbox } from '@/components/ui/checkbox';

import { selectedIngredientCartState } from '@/store/selectedIngredientCartState';

interface IngredientsTableProps {
  ingredients: Ingredient[];
}

const categoryColor = (ingredient: Ingredient) => {
  switch (ingredient.category) {
    case '野菜':
      return 'bg-green-100/80';
    case '果物':
      return 'bg-yellow-100/80';
    case '肉':
      return 'bg-red-100/80';
    case '魚':
      return 'bg-blue-100/80';
    case '卵':
      return 'bg-yellow-100/80';
    case '冷凍食品':
      return 'bg-blue-100/80';
    case 'その他':
      return 'bg-gray-100/80';
    default:
      return 'bg-gray-100/80';
  }
};

export const IngredientsTable = ({ ingredients }: IngredientsTableProps) => {
  const [selectedIngredients, setSelectedIngredients] = useAtom(
    selectedIngredientCartState
  );

  return (
    <Table className='w-full '>
      <TableHeader className='text-center'>
        <TableRow key={'header'}>
          <TableHead className='text-center w-[10%]'>選択</TableHead>
          <TableHead className='text-center w-[20%]'>食材名</TableHead>
          <TableHead className='text-center w-[10%]'>数量</TableHead>
          <TableHead className='text-center w-[10%]'>単位</TableHead>
          <TableHead className='text-center w-[25%]'>カテゴリ</TableHead>
          <TableHead className='text-center w-[25%]'>賞味期限</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className='text-center w-full'>
        {ingredients.map((ingredient) => (
          <TableRow key={ingredient.id}>
            <TableCell className='w-[10%]'>
              <div className='flex items-center justify-center min-w-5 min-h-5'>
                <Checkbox
                  checked={selectedIngredients.some(
                    (item) => item.id === ingredient.id
                  )}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedIngredients([
                        ...selectedIngredients,
                        ingredient,
                      ]);
                    } else {
                      setSelectedIngredients(
                        selectedIngredients.filter(
                          (item) => item.id !== ingredient.id
                        )
                      );
                    }
                  }}
                  className='w-5 h-5 border-2 border-gray-300 rounded'
                />
              </div>
            </TableCell>
            <TableCell className='font-bold w-[20%]'>
              {ingredient.name}
            </TableCell>
            <TableCell className='w-[10%]'>{ingredient.quantity}</TableCell>
            <TableCell className='w-[10%]'>{ingredient.unit}</TableCell>
            <TableCell className='w-[25%]'>
              <div className='flex justify-center items-center w-full'>
                <div
                  className={cn('px-4  rounded-xl', categoryColor(ingredient))}
                >
                  {ingredient.category}
                </div>
              </div>
            </TableCell>
            <TableCell className='w-[25%]'>
              {ingredient.expirationDate instanceof Date 
                ? ingredient.expirationDate.toDateString() 
                : new Date(ingredient.expirationDate).toDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
