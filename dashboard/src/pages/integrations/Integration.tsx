import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IntegrationCard } from "./components/IntegrationCard";
import { CustomWebhookCard } from "./components/CustomWebhookCard";
import {
  Bell,
  Link2,
  MessageSquareTextIcon,
  Phone,
  Search,
  SendHorizonal,
  Users2,
} from "lucide-react";

type SearchForm = {
  query: string;
};

export default function IntegrationsPage() {
  const { register } = useForm<SearchForm>();

  return (
    <main className="min-h-screen bg-[#f8fbfb] dark:bg-background-dark">
      {/* Top Navbar */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/80 dark:bg-background-dark/80 border-b border-border">
        <div className="mx-auto max-w-7xl px-8 py-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-6 flex-1">
            <h2 className="text-xl font-extrabold tracking-tight">
              Integrations Hub
            </h2>

            <div className="relative max-w-md w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Search />
              </span>
              <Input
                {...register("query")}
                placeholder="Search platforms..."
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button>
              <span className="material-symbols-outlined mr-2">
                <Link2 />
              </span>
              New Webhook
            </Button>

            <Button variant="secondary" size="icon">
              <span className="material-symbols-outlined">
                <Bell />
              </span>
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-8 py-10">
        {/* Heading */}

        <div className="mb-8 space-y-8">
          <CustomWebhookCard />
          <p className="text-muted-foreground text-lg max-w-2xl">
            Manage your omnichannel presence. Connect messaging apps, CRMs, and
            productivity tools to streamline your workflow.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b mb-8">
          {[
            "All Integrations",
            "Messaging",
            "Productivity",
            "CRM & Database",
          ].map((tab, i) => (
            <button
              key={tab}
              className={`pb-4 text-sm font-semibold transition-colors ${
                i === 0
                  ? "border-b-2 border-primary text-foreground"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <IntegrationCard
            title="WhatsApp Business"
            description="Official API integration for high-volume messaging."
            icon={Phone}
            color="#25D366"
            status="connected"
          />

          <IntegrationCard
            title="Slack"
            description="Sync conversations to Slack channels."
            icon={Users2}
            color="#4A154B"
          />

          <IntegrationCard
            title="Telegram"
            description="Bot-based support for Telegram users."
            icon={SendHorizonal}
            color="#0088cc"
            status="connected"
          />

          <IntegrationCard
            title="Messenger"
            description="Handle Facebook Messenger DMs."
            icon={MessageSquareTextIcon}
            color="#00B2FF"
          />
        </div>
      </section>
    </main>
  );
}
