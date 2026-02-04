import { z } from "zod";

export const webhookSchema = z.object({
  url: z.url("Must be a valid URL"),
  description: z.string().optional(),
  events: z.array(z.string()).min(1, "Select at least one event"),
});

export type WebhookFormValues = z.infer<typeof webhookSchema>;
