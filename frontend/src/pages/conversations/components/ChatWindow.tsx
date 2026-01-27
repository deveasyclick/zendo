import { Button } from "@/components/ui/button";
import {
  AgentMessage,
  DateSeparator,
  SystemMessage,
  VisitorMessage,
} from "./Chat";
import { MessageInput } from "./MessageInput";

export function ChatWindow() {
  return (
    <main className="flex-1 flex flex-col bg-white dark:bg-background-dark">
      {/* Header */}
      <header className="h-16 border-b border-[#d1e2e6] dark:border-gray-700 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-bold">Sarah Jenkins</h2>
          <div className="flex items-center gap-1.5 bg-green-50 px-2 py-0.5 rounded border border-green-100">
            <span className="size-1.5 rounded-full bg-green-500" />
            <span className="text-[10px] font-bold text-green-600 uppercase">
              Live
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Transfer
          </Button>
          <Button size="sm">Resolve</Button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        <DateSeparator />

        <SystemMessage text="Alex Rivera joined the conversation" />

        <VisitorMessage
          text="Hi, I'm trying to upgrade my account but the payment button seems to be disabled. Can you help me out?"
          time="11:02 AM"
        />

        <AgentMessage
          text="Hello Sarah! I'd be happy to help. Let me check your profile."
          time="11:04 AM"
        />

        <VisitorMessage
          text="Okay, thank you! I'm on the Pro Annual plan currently and want to move to Enterprise."
          time="11:05 AM"
        />
      </div>

      {/* Input */}
      <MessageInput />
    </main>
  );
}
