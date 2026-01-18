import { type ReactNode } from "react";

import { UserContext } from "./context";
import { PageLoader } from "@/components/loaders";
import { useFetchMe } from "@/queries/user";

export function AppUserProvider({
  children,
}: {
  readonly children: ReactNode;
}) {
  const { data: user, isLoading, isError, error: error } = useFetchMe();

  // Clerk or backend is loading
  if (isLoading) return <PageLoader />;

  // Backend error
  if (isError) {
    // Optionally sign out if backend fails
    console.log("fetch user error", error);
    return <PageLoader />;
  }

  return (
    <UserContext.Provider value={{ user: user! }}>
      {children}
    </UserContext.Provider>
  );
}
