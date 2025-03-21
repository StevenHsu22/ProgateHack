'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

interface CartFilterProps {
  onApplyFilter: (filterParams: any) => void;
}

export const CartFilter = ({ onApplyFilter }: CartFilterProps) => {
  const [peopleCount, setPeopleCount] = useState<number>(1);
  const [mealPreference, setMealPreference] = useState<string>('');
  const [cookingTime, setCookingTime] = useState<string>('');
  const [allergies, setAllergies] = useState<string>('');
  const [recipesName, setRecipesName] = useState<string>('');
  const [otherConditions, setOtherConditions] = useState<string>('');

  const handleApplyFilter = () => {
    onApplyFilter({
      peopleCount,
      mealPreference,
      cookingTime,
      allergies,
      recipesName,
      otherConditions,
    });
  };

  const handlePeopleCountChange = (value: string) => {
    const count = parseInt(value, 10);
    if (!isNaN(count) && count > 0) {
      setPeopleCount(count);
    }
  };

  return (
    <div className='p-4'>
      {/* Top row with 4 filters */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4'>
        <div className='p-2 bg-gray-20 rounded'>
          <div className='text-sm font-medium mb-2'>人数</div>
          <Input
            type='number'
            min='1'
            value={peopleCount}
            onChange={(e) => handlePeopleCountChange(e.target.value)}
            className='w-full h-8 text-center'
          />
        </div>

        <div className='p-2 bg-gray-20 rounded'>
          <div className='text-sm font-medium mb-2'>食事の好み</div>
          <select
            className='border rounded px-2 py-1 text-sm w-full h-8'
            value={mealPreference}
            onChange={(e) => setMealPreference(e.target.value)}
          >
            <option value=''>選択してください</option>
            <option value='和食'>和食</option>
            <option value='洋食'>洋食</option>
            <option value='中華'>中華</option>
          </select>
        </div>

        <div className='p-2 bg-gray-20 rounded'>
          <div className='text-sm font-medium mb-2'>調理時間</div>
          <select
            className='border rounded px-2 py-1 text-sm w-full h-8'
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
          >
            <option value=''>選択してください</option>
            <option value='15分以内'>15分以内</option>
            <option value='30分以内'>30分以内</option>
            <option value='1時間以内'>1時間以内</option>
          </select>
        </div>

        <div className='p-2 bg-gray-20 rounded'>
          <div className='text-sm font-medium mb-2'>アレルギー</div>
          <select
            className='border rounded px-2 py-1 text-sm w-full h-8'
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
          >
            <option value=''>選択してください</option>
            <option value='卵'>卵</option>
            <option value='乳'>乳</option>
            <option value='小麦'>小麦</option>
            <option value='えび'>えび</option>
            <option value='かに'>かに</option>
          </select>
        </div>
      </div>

      {/* Bottom row with 2 filters */}
      <div className='flex flex-col sm:flex-row gap-4 items-center'>
        <div className='p-2 bg-gray-20 rounded flex-grow'>
          <div className='text-sm font-medium mb-2'>提案の名前</div>
          <Input
            type='text'
            placeholder='例: 昼ごはん、お弁当等'
            value={recipesName}
            onChange={(e) => setRecipesName(e.target.value)}
            className='text-sm w-full h-8'
          />
        </div>
        <div className='p-2 bg-gray-20 rounded flex-grow'>
          <div className='text-sm font-medium mb-2'>他の条件</div>
          <Input
            type='text'
            placeholder='例: ベジタリアン、グルテンフリー等'
            value={otherConditions}
            onChange={(e) => setOtherConditions(e.target.value)}
            className='text-sm w-full h-8'
          />
        </div>

        <Button
          onClick={handleApplyFilter}
          className='hover:bg-blue-600 bg-blue-400 text-white px-6 py-2 rounded-md self-end'
        >
          提案
        </Button>
      </div>
    </div>
  );
};
