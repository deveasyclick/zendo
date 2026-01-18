import { Route, Routes } from "react-router";
import DashboardLayout from "../layouts/dashboard";
import DashboardHome from "../pages/dashboard/Dashboard";
import RouteGuard from "./guard";
import { lazy, Suspense } from "react";
import MainLayout from "@/layouts/main";

const Signin = lazy(() => import("@/pages/auth/signin"));
const SignUp = lazy(() => import("@/pages/auth/signup"));
const Onboarding = lazy(() => import("@/pages/org/onboarding/onboard"));
export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public routes */}
        <Route path="/signin/*" element={<Signin />} />
        <Route path="/signup/*" element={<SignUp />} />

        {/* Onboarding routes */}
        <Route element={<RouteGuard />}>
          <Route element={<MainLayout />}>
            <Route path="/onboarding" element={<Onboarding />} />
          </Route>
        </Route>

        {/* Private routes */}
        <Route element={<RouteGuard />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
