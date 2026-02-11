import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  name: string;
  subtitle: string;
  status: string;
  statusColor: "green" | "purple" | "blue";
};

const colorMap = {
  green: "bg-primary/10 text-primary",
  purple: "bg-purple-100 text-purple-600",
  blue: "bg-blue-100 text-blue-600",
};

export function ChannelRow({
  icon: Icon,
  name,
  subtitle,
  status,
  statusColor,
}: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "size-10 rounded-lg bg-muted flex items-center justify-center",
            colorMap[statusColor],
          )}
        >
          <span className="material-symbols-outlined">{<Icon />}</span>
        </div>
        <div>
          <p className="text-sm font-bold">{name}</p>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
      </div>

      <span
        className={`text-[10px] font-bold px-2 py-1 rounded-full bg-${statusColor}-500/10 text-${statusColor}-600`}
      >
        {status}
      </span>
    </div>
  );
}
