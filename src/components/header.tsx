
"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Settings, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [animate, setAnimate] = useState(false);

  const isSettingsPage = pathname === "/settings";
  const isChatDetailPage = pathname === "/chat-detail";
  const isChatsPage = pathname === "/chats";

  useEffect(() => {
    if (isChatsPage) {
      const animationShown = sessionStorage.getItem('neuraSaMuAnimationShown');
      if (!animationShown) {
        setAnimate(true);
        sessionStorage.setItem('neuraSaMuAnimationShown', 'true');
      }
    }
  }, [isChatsPage]);


  const agentName = searchParams.get('agent');

  const getTitle = () => {
    if (isChatDetailPage && agentName) {
      return (
        <div className="text-center">
          <h1 className="text-xl font-bold">{agentName}</h1>
          <p className="text-xs font-medium opacity-80">Active now</p>
        </div>
      );
    }
    
    if (isChatsPage) {
      return <h1 className={cn("text-2xl font-bold text-primary", animate && 'animate-fade-in-long')}>{ "NeuraSaMu" }</h1>;
    }

    let pageTitle = "NeuraSaMu";
    if (pathname === '/library') pageTitle = "Library";
    if (pathname === '/archive') pageTitle = "Archive";
    if (pathname === '/settings') pageTitle = "Settings";
    if (pathname === '/new-chat') pageTitle = "New Chat";
    if (pathname === '/create-group') pageTitle = "Create Group";
    
    return <h1 className={cn("text-2xl font-bold", isChatDetailPage ? 'text-header-green-foreground' : 'text-foreground')} style={{ textShadow: isChatDetailPage ? '0 0 5px hsl(var(--primary) / 0.5)' : 'none' }}>{pageTitle}</h1>;
  };

  const showBackButton = isSettingsPage || isChatDetailPage || pathname === '/new-chat' || pathname === '/create-group';

  return (
    <header className={cn("flex h-16 items-center justify-between gap-4 px-4 md:px-6 sticky top-0 z-30", isChatDetailPage ? "bg-header-green text-header-green-foreground" : "bg-card text-card-foreground border-b")}>
      <div className="flex items-center gap-2 w-1/4">
        {showBackButton ? (
          <Button variant="ghost" size="icon" onClick={() => router.back()} className={cn(isChatDetailPage && 'hover:bg-black/10')}>
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Back</span>
          </Button>
        ) : (
          <div></div> // Placeholder for alignment
        )}
      </div>

      <div className="flex-1 text-center">
        {getTitle()}
      </div>

      <div className="flex items-center justify-end w-1/4">
        {isSettingsPage ? (
          <div className="w-9 h-9" /> // Placeholder to keep title centered
        ) : (
          <Link href="/settings">
            <Button variant="ghost" size="icon" className={cn(isChatDetailPage && 'hover:bg-black/10')}>
              <Settings className="h-6 w-6" />
              <span className="sr-only">Settings</span>
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
