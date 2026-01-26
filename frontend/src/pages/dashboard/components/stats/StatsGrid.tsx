import { Clock, Eye, MessageSquareText } from "lucide-react";
import { StatCard } from "./StatCard";

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        icon={MessageSquareText}
        title="Active Chats"
        value="24"
        badge="+12% vs last hr"
        color="primary"
      />

      <StatCard
        icon={Eye}
        title="Online Visitors"
        value="158"
        footer="Live tracking active"
        color="orange"
      />

      <StatCard
        icon={Clock}
        title="Avg. Response Time"
        value="1m 45s"
        badge="Optimal"
        color="blue"
      />
    </div>
  );
}
