export type Role = "Admin" | "Manager" | "Agent";
export type Status = "Online" | "Busy" | "Offline";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: Role;
  status: Status;
  lastActive: string;
}
