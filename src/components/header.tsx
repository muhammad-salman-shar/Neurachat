"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Settings, Bot, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isSettingsPage = pathname === "/settings";

  return (
    <header className="flex h-16 items-center justify-between gap-4 bg-background px-4 md:px-6 sticky top-0 z-30">
      {isSettingsPage ? (
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Back</span>
        </Button>
      ) : (
        <Link href="/agents" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-black flex items-center justify-center">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <span className="font-semibold text-primary">More Agents</span>
        </Link>
      )}
      <div className="w-full flex-1 text-center">
        <h1 className="text-2xl font-bold text-primary" style={{ textShadow: '0 0 5px hsl(var(--primary) / 0.5)' }}>
          NeuraSaMu
        </h1>
      </div>
      {isSettingsPage ? (
        <div className="w-9 h-9" /> // Placeholder to keep title centered
      ) : (
        <Link href="/settings">
          <Button variant="ghost" size="icon">
            <Settings className="h-6 w-6" />
            <span className="sr-only">Settings</span>
          </Button>
        </Link>
      )}
    </header>
  );
}
