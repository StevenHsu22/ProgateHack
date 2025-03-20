import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from '@/components/ui/select';

interface SelectInputProps {
  selectTriggerName: string;
  selectLabelName: string;
  selectItems: string[];
}

export const SelectInput = ({
  selectTriggerName,
  selectLabelName,
  selectItems,
}: SelectInputProps) => {
  return (
    <div className='flex flex-col gap-1 '>
      <label className=' font-bold text-xl'>{selectLabelName}</label>
      <Select>
        <SelectTrigger className='w-4/5 hover:border-blue-300 hover:cursor-pointer '>
          <SelectValue placeholder={selectTriggerName} />
        </SelectTrigger>
        <SelectContent>
          {selectItems.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
