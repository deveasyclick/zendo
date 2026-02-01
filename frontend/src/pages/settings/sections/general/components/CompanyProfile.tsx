import { Upload, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SectionTitle } from "./SectionTitle";

export function CompanyProfile() {
  return (
    <section className="space-y-6">
      <SectionTitle title="Company Profile" />

      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <label className="text-sm font-bold mb-3 block">Company Logo</label>

          <div className="relative">
            <div className="w-32 h-32 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary transition">
              <Upload className="text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground">
                JPG, PNG (Max 2MB)
              </span>
            </div>

            <button className="absolute -top-2 -right-2 bg-background border rounded-lg p-1.5">
              <X className="size-3" />
            </button>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold">Company Name</label>
            <Input defaultValue="Zendo Technologies Inc." />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold">Website URL</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm bg-muted border rounded-l-lg">
                https://
              </span>
              <Input className="rounded-l-none" defaultValue="zendo.chat" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
