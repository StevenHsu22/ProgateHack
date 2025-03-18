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
    <div className='flex flex-col gap-1 w-xl'>
      <label className=' font-bold text-xl'>{selectLabelName}</label>
      <Select>
        <SelectTrigger className='w-full'>
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
