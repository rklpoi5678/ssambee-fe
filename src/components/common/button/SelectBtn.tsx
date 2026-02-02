import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectOption = {
  label: string;
  value: string;
};

type CommonSelectProps = {
  id?: string;
  value: string;
  onChange?: (value: string) => void; // API 연동 후 옵셔널 제거
  placeholder: string;
  options: SelectOption[];
  className?: string;
  disabled?: boolean;
};

export default function SelectBtn({
  id,
  value,
  onChange,
  placeholder,
  options,
  className,
  disabled,
}: CommonSelectProps) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger
        id={id}
        className={`${className ?? ""} gap-2 cursor-pointer`.trim()}
        disabled={disabled}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            className="cursor-pointer"
            key={option.value}
            value={option.value}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
