import { z } from "zod";

export const notificationSchema = z.object({
  browser: z.object({
    newChat: z.boolean(),
    visitorOnline: z.boolean(),
    assignedChat: z.boolean(),
  }),
  email: z.object({
    missedChats: z.boolean(),
    dailyDigest: z.boolean(),
  }),
  sounds: z.object({
    enabled: z.boolean(),
    sound: z.string(),
    volume: z.number().min(0).max(100),
  }),
  dnd: z.object({
    enabled: z.boolean(),
    start: z.string(),
    end: z.string(),
    days: z.array(z.string()),
  }),
});

export type NotificationFormValues = z.infer<typeof notificationSchema>;
