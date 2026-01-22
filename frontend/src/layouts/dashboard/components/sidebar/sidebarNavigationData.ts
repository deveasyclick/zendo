import {
  BarChart2,
  LayoutGridIcon,
  MessageCircleMoreIcon,
  Settings,
  ShoppingCart,
  Users,
  type LucideIcon,
} from "lucide-react";

/**
 * Type definition for sidebar navigation items
 */
export type SidebarNavItemData = {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: {
    text: string;
    variant: "primary" | "gray" | "success";
  };
};

/**
 * Sidebar navigation items data
 */
export const sidebarNavItems: SidebarNavItemData[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutGridIcon,
  },
  {
    id: "conversations",
    label: "Conversations",
    href: "/dashboard/conversations",
    icon: MessageCircleMoreIcon,
  },
  {
    id: "integrations",
    label: "Integrations",
    href: "/dashboard/integrations",
    icon: ShoppingCart,
  },
  {
    id: "analytics",
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart2,
  },
  {
    id: "team",
    label: "Team",
    href: "/dashboard/team",
    icon: Users,
  },
  {
    id: "settings",
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];
