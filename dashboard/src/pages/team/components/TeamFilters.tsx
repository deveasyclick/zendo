import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  role: z.string(),
  status: z.string(),
});

export type TeamFilterValues = z.infer<typeof schema>;

export function TeamFilters({
  onChange,
}: {
  onChange: (values: TeamFilterValues) => void;
}) {
  const form = useForm<TeamFilterValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: "All",
      status: "All",
    },
  });

  const values = form.watch();

  // propagate to table
  onChange(values);

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-3">
        <Select
          value={values.role}
          onValueChange={(v) => form.setValue("role", v)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Roles</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Manager">Manager</SelectItem>
            <SelectItem value="Agent">Agent</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={values.status}
          onValueChange={(v) => form.setValue("status", v)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Status</SelectItem>
            <SelectItem value="Online">Online</SelectItem>
            <SelectItem value="Busy">Busy</SelectItem>
            <SelectItem value="Offline">Offline</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
