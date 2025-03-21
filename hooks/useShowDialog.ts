import { useAtom } from 'jotai';

import { dialogState } from '@/store/dialogState';
import { dialogInterface } from '@/types/dialogInterface';
export const useShowDialog = () => {
  const [dialogStateValue, setDialogStateValue] = useAtom(dialogState);

  const dialog = ({ title, content }: dialogInterface) => {
    return new Promise((resolve) => {
      setDialogStateValue({
        title,
        content,
        confirm: () => {
          resolve(true);
        },
        cancel: () => {
          resolve(false);
        },
      });
    });
  };

  return dialog;
};
