import { Input } from '@/components/ui/input';

type inputType = 'text' | 'number' | 'date';

interface TextInputBoxProps {
  label: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInputBox = ({
  label,
  placeholder,
  type,
  value,
  onChange,
}:  TextInputBoxProps) => {
  return (
    <div className='flex flex-col gap-1 '>
      <label className=' font-bold text-xl'>{label}</label>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className=' hover:border-blue-300'
      />
    </div>
  );
};
