import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SettingsHeaderProps {
  title: string;
  description: string;
  hideButton?: boolean;
}

export function SettingsHeader({
  title,
  description,
  hideButton,
}: SettingsHeaderProps) {
  return (
    <div className="sticky top-16.25 z-40 bg-background border-b px-8 py-8 flex  justify-between  w-full">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight leading-tight text-black text-left">
          {title}
        </h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="flex items-center gap-3">
        {!hideButton && (
          <>
            <Button variant="ghost">Discard</Button>
            <Button className="gap-2">
              <Save className="size-4" />
              Save Changes
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
