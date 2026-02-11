import { Switch } from "@/components/ui/switch";
import { type LucideIcon } from "lucide-react";
import { type Control, useController } from "react-hook-form";

interface Props {
  control: Control<any>;
  name: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export function ToggleRow({
  control,
  name,
  title,
  description,
  icon: Icon,
}: Props) {
  const { field } = useController({ control, name });

  return (
    <div className="flex items-center justify-between rounded-xl border bg-background p-4">
      <div className="flex gap-4">
        <div className="flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <Icon size={20} />
        </div>
        <div>
          <p className="font-semibold text-sm">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <Switch checked={field.value} onCheckedChange={field.onChange} />
    </div>
  );
}
