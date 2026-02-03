import { Route, Routes } from "react-router";
import DashboardLayout from "../layouts/dashboard";
import DashboardHome from "../pages/dashboard";
import RouteGuard from "./guard";
import { lazy, Suspense } from "react";
import MainLayout from "@/layouts/main";
import Home from "@/pages/home";

const Signin = lazy(() => import("@/pages/auth/signin"));
const SignUp = lazy(() => import("@/pages/auth/signup"));
const Onboarding = lazy(() => import("@/pages/onboarding"));
const Conversations = lazy(() => import("@/pages/conversations"));
const Integrations = lazy(() => import("@/pages/integrations"));
const Team = lazy(() => import("@/pages/team"));
const Settings = lazy(() => import("@/pages/settings"));
const GeneralSettings = lazy(() => import("@/pages/settings/sections/general"));
const ChatWidgetSettings = lazy(() => import("@/pages/settings/sections/chat"));
const NotificationsSettings = lazy(
  () => import("@/pages/settings/sections/notifications"),
);

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public routes */}
        <Route path="/signin/*" element={<Signin />} />
        <Route path="/signup/*" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        {/**TODO: remove this as it's added for testing purpose */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="conversations" element={<Conversations />} />
          <Route path="integrations" element={<Integrations />} />
          <Route path="team" element={<Team />} />
          <Route path="settings" element={<Settings />}>
            <Route path="general" element={<GeneralSettings />} />
            <Route path="chat" element={<ChatWidgetSettings />} />
            <Route path="notifications" element={<NotificationsSettings />} />
          </Route>
        </Route>

        {/* Onboarding routes */}
        <Route element={<RouteGuard />}>
          <Route element={<MainLayout />}>
            <Route path="/onboarding" element={<Onboarding />} />
          </Route>
        </Route>

        {/* Private routes */}
        {/* <Route element={<RouteGuard />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
          </Route>
        </Route> */}
      </Routes>
    </Suspense>
  );
}
