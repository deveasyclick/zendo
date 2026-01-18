import { Input } from "@/components/ui/input";
import type { IconNames } from "../../types";
import Icon from "../icons";

type IconInputProps = {
  type: React.HTMLInputTypeAttribute;
  name: string;
  placeholder: string;
  iconName: IconNames;
  className?: string;
  id?: string;
  inputClassName?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const IconInput: React.FC<IconInputProps> = ({
  type,
  name,
  id,
  placeholder,
  iconName,
  inputClassName,
  onChange,
  value,
}) => {
  return (
    <div className="relative w-full">
      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <Icon name={iconName} />
      </div>
      <Input
        placeholder={placeholder}
        type={type}
        id={id}
        name={name}
        className={inputClassName}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default IconInput;
