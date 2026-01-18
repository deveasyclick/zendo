import { Icons } from "./icons";

type IconNames = keyof typeof Icons;

interface IconProps {
  name: IconNames;
  className?: string;
}

const Icon = ({ name, className }: IconProps) => {
  const Icon = Icons[name];
  return <Icon width={24} height={24} className={className} />;
};

export default Icon;
