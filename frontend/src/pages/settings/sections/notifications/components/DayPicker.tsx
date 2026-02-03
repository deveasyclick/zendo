const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface Props {
  value: string[];
  onChange: (days: string[]) => void;
}

export function DayPicker({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {DAYS.map((day) => {
        const active = value.includes(day);
        return (
          <button
            key={day}
            type="button"
            onClick={() =>
              onChange(
                active ? value.filter((d) => d !== day) : [...value, day],
              )
            }
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              active
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/70"
            }`}
          >
            {day}
          </button>
        );
      })}
    </div>
  );
}
