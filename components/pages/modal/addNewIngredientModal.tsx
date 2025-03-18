import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { TextInputBox } from '@/components/molecule/addNewIngredientModal/textInputBox';
import { SelectInput } from '@/components/molecule/addNewIngredientModal/selectInput';

import { Unit } from '@/types/ingredients';
import { Input } from '@/components/ui/input';

const dummyUnitOptions: Unit[] = ['個', 'g', 'ml', '束', '本', '枚', 'パック'];
const dummyCategoryOptions: string[] = ['野菜', '肉', '魚'];

interface AddNewIngredientModalProps {
  onClose: () => void;
}

export const AddNewIngredientModal = ({
  onClose,
}: AddNewIngredientModalProps) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div
        className='absolute inset-0 bg-black opacity-50'
        onClick={onClose}
      ></div>
      <div className='relative w-1/2 h-4/5 bg-white rounded-xl shadow-lg p-6 overflow-auto'>
        <button
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
          onClick={onClose}
        >
          <X />
        </button>
        <h2 className='text-2xl font-bold mb-4'>新しい食材を追加</h2>
        <div className='border-t mx-3 my-2'></div>
        <div className='w-full items-center h-20'>
          <Input type='file' />
        </div>
        {/* 画像いれるかも */}
        <div className='w-full h-fill grid grid-cols-2 justify-between px-2 gap-6'>
          <TextInputBox label='食材名' placeholder='例: トマト' type='text' />
          <SelectInput
            selectTriggerName='例: 野菜'
            selectLabelName='カテゴリ'
            selectItems={dummyCategoryOptions}
          />
          {/*とりあえずずdummy data で作成*/}
          <TextInputBox label='数量' placeholder='例: 1' type='number' />
          <SelectInput
            selectTriggerName='例: 個'
            selectLabelName='単位'
            selectItems={dummyUnitOptions}
          />
          <TextInputBox
            label='賞味期限'
            placeholder='例: 2022-12-31'
            type='date'
          />
          <TextInputBox
            label='説明(任意)'
            placeholder='例: ちょっと枯れてる'
            type='text'
          />
        </div>
        <div className='flex justify-end mt-4 '>
          <Button className=' mt-10 mr-1 py-2 w-40 font-bold text-xl'>
            追加
          </Button>
        </div>
      </div>
    </div>
  );
};
