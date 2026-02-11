import { Badge } from "@/components/ui/badge";
import { ArrowRight, CodeSquareIcon } from "lucide-react";

export function CustomWebhookCard() {
  return (
    <div className="relative rounded-xl bg-primary text-white p-6 shadow-lg overflow-hidden cursor-pointer group">
      <span className="material-symbols-outlined absolute -right-10 -bottom-10 text-[180px] opacity-10 group-hover:scale-110 transition-transform">
        code
      </span>

      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="flex justify-between mb-4">
            <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">
                <CodeSquareIcon />
              </span>
            </div>
            <Badge className="bg-white/20 text-white">Advanced</Badge>
          </div>

          <h3 className="text-xl font-bold mb-1">Custom Webhooks</h3>
          <p className="text-white/80 text-sm mb-6">
            Connect any internal tool or unsupported platform using REST APIs.
          </p>
        </div>

        <div className="flex items-center gap-2 font-bold text-sm">
          Read Documentation
          <span className="material-symbols-outlined">
            <ArrowRight />
          </span>
        </div>
      </div>
    </div>
  );
}
