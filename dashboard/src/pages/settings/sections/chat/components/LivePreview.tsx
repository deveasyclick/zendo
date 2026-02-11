import { useFormContext } from "react-hook-form";
import type { ChatFormValues } from "../schemas/chat.schema";
import { MessageSquareText } from "lucide-react";
import { cn } from "@/lib/utils";

export const LivePreview: React.FC = () => {
  const { watch } = useFormContext<ChatFormValues>();
  const { widgetPosition, greetingMessage, widgetTitle, themeColor } = watch();

  return (
    <div className="bg-slate-200/40 dark:bg-slate-800 rounded-2xl p-6 border-2 border-dashed border-slate-300 dark:border-slate-700">
      <div className="flex items-center justify-between mb-4 px-2">
        <span className="text-xs font-black uppercase tracking-widest text-slate-400">
          Live Preview
        </span>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 aspect-3/4 relative">
        <div
          className={`absolute bottom-4 ${widgetPosition === "bottom-right" ? "right-4" : "left-4"} flex flex-col items-end gap-3 z-10`}
        >
          <div className="w-64 bg-white dark:bg-slate-900 shadow-xl border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden flex flex-col">
            <div
              className={cn("bg-primary p-4 text-white")}
              style={{ backgroundColor: themeColor }}
            >
              <div className="flex items-center justify-between mb-1">
                <p className="font-bold text-sm">{widgetTitle}</p>
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 flex-1">
              <div className="bg-white dark:bg-slate-900 p-3 rounded-xl rounded-bl-none shadow-sm text-xs mb-2 max-w-[85%] border border-slate-100 dark:border-slate-800">
                {greetingMessage}
              </div>
            </div>
          </div>
          <div className="size-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/40 ring-4 ring-white dark:ring-slate-900">
            <span className="material-symbols-outlined">
              <MessageSquareText />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
