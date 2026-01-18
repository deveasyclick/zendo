import { Navigate, Outlet, useLocation } from "react-router";
// src/components/RequireRole.tsx
import { useAuth, useUser } from "@clerk/react-router";
import { PageLoader } from "@/components/loaders";

type Role = "admin" | "viewer" | "sales" | "distributor";

interface RequireRoleProps {
  allowedRoles?: Role[];
}

export default function RouteGuard({ allowedRoles }: RequireRoleProps) {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useAuth();
  const location = useLocation();

  // Clerk or backend is loading
  if (!isLoaded) return <PageLoader />;

  // Not signed in
  if (!isSignedIn) return <Navigate to="/signin" replace />;

  // Role
  const role = user!.publicMetadata?.role as Role | undefined;

  // Optional allowedRoles check
  if (allowedRoles && (!role || !allowedRoles.includes(role))) {
    signOut({ redirectUrl: "/signin" });
    return <PageLoader />;
  }

  // Onboarding check only for admins
  const orgId = user!.publicMetadata.org_id as string | undefined;

  // Go to onboarding admin is not onboarded i.e orgId is undefined
  if (role === "admin" && !orgId) {
    return <Navigate to="/onboarding" replace />;
  }

  // Go to dashboard if onboarding is complete
  if (role === "admin" && orgId && location.pathname === "/onboarding") {
    return <Navigate to="/" replace />;
  }

  // All checks passed → render nested routes
  return <Outlet />;
}
