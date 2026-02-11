import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  query: z.string().min(1),
});

type SearchFormValues = z.infer<typeof schema>;

export function SearchForm() {
  const { register } = useForm<SearchFormValues>({
    resolver: zodResolver(schema),
  });

  return (
    <div className="relative w-full">
      <input
        {...register("query")}
        placeholder="Search conversations, visitors or data points..."
        className="w-full rounded-lg bg-surface-light dark:bg-surface-dark pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
