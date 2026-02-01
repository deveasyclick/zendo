import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <div className="sticky top-16.25 z-40 bg-background border-b px-8 py-2 flex  justify-between  w-full">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight leading-tight text-black text-left">
          General Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your company profile and account preferences.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost">Discard</Button>
        <Button className="gap-2">
          <Save className="size-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
