import Link from "next/link";
import { Bot } from "lucide-react";

export default function Logo() {
  return (
    <Link href="/chats" className="flex items-center gap-2">
      <Bot className="h-7 w-7 text-primary" />
      <h1 className="text-xl font-bold text-foreground">NeuraSaMu</h1>
    </Link>
  );
}
