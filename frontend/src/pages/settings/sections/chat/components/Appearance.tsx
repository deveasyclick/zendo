import { Controller, useFormContext } from "react-hook-form";
import type { ChatFormValues } from "../schemas/chat.schema";
import { THEME_COLORS } from "../constants";
import { Plus } from "lucide-react";

const ThemeColorPicker: React.FC = () => {
  const { control } = useFormContext<ChatFormValues>();

  return (
    <div className="space-y-3">
      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
        Theme Color
      </label>
      <Controller
        name="themeColor"
        control={control}
        render={({ field }) => (
          <div className="flex flex-wrap gap-4">
            {THEME_COLORS.map((color) => (
              <label
                key={color}
                className={`size-10 rounded-full border-4 border-white dark:border-slate-900 shadow-sm cursor-pointer hover:scale-110 transition-transform ${
                  field.value === color
                    ? "ring-2 ring-primary ring-offset-2 dark:ring-offset-slate-900"
                    : ""
                }`}
                style={{ backgroundColor: color }}
              >
                <input
                  type="radio"
                  className="sr-only"
                  value={color}
                  checked={field.value === color}
                  onChange={() => field.onChange(color)}
                />
              </label>
            ))}
            <div className="relative group">
              <div className="size-10 rounded-full border-4 border-white dark:border-slate-900 shadow-sm flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500 cursor-pointer">
                <span className="material-symbols-outlined text-sm">
                  <Plus size={12} />
                </span>
              </div>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export const WidgetPositionSelector: React.FC = () => {
  const { control } = useFormContext<ChatFormValues>();

  return (
    <div className="space-y-3">
      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
        Widget Position
      </label>
      <Controller
        name="widgetPosition"
        control={control}
        render={({ field }) => (
          <div className="flex p-1 bg-slate-200/50 dark:bg-slate-800/50 rounded-xl w-fit">
            <button
              type="button"
              onClick={() => field.onChange("bottom-right")}
              className={`px-6 py-2 rounded-lg text-sm font-bold ${
                field.value === "bottom-right"
                  ? "bg-background-light dark:bg-slate-700 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700"
              }`}
            >
              Bottom Right
            </button>
            <button
              type="button"
              onClick={() => field.onChange("bottom-left")}
              className={`px-6 py-2 rounded-lg text-sm font-bold ${
                field.value === "bottom-left"
                  ? "bg-background-light dark:bg-slate-700 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700"
              }`}
            >
              Bottom Left
            </button>
          </div>
        )}
      />
    </div>
  );
};

export const Appearance: React.FC = () => (
  <section className="space-y-6">
    <div className="flex items-center gap-2">
      <h2 className="text-xl font-bold">Appearance</h2>
      <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800 ml-2" />
    </div>
    <ThemeColorPicker />
    <WidgetPositionSelector />
  </section>
);
