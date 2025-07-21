"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Settings, ChevronLeft, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isSettingsPage = pathname === "/settings";
  const isChatPage = pathname === "/chats";

  const agentName = searchParams.get('agent');

  const getTitle = () => {
    if (isChatPage && agentName) {
      return (
        <div className="text-center">
          <h1 className="text-xl font-bold">{agentName}</h1>
          <p className="text-xs font-medium opacity-80">Active now</p>
        </div>
      );
    }
    return <h1 className="text-2xl font-bold text-header-green-foreground" style={{ textShadow: '0 0 5px hsl(var(--primary) / 0.5)' }}>NeuraSaMu</h1>;
  };

  return (
    <header className="flex h-16 items-center justify-between gap-4 bg-header-green text-header-green-foreground px-4 md:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-2">
        {isSettingsPage || isChatPage ? (
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-black/10">
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Back</span>
          </Button>
        ) : (
          <Link href="/agents" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-black flex items-center justify-center">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <span className="font-semibold text-header-green-foreground">More Agents</span>
          </Link>
        )}
        {isChatPage && <div className="h-9 w-9 rounded-full bg-black flex items-center justify-center"><Bot className="h-6 w-6 text-white" /></div>}
      </div>

      <div className="flex-1 text-center absolute left-1/2 -translate-x-1/2">
        {getTitle()}
      </div>

      <div className="flex items-center justify-end">
        {isSettingsPage ? (
          <div className="w-9 h-9" /> // Placeholder to keep title centered
        ) : (
          <Link href="/settings">
            <Button variant="ghost" size="icon" className="hover:bg-black/10">
              <Settings className="h-6 w-6" />
              <span className="sr-only">Settings</span>
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
