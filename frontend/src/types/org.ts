import type { Address } from "./address";
import type { Base } from "./base";

export interface Org extends Base {
  name: string;
  organizationName: string;
  organizationUrl: string;
  email: string;
  phone: string;
  logo: string;
  onboardedAt?: string;
  address: Address;
}
