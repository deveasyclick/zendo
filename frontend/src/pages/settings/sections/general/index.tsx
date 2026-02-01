import { Header } from "./components/Header";
import { AccountPreferencesSection } from "./components/AccountPreference";
import { Localization } from "./components/Locatlization";
import { CompanyProfile } from "./components/CompanyProfile";
import { BusinessHours } from "./components/BusinessHours";

export default function GeneralSettingsPage() {
  return (
    <div className="h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/40 overflow-y-auto p-12">
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
