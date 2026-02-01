import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SectionTitle } from "./SectionTitle";

export function Localization() {
  return (
    <section className="space-y-6">
      <SectionTitle title="Localization" />

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold">Default Language</label>
          <Select defaultValue="en">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English (US)</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold">Timezone</label>
          <Select defaultValue="utc-8">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="utc-8">(GMT-08:00) Pacific Time</SelectItem>
              <SelectItem value="utc-5">(GMT-05:00) Eastern Time</SelectItem>
              <SelectItem value="utc+0">(GMT+00:00) London</SelectItem>
              <SelectItem value="utc+1">(GMT+01:00) Berlin</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
}
