import { z } from "zod";
import { AddressSchema } from "./address";

const OrgSchema = z.object({
  id: z.number(),
  name: z.string(),
  organizationName: z.string(),
  organizationUrl: z.string(),
  email: z.email(),
  phone: z.string(),
  address: AddressSchema,
  logo: z.string(),
  onboardedAt: z.string(), // ISO date string
});

const orgOnboardingSchema = z.object({
  name: z.string().min(1, "organization name is required"),
  organizationName: z.string().min(1, "company name is required"),
  organizationUrl: z.url("Invalid url format").or(z.literal("")),
  email: z.email("Invalid email format"),
  phone: z.string().min(1, "phone number is required"),
  address: AddressSchema,
  logo: z
    .instanceof(File)
    .refine((file) => file.size < 1000000, {
      message: "Your logo must be less than 1MB.",
    })
    .optional(),
});

type OrgOnboardingData = z.infer<typeof orgOnboardingSchema>;

export { OrgSchema, orgOnboardingSchema, type OrgOnboardingData };
