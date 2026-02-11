import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DayKey =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

interface BusinessHour {
  day: string;
  key: DayKey;
  open: string;
  close: string;
  enabled: boolean;
}

const DEFAULT_HOURS: BusinessHour[] = [
  {
    day: "Monday",
    key: "monday",
    open: "09:00",
    close: "18:00",
    enabled: true,
  },
  {
    day: "Tuesday",
    key: "tuesday",
    open: "09:00",
    close: "18:00",
    enabled: true,
  },
  {
    day: "Wednesday",
    key: "wednesday",
    open: "09:00",
    close: "18:00",
    enabled: true,
  },
  {
    day: "Thursday",
    key: "thursday",
    open: "09:00",
    close: "18:00",
    enabled: true,
  },
  {
    day: "Friday",
    key: "friday",
    open: "09:00",
    close: "18:00",
    enabled: true,
  },
  { day: "Weekend", key: "saturday", open: "", close: "", enabled: false },
];

export function BusinessHours() {
  const [hours, setHours] = useState<BusinessHour[]>(DEFAULT_HOURS);

  const updateHour = (
    index: number,
    field: keyof BusinessHour,
    value: string | boolean,
  ) => {
    setHours((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
          Business Hours
        </label>
        <Button variant="link" className="px-0 text-xs font-bold">
          Add Exception
        </Button>
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 bg-background">
        {hours.map((item, index) => (
          <div
            key={item.key}
            className={cn(
              "flex items-center justify-between p-4",
              !item.enabled &&
                "bg-slate-50/50 dark:bg-slate-900/20 text-slate-400",
            )}
          >
            <div className="flex items-center gap-8">
              <span className="w-24 text-sm font-medium">{item.day}</span>

              {item.enabled ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={item.open}
                    onChange={(e) => updateHour(index, "open", e.target.value)}
                    className="w-20 text-center text-xs bg-slate-50 dark:bg-slate-700"
                  />
                  <span className="text-slate-400">—</span>
                  <Input
                    value={item.close}
                    onChange={(e) => updateHour(index, "close", e.target.value)}
                    className="w-20 text-center text-xs bg-slate-50 dark:bg-slate-700"
                  />
                </div>
              ) : (
                <span className="text-xs italic">Closed</span>
              )}
            </div>

            <Switch
              checked={item.enabled}
              onCheckedChange={(checked) =>
                updateHour(index, "enabled", checked)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
