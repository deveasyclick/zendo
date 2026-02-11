import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MoreVertical, Wrench } from "lucide-react";
import { SettingsHeader } from "../../components/Header";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { webhookSchema, type WebhookFormValues } from "./webhooks.schema";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Webhook } from "@/types/webhook";
import { SectionHeader } from "./components/SectionHeader";

const EVENTS = [
  "chat.started",
  "message.received",
  "message.read",
  "chat.ended",
  "agent.assigned",
] as const;

export default function WebhookSettingsPage() {
  const form = useForm<WebhookFormValues>({
    resolver: zodResolver(webhookSchema),
    defaultValues: {
      url: "",
      description: "",
      events: ["chat.started", "message.received"],
    },
  });
  const webhooks: Webhook[] = [
    {
      id: "1",
      url: "https://example.com/webhook",
      events: ["message.read", "chat.ended"],
      status: "failed",
      createdAt: "2025-12-06",
    },
    {
      id: "1",
      url: "https://zendo.com/webhook",
      events: ["message.read"],
      status: "active",
      createdAt: "2025-12-06",
    },
  ];

  const addWebhook = () => {};
  return (
    <form
      onSubmit={form.handleSubmit(console.log)}
      className="w-full flex flex-col items-center h-screen"
    >
      {/* Header */}
      <SettingsHeader
        title="Webhooks"
        description="Manage your real-time event subscriptions and endpoint integrations"
        hideButton
      />

      <div className="flex-1 space-y-10 w-3xl mt-18">
        {/* Configure New Endpoints */}
        <section className="space-y-6">
          <SectionHeader title="Configure New Endpoints" icon={Wrench} />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(addWebhook)}
              className="rounded-2xl border bg-background p-6 space-y-6"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Endpoint URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://your-api.com/webhooks/zendo"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Customer CRM integration"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="events"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Events to Subscribe</FormLabel>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {EVENTS.map((event) => (
                        <label
                          key={event}
                          className="flex items-center gap-3 rounded-xl border bg-muted/50 p-3 cursor-pointer"
                        >
                          <Checkbox
                            checked={field.value?.includes(event)}
                            onCheckedChange={(checked) => {
                              const next = checked
                                ? [...field.value, event]
                                : field.value.filter((e) => e !== event);
                              field.onChange(next);
                            }}
                          />
                          <span className="text-xs font-medium">{event}</span>
                        </label>
                      ))}
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit">Add Endpoint</Button>
              </div>
            </form>
          </Form>
        </section>

        {/* Active Webhooks */}
        <section className="space-y-6">
          <SectionHeader title="Active Webhooks" icon={Mail} />
          <div className="overflow-hidden rounded-2xl border bg-background">
            <table className="w-full text-sm shadow-none">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="px-6 py-4 text-left text-[10px] uppercase text-muted-foreground">
                    Webhook URL
                  </th>
                  <th className="px-6 py-4 text-left text-[10px] uppercase text-muted-foreground">
                    Events
                  </th>
                  <th className="px-6 py-4 text-left text-[10px] uppercase text-muted-foreground">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-[10px] uppercase text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {webhooks.map((hook) => (
                  <tr key={hook.id} className="hover:bg-muted/30">
                    <td className="px-6 py-4">
                      <p className="font-medium">{hook.url}</p>
                      <p className="text-xs text-muted-foreground">
                        Created {hook.createdAt}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {hook.events.slice(0, 1).map((e) => (
                          <span
                            key={e}
                            className="rounded bg-muted px-2 py-0.5 text-[10px]"
                          >
                            {e}
                          </span>
                        ))}
                        {hook.events.length > 1 && (
                          <span className="rounded bg-muted px-2 py-0.5 text-[10px]">
                            +{hook.events.length - 1} more
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div
                        className={`flex items-center gap-1.5 text-xs font-bold uppercase ${
                          hook.status === "active"
                            ? "text-emerald-500"
                            : "text-red-500"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            hook.status === "active"
                              ? "bg-emerald-500"
                              : "bg-red-500"
                          }`}
                        />
                        {hook.status}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          className="text-primary hover:bg-primary hover:text-white cursor-pointer"
                          variant="outline"
                          size="sm"
                          onClick={() => {}}
                        >
                          Test
                        </Button>
                        <Button
                          className="hover:bg-secondary hover:text-white cursor-pointer"
                          variant="ghost"
                          size="icon"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </form>
  );
}
