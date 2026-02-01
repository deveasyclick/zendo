import { useFormContext, Controller } from "react-hook-form";
import type { ChatFormValues } from "../schemas/chat.schema";

export const Features: React.FC = () => {
  const { control } = useFormContext<ChatFormValues>();
  const features = [
    {
      name: "enableFileUploads",
      title: "Enable File Uploads",
      description: "Allow customers to send images and documents.",
      disabled: false,
    },
    {
      name: "showAgentAvatars",
      title: "Show Agent Avatars",
      description: "Display profile pictures of your support team.",
      disabled: false,
    },
    {
      name: "removePoweredBy",
      title: "Remove 'Powered by Zendo'",
      description: "Only available on Enterprise plans.",
      disabled: true,
    },
  ] as const;

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold">Feature Toggles</h2>
        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800 ml-2" />
      </div>
      <div className="space-y-4">
        {features.map((f) => (
          <Controller
            key={f.name}
            name={`features.${f.name}` as const}
            control={control}
            render={({ field }) => (
              <div
                className={`flex items-center justify-between p-4 bg-background-light dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 ${f.disabled ? "opacity-60" : ""}`}
              >
                <div>
                  <p className="font-bold text-sm">{f.title}</p>
                  <p className="text-xs text-slate-500">{f.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    disabled={f.disabled}
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            )}
          />
        ))}
      </div>
    </section>
  );
};
