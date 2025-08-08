
"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Settings, ChevronLeft, Bot, Palette, Trash2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [animate, setAnimate] = useState(false);

  const isSettingsPage = pathname === "/settings";
  const isChatDetailPage = pathname === "/chat-detail";
  const isChatsPage = pathname === "/chats";
  const isRemindersPage = pathname === "/reminders";

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
    if (pathname === '/reminders') pageTitle = "Reminders";
    
    return <h1 className={cn("text-2xl font-bold", isChatDetailPage ? 'text-header-green-foreground' : 'text-foreground')} style={{ textShadow: isChatDetailPage ? '0 0 5px hsl(var(--primary) / 0.5)' : 'none' }}>{pageTitle}</h1>;
  };

  const showBackButton = isSettingsPage || isChatDetailPage || pathname === '/new-chat' || pathname === '/create-group' || isRemindersPage;

  const AgentSettingsMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={cn(isChatDetailPage && 'hover:bg-black/10')}>
          <Settings className="h-6 w-6" />
          <span className="sr-only">Agent Settings</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Agent Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Bot className="mr-2 h-4 w-4" />
          <span>Agent Mode</span>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Palette className="mr-2 h-4 w-4" />
            <span>Theme Color</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Red</DropdownMenuItem>
            <DropdownMenuItem>Green</DropdownMenuItem>
            <DropdownMenuItem>Neon</DropdownMenuItem>
            <DropdownMenuItem>Blue</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Clear Chat</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-destructive">
          <ShieldAlert className="mr-2 h-4 w-4" />
          <span>Report Agent</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

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
        {isChatDetailPage ? (
           <AgentSettingsMenu />
        ) : (
          <div className="w-9 h-9" /> // Placeholder to keep title centered
        )}
      </div>
    </header>
  );
}
