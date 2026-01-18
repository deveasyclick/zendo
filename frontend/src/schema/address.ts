import z from "zod";

export const AddressSchema = z.object({
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  address: z.string().min(1, "Address is required"),
  zip: z.string().min(1, "Zip is required"),
});
