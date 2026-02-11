import { ChatWindow } from "./components/ChatWindow";
import { InboxList } from "./components/InboxList";
import { UserProfile } from "./components/UserProfile";

export default function ConversationsPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark">
      {/* Inbox */}
      <InboxList />

      {/* Chat */}
      <ChatWindow />

      {/* User profile */}
      <UserProfile />
    </div>
  );
}
