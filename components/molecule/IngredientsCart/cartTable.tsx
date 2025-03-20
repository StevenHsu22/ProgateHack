import { useState } from 'react';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Ingredient } from '@/types/ingredients';

interface IngredientsTableProps {
  ingredients: Ingredient[];
  onRemove?: (id: string) => void;
  onQuantityChange?: (id: string, quantity: number) => void;
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

export const IngredientsTable = ({ 
  ingredients, 
  onRemove,
  onQuantityChange 
}: IngredientsTableProps) => {
  const handleRemove = (id: string) => {
    if (onRemove) {
      onRemove(id);
    }
  };

  const handleQuantityChange = (id: string, value: string) => {
    const quantity = parseInt(value, 10);
    if (!isNaN(quantity) && quantity > 0 && onQuantityChange) {
      onQuantityChange(id, quantity);
    }
  };

  return (
    <Table className='w-full'>
      <TableHeader className='text-center'>
        <TableRow key={'header'}>
          <TableHead className='text-center'>食材名</TableHead>
          <TableHead className='text-center'>数量</TableHead>
          <TableHead className='text-center'>単位</TableHead>
          <TableHead className='text-center'>カテゴリ</TableHead>
          <TableHead className='text-center'></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className='text-center w-full'>
        {ingredients.map((ingredient) => (
          <TableRow key={ingredient.id}>
            <TableCell className='font-bold'>{ingredient.name}</TableCell>
            <TableCell className='flex justify-center items-center'>
              <Input
                type="number"
                min="1"
                value={ingredient.quantity}
                onChange={(e) => handleQuantityChange(ingredient.id, e.target.value)}
                className="w-24 h-8 text-center"
              />
            </TableCell>
            <TableCell>{ingredient.unit}</TableCell>
            <TableCell>
              <div className='flex justify-center items-center'>
                <div
                  className={cn(
                    'w-25 rounded-xl items-center px-2 py-1',
                    categoryColor(ingredient)
                  )}
                >
                  {ingredient.category}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <button 
                className='round-button click-transition' 
                onClick={() => handleRemove(ingredient.id)}
              >
                <Image
                  src='/icons/ui/close.png'
                  alt='close'
                  height={12}
                  width={12}
                />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};