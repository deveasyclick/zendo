import { Search } from "lucide-react";
import { InboxItem } from "./InboxItem";

export function InboxList() {
  return (
    <section className="w-80 border-r border-[#d1e2e6] dark:border-gray-700 flex flex-col bg-[#f8fbfb] dark:bg-background-dark/50 shrink-0">
      {/* Header */}
      <div className="p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Inbox</h2>
          <span className="material-symbols-outlined text-[#508a95] cursor-pointer">
            <Search />
          </span>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#d1e2e6] dark:border-gray-700 gap-4">
          <button className="border-b-[3px] border-primary text-primary pb-2 pt-1">
            <p className="text-xs font-bold uppercase tracking-wider">
              Active (4)
            </p>
          </button>
          <button className="border-b-[3px] border-transparent text-[#508a95] pb-2 pt-1">
            <p className="text-xs font-bold uppercase tracking-wider">Queue</p>
          </button>
          <button className="border-b-[3px] border-transparent text-[#508a95] pb-2 pt-1">
            <p className="text-xs font-bold uppercase tracking-wider">Closed</p>
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {/* Selected */}
        <InboxItem
          active
          name="Sarah Jenkins"
          time="Just now"
          subtitle="Typing..."
        />

        <InboxItem
          name="Marcus Chen"
          time="12m"
          subtitle="Thanks for the help! I'll check my..."
        />
        <InboxItem
          name="Lena Johanson"
          time="24m"
          subtitle="Can I upgrade my subscription mid-month?"
        />
        <InboxItem
          name="David Smith"
          time="1h"
          subtitle="I still can't see the new project dashboard."
        />
      </div>
    </section>
  );
}
