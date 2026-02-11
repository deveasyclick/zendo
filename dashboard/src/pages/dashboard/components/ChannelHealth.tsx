import { LucideMessagesSquare, Phone, Users2 } from "lucide-react";
import { ChannelRow } from "./ChannelRow";
import { HourlyChart } from "./HourlyChat";

export function ChannelHealth() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Channel Health</h3>

      <div className="p-6 rounded-xl border space-y-6">
        <ChannelRow
          icon={Phone}
          name="WhatsApp"
          subtitle="API v2.4 Active"
          status="OPERATIONAL"
          statusColor="green"
        />

        <ChannelRow
          icon={LucideMessagesSquare}
          name="Slack"
          subtitle="Connected to #support"
          status="CONNECTED"
          statusColor="purple"
        />

        <ChannelRow
          icon={Users2}
          name="MS Teams"
          subtitle="Auth refresh required"
          status="PENDING"
          statusColor="blue"
        />

        <HourlyChart />
      </div>
    </div>
  );
}
