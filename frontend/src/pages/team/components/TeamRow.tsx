import { Button } from "@/components/ui/button";
import type { TeamMember } from "../types";

export function TeamRow({ member }: { member: TeamMember }) {
  return (
    <tr className="hover:bg-muted/50 transition">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <img src={member.avatar} className="size-10 rounded-full" />
          <div>
            <p className="font-bold text-sm">{member.name}</p>
            <p className="text-xs text-muted-foreground">{member.email}</p>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <span className="text-xs font-bold px-3 py-1 rounded-lg bg-primary/10 text-primary">
          {member.role}
        </span>
      </td>

      <td className="px-6 py-4">
        <span className="text-xs font-semibold">{member.status}</span>
      </td>

      <td className="px-6 py-4 text-xs text-muted-foreground">
        {member.lastActive}
      </td>

      <td className="px-6 py-4 text-right">
        <Button size="icon" variant="ghost">
          ⋮
        </Button>
      </td>
    </tr>
  );
}
