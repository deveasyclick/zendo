import type { IconNames } from "@/types";

/**
 * Type definition for sidebar navigation items
 */
export type SidebarNavItemData = {
  id: string;
  label: string;
  href: string;
  iconName: IconNames;
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
    id: "products",
    label: "Products",
    href: "/products",
    iconName: "package",
  },
  {
    id: "orders",
    label: "Orders",
    href: "/orders",
    iconName: "shoppingCart",
  },
  {
    id: "invoices",
    label: "Invoices",
    href: "/invoices",
    iconName: "task",
  },
  {
    id: "reports",
    label: "Reports",
    href: "/reports",
    iconName: "barchart",
  },
];
