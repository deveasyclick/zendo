import type { User } from "@/types/user";
import { createContext, useContext } from "react";

interface AppUser {
  user: User;
}

export const UserContext = createContext<AppUser | undefined>(undefined);

export function useAppUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useAppUser must be used within a UserProvider");
  }
  return context;
}
