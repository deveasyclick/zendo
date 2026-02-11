import { Copy, Mail, ChevronRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WidgetSetupProps {
  onNext: () => void;
}

export function WidgetSetupStep({ onNext }: WidgetSetupProps) {
  const widgetCode = `<script
  src="https://cdn.zendo.com/widget.js"
  data-id="WKS_8F22A09B"
  async>
</script>`;

  return (
    <div className="flex flex-col gap-10">
      {/* Headline */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
          Embed the Zendo widget
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Copy and paste this code snippet into your website’s{" "}
          <code className="bg-primary/10 px-1 rounded text-primary">
            &lt;head&gt;
          </code>{" "}
          or before the closing{" "}
          <code className="bg-primary/10 px-1 rounded text-primary">
            &lt;/body&gt;
          </code>{" "}
          tag to start chatting with your customers.
        </p>
      </div>

      {/* Code Block */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex gap-1.5">
            <div className="size-2.5 rounded-full bg-red-400" />
            <div className="size-2.5 rounded-full bg-amber-400" />
            <div className="size-2.5 rounded-full bg-emerald-400" />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-slate-400">
            javascript snippet
          </span>
        </div>

        <div className="p-6 md:p-8 bg-gradient-to-br from-[#162a3a] to-[#0f1b23] flex flex-col xl:flex-row gap-6">
          <pre className="flex-1 font-mono text-sm text-slate-200 bg-black/30 p-6 rounded border border-white/5 overflow-x-auto">
            {widgetCode}
          </pre>

          <div className="flex flex-col gap-3">
            <Button className="min-w-[160px] gap-2">
              <Copy className="w-4 h-4" />
              Copy Code
            </Button>

            <Button variant="secondary" className="min-w-[160px] gap-2">
              <Mail className="w-4 h-4" />
              Email Dev
            </Button>
          </div>
        </div>
      </div>

      {/* Verify Installation */}
      <div className="flex flex-col items-center gap-6">
        <Button
          size="lg"
          className="rounded-full px-10 text-lg shadow-xl"
          onClick={onNext}
        >
          Verify Installation
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
          </span>
          Waiting for your site to connect…
        </div>
      </div>

      {/* Widget Preview */}
      <div>
        <p className="text-center text-xs uppercase tracking-[0.2em] text-slate-400 mb-6">
          Widget Preview
        </p>

        <div className="relative aspect-[21/9] rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-white/5 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(theme(colors.primary)_1px,transparent_1px)] [background-size:20px_20px]" />

          {/* Mock content */}
          <div className="relative w-4/5 h-1/2 flex flex-col gap-2">
            <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded" />
            <div className="h-4 w-5/6 bg-slate-100 dark:bg-slate-800 rounded" />
          </div>

          {/* Chat widget */}
          <div className="absolute bottom-6 right-6 flex flex-col items-end gap-3">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-4 rounded-xl shadow-xl max-w-[200px] text-[10px] animate-bounce">
              Hey there! 👋 How can we help you today?
            </div>

            <div className="size-14 rounded-full bg-primary flex items-center justify-center text-white shadow-xl cursor-pointer">
              <MessageCircle className="w-7 h-7" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
