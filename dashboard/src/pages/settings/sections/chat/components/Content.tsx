import { useFormContext, Controller } from "react-hook-form";
import type { ChatFormValues } from "../schemas/chat.schema";

export const Content: React.FC = () => {
  const { control } = useFormContext<ChatFormValues>();

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold">Content</h2>
        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800 ml-2" />
      </div>
      <div className="grid grid-cols-1 gap-6">
        <Controller
          name="greetingMessage"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Greeting Message
              </label>
              <input
                {...field}
                className="w-full bg-background-light dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
              />
            </div>
          )}
        />
        <Controller
          name="widgetTitle"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Widget Title
              </label>
              <input
                {...field}
                className="w-full bg-background-light dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
              />
            </div>
          )}
        />
      </div>
    </section>
  );
};
