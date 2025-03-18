import { Input } from '@/components/ui/input';

import { IngredientUnitType } from '@/types/ingredientUnitType';
interface TextInputBoxProps {
  label: string;
  placeholder: string;
}

export const InputBox = ({ label, placeholder }: TextInputBoxProps) => {
  return (
    <div className='flex flex-col gap-1 w-xl'>
      <label className=' font-bold text-xl'>{label}</label>
      <Input placeholder={placeholder} />
    </div>
  );
};
