// app/settings/notifications/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Mail,
  Globe,
  Volume2,
  UserPlus,
  MessageSquare,
  ClipboardCheck,
  BarChart,
  Clock,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  notificationSchema,
  type NotificationFormValues,
} from "./notification.schema";
import { ToggleRow } from "./components/ToggleRow";
import { SectionHeader } from "./components/SectionHeader";
import { DayPicker } from "./components/DayPicker";
import { SettingsHeader } from "../../components/Header";

export default function NotificationSettingsPage() {
  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      browser: {
        newChat: true,
        visitorOnline: false,
        assignedChat: true,
      },
      email: {
        missedChats: true,
        dailyDigest: false,
      },
      sounds: {
        enabled: true,
        sound: "crystal",
        volume: 65,
      },
      dnd: {
        enabled: true,
        start: "18:00",
        end: "09:00",
        days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      },
    },
  });

  const { control, watch } = form;

  return (
    <form
      onSubmit={form.handleSubmit(console.log)}
      className="w-full flex flex-col items-center h-screen"
    >
      {/* Header */}
      <SettingsHeader
        title="Notification Settings"
        description="Manage how you receive alerts."
      />

      <div className="flex-1 space-y-10 w-3xl mt-18">
        <div>
          {/* Browser */}
          <section className="space-y-6">
            <SectionHeader title="Browser Notifications" icon={Globe} />
            <ToggleRow
              control={control}
              name="browser.newChat"
              title="New incoming chat"
              description="Notify me when a customer starts a new conversation."
              icon={MessageSquare}
            />
            <ToggleRow
              control={control}
              name="browser.visitorOnline"
              title="Visitor online"
              description="Notify me when a high-value visitor lands."
              icon={UserPlus}
            />
            <ToggleRow
              control={control}
              name="browser.assignedChat"
              title="Chat assigned to me"
              description="Notify me when a chat is assigned."
              icon={ClipboardCheck}
            />
          </section>

          {/* Email */}
          <section className="space-y-6">
            <SectionHeader title="Email Alerts" icon={Mail} />
            <ToggleRow
              control={control}
              name="email.missedChats"
              title="Missed chats (offline)"
              description="Get an email when you're away."
              icon={Mail}
            />
            <ToggleRow
              control={control}
              name="email.dailyDigest"
              title="Daily activity digest"
              description="Daily performance summary."
              icon={BarChart}
            />
          </section>

          {/* Sounds */}
          <section className="space-y-6">
            <SectionHeader title="Desktop Sounds" icon={Volume2} />

            <div className="rounded-xl border bg-background p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm">
                    Enable notification sounds
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Play sound alerts for activity.
                  </p>
                </div>
                <Switch {...form.register("sounds.enabled")} />
              </div>

              <div className="grid md:grid-cols-2 gap-6 border-t pt-6">
                <Select
                  value={watch("sounds.sound")}
                  onValueChange={(v) => form.setValue("sounds.sound", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="crystal">Crystal (Default)</SelectItem>
                    <SelectItem value="ping">Subtle Ping</SelectItem>
                    <SelectItem value="chime">Modern Chime</SelectItem>
                  </SelectContent>
                </Select>

                <Slider
                  value={[watch("sounds.volume")]}
                  max={100}
                  step={1}
                  onValueChange={([v]) => form.setValue("sounds.volume", v)}
                />
              </div>
            </div>
          </section>

          {/* DND */}
          <section className="space-y-6">
            <SectionHeader title="Offline Hours" icon={Clock} />

            <div className="rounded-2xl border bg-primary/5 p-6 space-y-6">
              <div className="flex justify-between">
                <div>
                  <p className="font-bold">Do Not Disturb</p>
                  <p className="text-sm text-muted-foreground">
                    Silence notifications outside work hours.
                  </p>
                </div>
                <Switch {...form.register("dnd.enabled")} />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Input type="time" {...form.register("dnd.start")} />
                <Input type="time" {...form.register("dnd.end")} />
              </div>

              <DayPicker
                value={watch("dnd.days")}
                onChange={(days) => form.setValue("dnd.days", days)}
              />
            </div>
          </section>
        </div>
      </div>
    </form>
  );
}
