import { type LucideIcon } from "lucide-react";

interface Props {
  title: string;
  icon: LucideIcon;
}

export function SectionHeader({ title, icon: Icon }: Props) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="text-primary" />
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
    </div>
  );
}
