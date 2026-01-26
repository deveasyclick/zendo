import { Button } from "@/components/ui/button";
import { ActivityItem } from "./ActivityItem";
import { AlertTriangle, MessageSquareText, UserPlus } from "lucide-react";

export function RecentActivity() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Recent Activity</h3>
        <Button variant="link">View all feed</Button>
      </div>

      <div className="rounded-xl border divide-y">
        <ActivityItem
          icon={MessageSquareText}
          title="New message from Sarah on WhatsApp"
          time="2m ago"
          description="How do I upgrade my current enterprise plan?"
          actions
          color="green"
        />

        <ActivityItem
          icon={UserPlus}
          title="Agent Marcus joined Chat #402"
          time="15m ago"
          description="Inbound request from organic search (Google)."
          color="blue"
        />

        <ActivityItem
          icon={AlertTriangle}
          title="High volume alert: Slack Integration"
          time="45m ago"
          description="Wait time exceeding 5 minutes."
          color="orange"
        />
      </div>
    </div>
  );
}
