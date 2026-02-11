import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { sidebarNavItems } from "./sidebarNavigationData";
import { NavLink, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { LogOut, Sun } from "lucide-react";
import { SignOutButton } from "@clerk/react-router";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function DashboardSidebar() {
  const location = useLocation();
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="bg-sidebar">
      <SidebarHeader className="py-4 mb-6">
        <Logo />
      </SidebarHeader>
      <SidebarContent
        className={cn(
          "py-0 h-full scrollbar-thin scrollbar-thumb-secondary",
          open ? "px-4" : "px-2",
        )}
      >
        <SidebarMenu className="space-y-1">
          {sidebarNavItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Collapsible
                key={item.label}
                asChild
                defaultOpen={isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem key={item.label}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.label}
                      className={cn(
                        isActive &&
                          "bg-primary text-white shadow-md hover:bg-primary hover:text-white",
                      )}
                    >
                      <NavLink to={item.href}>
                        <item.icon className="shrink-0" />
                        {item.label}
                      </NavLink>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className={cn("py-2 px-3 gap-4", open && "px-4 gap-2")}>
        <SignOutButton>
          <Button className="flex items-center bg-transparent hover:bg-transparent cursor-pointer text-black dark:text-white justify-start pl-1!">
            <LogOut className="w-5 h-5 mr-1" />
            {open && "Log out"}
          </Button>
        </SignOutButton>
        <div className="flex items-center">
          {open && <Sun size={18} className="shrink-0" />}
          <ThemeToggle
            variant={open ? "switch" : "button"}
            iconSize={open ? 30 : 20}
            className={cn(
              "hover:bg-transparent! focus:ring-0!",
              !open && "p-0!",
            )}
          />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
