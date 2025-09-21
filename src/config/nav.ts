import { MessageSquare, Phone, CreditCard, Settings, type LucideIcon } from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  tooltip: string;
};

export const NAV_ITEMS: NavItem[] = [
  {
    href: "/chats",
    label: "Chats",
    icon: MessageSquare,
    tooltip: "All conversations",
  },
  {
    href: "/call-history",
    label: "Calls",
    icon: Phone,
    tooltip: "Call history",
  },
  {
    href: "/payments",
    label: "Payments",
    icon: CreditCard,
    tooltip: "Payments and wallet",
  },
   {
    href: "/settings",
    label: "Settings",
    icon: Settings,
    tooltip: "App settings",
  },
];
