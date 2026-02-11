import type { Address } from "./address";
import type { Base } from "./base";
import type { Org } from "./org";

export type Role = "distributor" | "admin" | "viewer" | "sales";

export interface User extends Base {
  clerkId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  role: Role;
  orgId?: string;
  org?: Org;
  address: Address;
}
