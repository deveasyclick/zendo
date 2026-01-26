import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  title: string;
  time: string;
  description: string;
  actions?: boolean;
  color: "orange" | "green" | "blue";
};

const colorMap = {
  green: "bg-primary/10 text-primary",
  orange: "bg-orange-100 text-orange-600",
  blue: "bg-blue-100 text-blue-600",
};
export function ActivityItem({
  icon: Icon,
  title,
  time,
  description,
  actions,
  color,
}: Props) {
  return (
    <div className="p-4 flex gap-4 hover:bg-muted transition-colors">
      <div
        className={cn(
          "size-10 rounded-full bg-muted flex items-center justify-center",
          colorMap[color],
        )}
      >
        <span className="material-symbols-outlined">{<Icon />}</span>
      </div>

      <div className="flex-1">
        <div className="flex justify-between">
          <p className="text-sm font-bold">{title}</p>
          <span className="text-xs text-gray-400">{time}</span>
        </div>

        <p className="text-sm text-gray-500 mt-1">{description}</p>

        {actions && (
          <div className="mt-3 flex gap-2">
            <Button size="sm">Reply Now</Button>
            <Button size="sm" variant="outline">
              Assign
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
