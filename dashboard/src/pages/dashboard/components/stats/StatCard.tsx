import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  icon: LucideIcon;
  title: string;
  value: string;
  badge?: string;
  footer?: string;
  progress?: number;
  color?: "primary" | "orange" | "blue";
};
const colorMap = {
  primary: "bg-primary/10 text-primary",
  orange: "bg-orange-100 text-orange-600",
  blue: "bg-blue-100 text-blue-600",
};
export function StatCard({
  icon: Icon,
  title,
  value,
  badge,
  footer,
  progress,
  color = "primary",
}: StatCardProps) {
  return (
    <div className="p-6 rounded-xl border bg-background shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div
          className={cn(
            `size-10 rounded-lg flex items-center justify-center`,
            colorMap[color],
          )}
        >
          <span className="material-symbols-outlined">{<Icon />}</span>
        </div>

        {badge && (
          <span
            className={cn(
              "text-xs font-bold px-2 py-1 rounded-full bg-muted",
              color === "primary" ? "text-primary" : `text-${color}-500`,
            )}
          >
            {badge}
          </span>
        )}
      </div>

      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>

      {progress && (
        <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {footer && (
        <p className="text-xs text-gray-400 mt-4 flex items-center gap-1">
          <span className="size-2 rounded-full bg-green-500 animate-pulse" />
          {footer}
        </p>
      )}
    </div>
  );
}
