import { z } from "zod";

export const chatSchema = z.object({
  themeColor: z.string().default("#1891aa"),
  widgetPosition: z
    .enum(["bottom-right", "bottom-left"])
    .default("bottom-right"),
  greetingMessage: z
    .string()
    .default("Hi there! 👋 How can we help you today?"),
  widgetTitle: z.string().default("Zendo Support"),
  features: z
    .object({
      enableFileUploads: z.boolean().default(true),
      showAgentAvatars: z.boolean().default(true),
      removePoweredBy: z.boolean().default(false),
    })
    .default({
      enableFileUploads: true,
      showAgentAvatars: true,
      removePoweredBy: false,
    }),
});

export type ChatFormValues = z.infer<typeof chatSchema>;
