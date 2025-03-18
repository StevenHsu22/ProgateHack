import { X } from 'lucide-react';

import { PageContainer } from '@/components/atom/pageContainer';

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
      <div className='relative w-1/2 h-4/5 bg-white rounded-xl shadow-lg p-6'>
        <button
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
          onClick={onClose}
        >
          <X />
        </button>
        <h2 className='text-2xl font-bold mb-4'>新しい食材を追加</h2>
        {/* モーダルの内容をここに追加 */}
      </div>
    </div>
  );
};
