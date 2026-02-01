import { Shield, Mail, Trash2, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { SectionTitle } from "./SectionTitle";
import type { ReactNode } from "react";

interface PreferenceRowProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children: ReactNode;
  danger?: boolean;
}

export function PreferenceRow({
  icon: Icon,
  title,
  description,
  children,
  danger,
}: PreferenceRowProps) {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl border ${
        danger ? "bg-red-50/50 border-red-200" : "bg-background border-border"
      }`}
    >
      <div className="flex gap-4">
        <div
          className={`size-10 rounded-lg flex items-center justify-center ${
            danger ? "bg-red-100 text-red-600" : "bg-muted"
          }`}
        >
          {<Icon />}
        </div>

        <div>
          <p className="font-bold text-sm">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>

      {children}
    </div>
  );
}
export function AccountPreferencesSection() {
  return (
    <section className="space-y-6 pb-20">
      <SectionTitle title="Account Preferences" />

      <PreferenceRow
        icon={Shield}
        title="Two-Factor Authentication"
        description="Add an extra layer of security to your account."
      >
        <Button size="sm" variant="secondary">
          Enable
        </Button>
      </PreferenceRow>

      <PreferenceRow
        icon={Mail}
        title="Marketing Emails"
        description="Receive news about product updates and features."
      >
        <Switch defaultChecked />
      </PreferenceRow>

      <PreferenceRow
        danger
        icon={Trash2}
        title="Delete Account"
        description="Permanently delete your account and all associated data."
      >
        <Button size="sm" variant="destructive">
          Terminate
        </Button>
      </PreferenceRow>
    </section>
  );
}
