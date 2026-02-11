// src/config.ts
import type { Environment } from "@/types";

type EnvVar<T> = {
  value: T | undefined;
  required?: boolean;
  name: string; // for better error reporting
};

type ENV_VARS = {
  clerkPublishableKey: EnvVar<string>;
  environment: EnvVar<Environment>;
  apiBaseUrl: EnvVar<string>;
};

const configs: ENV_VARS = {
  environment: {
    name: "VITE_ENVIRONMENT",
    value: import.meta.env.MODE as Environment,
  },
  apiBaseUrl: {
    name: "VITE_API_BASE_URL",
    value: import.meta.env.VITE_API_BASE_URL,
    required: true,
  },
  clerkPublishableKey: {
    name: "VITE_CLERK_PUBLISHABLE_KEY",
    value: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
    required: true,
  },
};

Object.values(configs).forEach(({ name, value, required }) => {
  if (required && !value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
});

export const config = {
  apiBaseUrl: configs.apiBaseUrl.value!,
  clerkPublishableKey: configs.clerkPublishableKey.value!,
  environment: configs.environment.value!,
};
