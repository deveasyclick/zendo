import { Outlet } from "react-router";
import Header from "./header";

export default function MainLayout() {
  return (
    <div className="antialiased bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="p-4 h-auto pt-20 w-full">
        <Outlet />
      </main>
    </div>
  );
}
