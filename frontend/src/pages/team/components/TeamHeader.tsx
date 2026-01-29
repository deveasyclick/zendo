import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TeamHeader({ total }: { total: number }) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-8 py-4 bg-background border-b">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-extrabold">Team Members</h2>
          <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full font-bold">
            {total} Total
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          Manage your agents and access permissions
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Input placeholder="Find a member..." className="w-64" />
        <Button>Invite Member</Button>
      </div>
    </header>
  );
}
