'use client';
import { useState } from 'react';

import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { TextInputBox } from '@/components/molecule/addNewIngredientModal/textInputBox';
import { SelectInput } from '@/components/molecule/addNewIngredientModal/selectInput';

import { Unit } from '@/types/ingredients';
import { Input } from '@/components/ui/input';

import { addIngredient } from '@/lib/api/ingredients';
import { Ingredient, IngredientCategory } from '@/types/ingredients';

const dummyUnitOptions: Unit[] = ['個', 'g', 'ml', '束', '本', '枚', 'パック'];
const dummyCategoryOptions: string[] = ['野菜', '肉', '魚'];

interface AddNewIngredientModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export const AddNewIngredientModal = ({
  onClose,
  onSuccess,
}: AddNewIngredientModalProps) => {
  const defaultDate = new Date().toISOString().split('T')[0];
  
  const [formData, setFormData] = useState({
    name: '',
    category: dummyCategoryOptions[0],
    quantity: 1,
    unit: dummyUnitOptions[0],
    expirationDate: defaultDate,
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: string, value: string | number | Date) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    console.log('Submit formData:', formData);
    
    if (!formData.name || !formData.unit || formData.quantity <= 0) {
      setError('食材名、数量、単位は必須です');
      return;
    }

    try {
      setLoading(true);
      const newIngredient = {
        name: formData.name,
        category: formData.category as IngredientCategory,
        quantity: formData.quantity,
        unit: formData.unit as Unit,
        expirationDate: new Date(formData.expirationDate),
        notes: formData.notes || undefined,
        status: 'active' as 'active',
        updatedAt: new Date(),
      };

      await addIngredient(newIngredient);
      if (onSuccess) {
        onSuccess();
      } else {
        onClose();
      }
    } catch (err) {
      setError('食材の追加に失敗しました');
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div
        className='absolute inset-0 bg-black opacity-50'
        onClick={onClose}
      ></div>
      <div className='relative w-1/2 h-4/5 bg-white rounded-xl shadow-lg p-6 overflow-auto'>
        <button
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-700 hover:cursor-pointer'
          onClick={onClose}
        >
          <X />
        </button>
        <h2 className='text-2xl font-bold mb-4'>新しい食材を追加</h2>
        <div className='border-t mx-3 my-2'></div>

        {error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
            {error}
          </div>
        )}

        <div className='w-full items-center h-20'>
          <Input type='file' />
        </div>
        {/* 画像いれるかも */}
        <div className='w-full h-fill grid grid-cols-2 justify-between px-2 gap-6'>
          <TextInputBox
            label='食材名'
            placeholder='例: トマト'
            type='text'
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          <SelectInput
            selectTriggerName='カテゴリを選択'
            selectLabelName='カテゴリ'
            selectItems={dummyCategoryOptions}
            value={formData.category}
            onChange={(value) => handleChange('category', value)}
          />
          <TextInputBox
            label='数量'
            placeholder='例: 1'
            type='number'
            value={formData.quantity.toString()}
            onChange={(e) => {
              const val = e.target.value === '' ? 0 : parseInt(e.target.value);
              handleChange('quantity', val);
            }}
          />
          <SelectInput
            selectTriggerName='単位を選択'
            selectLabelName='単位'
            selectItems={dummyUnitOptions}
            value={formData.unit}
            onChange={(value) => handleChange('unit', value)}
          />
          <TextInputBox
            label='賞味期限'
            placeholder='例: 2022-12-31'
            type='date'
            value={formData.expirationDate}
            onChange={(e) => handleChange('expirationDate', e.target.value)}
          />
          <TextInputBox
            label='説明(任意)'
            placeholder='例: ちょっと枯れてる'
            type='text'
            value={formData.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
          />
        </div>
        <div className='flex justify-end mt-4 '>
          <Button
            className=' mt-10 mr-1 py-2 w-40 font-bold text-xl hover:cursor-pointer bg-blue-400 hover:bg-blue-200 text-white'
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? '処理中...' : '追加'}
          </Button>
        </div>
      </div>
    </div>
  );
};