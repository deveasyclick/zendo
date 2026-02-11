import { AccountPreferencesSection } from "./components/AccountPreference";
import { Localization } from "./components/Locatlization";
import { CompanyProfile } from "./components/CompanyProfile";
import { BusinessHours } from "./components/BusinessHours";
import { SettingsHeader } from "../../components/Header";

export default function GeneralSettingsPage() {
  return (
    <div className="bg-background flex flex-col">
      <SettingsHeader
        title="General Settings"
        description="Manage your company profile and account preferences."
      />
      <main className="flex-1 bg-muted/40 p-12">
        <div className="max-w-4xl mx-auto p-8 space-y-12">
          <CompanyProfile />
          <Localization />
          <BusinessHours />
          <AccountPreferencesSection />
        </div>
      </main>
    </div>
  );
}
