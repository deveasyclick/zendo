import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Sidebar from "./components/sidebar";
import { AppUserProvider } from "@/contexts/user";

export default function DashboardLayout() {
  return (
    <AppUserProvider>
      <SidebarProvider>
        {/* Full height flex container */}
        <div className="flex h-screen w-screen overflow-hidden bg-gray-50 dark:bg-gray-900 antialiased">
          {/* Sidebar */}
          <Sidebar />

          {/* Content area */}
          <main className="flex flex-col flex-1 min-w-0">
            <SidebarTrigger className="mb-4" />
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </AppUserProvider>
  );
}
