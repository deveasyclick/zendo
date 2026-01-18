import type { Icons } from "@/components/icons/icons";

export type IconNames = keyof typeof Icons;

export type Theme = "light" | "dark" | "system";

export const Environment = {
  DEVELOPMENT: "development",
  PRODUCTION: "production",
} as const;

export type Environment = (typeof Environment)[keyof typeof Environment];
