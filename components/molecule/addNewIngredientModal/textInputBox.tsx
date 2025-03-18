import { Input } from '@/components/ui/input';

type inputType = 'text' | 'number' | 'date';

interface TextInputBoxProps {
  label: string;
  placeholder: string;
  type: inputType;
}

export const TextInputBox = ({
  label,
  placeholder,
  type,
}: TextInputBoxProps) => {
  return (
    <div className='flex flex-col gap-1 '>
      <label className=' font-bold text-xl'>{label}</label>
      <Input
        placeholder={placeholder}
        type={type}
        className=' hover:border-blue-300'
      />
    </div>
  );
};
