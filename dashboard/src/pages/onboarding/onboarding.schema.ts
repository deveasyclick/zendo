import z from "zod";

export const WebsiteSetupSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  websiteUrl: z.string().url("Enter a valid URL"),
  industry: z.string().nonempty("Please select an industry"),
});

export type WebsiteSetupFormValues = z.infer<typeof WebsiteSetupSchema>;
