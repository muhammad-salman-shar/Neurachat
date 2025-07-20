import { MessageSquare, Cpu, Library, History, type LucideIcon } from "lucide-react";

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
    href: "/agents",
    label: "Agents",
    icon: Cpu,
    tooltip: "Manage AI agents",
  },
  {
    href: "/library",
    label: "Library",
    icon: Library,
    tooltip: "Your saved media",
  },
  {
    href: "/history",
    label: "History",
    icon: History,
    tooltip: "Conversation history",
  },
];
