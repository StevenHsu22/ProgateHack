import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { cn } from '@/lib/utils';
import { Ingredient } from '@/types/ingredients';
import { IngredientsTableRow } from './ingredientsTableRow';
import { randomInt } from 'crypto';

const dummyData = [] as Ingredient[];

for (let i = 0; i < 10; i++) {
  dummyData.push({
    id: i.toString(),
    name: 'トマト',
    quantity: 1,
    unit: '個',
    expirationDate: new Date('2022-12-31'),
    createdAt: new Date(),
    category: '野菜',
    status: 'active',
  });
}
for (let i = 11; i < 20; i++) {
  dummyData.push({
    id: i.toString(),
    name: '牛肉',
    quantity: 1,
    unit: '個',
    expirationDate: new Date('2022-12-31'),
    createdAt: new Date(),
    category: '肉',
    status: 'active',
  });
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

export const IngredientsTable = () => {
  return (
    <Table className='w-full '>
      <TableHeader className='text-center'>
        <TableRow key={'header'}>
          <TableHead className=' text-center'>食材名</TableHead>
          <TableHead className=' text-center'>数量</TableHead>
          <TableHead className=' text-center'>単位</TableHead>
          <TableHead className=' text-center'>カテゴリ</TableHead>
          <TableHead className=' text-center'>賞味期限</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className='text-center w-full'>
        {dummyData.map((ingredient) => (
          <TableRow key={ingredient.id}>
            <TableCell className='font-bold'>{ingredient.name}</TableCell>
            <TableCell>{ingredient.quantity}</TableCell>
            <TableCell>{ingredient.unit}</TableCell>
            <TableCell className='flex justify-center'>
              <div
                className={cn(
                  'w-25 rounded-xl items-center',
                  categoryColor(ingredient)
                )}
              >
                {ingredient.category}
              </div>
            </TableCell>
            <TableCell>{ingredient.expirationDate.toDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
};
