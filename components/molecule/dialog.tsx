'use client';
import { useAtom } from 'jotai';
import { Button } from '../ui/button';
import { dialogState } from '@/store/dialogState';
export const Dialog = () => {
  const [dialog, setDialog] = useAtom(dialogState);

  if (!dialog) return null;
  const handleConfirm = () => {
    if (dialog.confirm) {
      dialog.confirm();
    }
    setDialog(null);
  };
  const handleCancel = () => {
    if (dialog.cancel) {
      dialog.cancel();
    }
    setDialog(null);
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='absolute inset-0 bg-black opacity-50' />
      <div className='relative w-1/2 h-1/4 bg-white rounded-xl shadow-lg p-6 overflow-auto flex flex-col items-center justify-center gap-4 z-10'>
        <h2>{dialog.title}</h2>
        <p className='text-left w-2/3 min-h-xl'>{dialog.content}</p>
        <div className='flex justify-between gap-6'>
          <Button
            onClick={handleConfirm}
            className='w-24 bg-blue-400 hover:bg-blue-600'
          >
            OK
          </Button>
          <Button onClick={handleCancel} className='w-24 bg-gray-400'>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
