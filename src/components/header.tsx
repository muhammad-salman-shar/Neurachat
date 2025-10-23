

"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Settings, ChevronLeft, Bot, Trash2, ShieldAlert, User, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import AssistantOverlay from "@/components/assistant-overlay";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [animate, setAnimate] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);


  const isChatDetailPage = pathname === "/chat-detail";
  const isChatsPage = pathname === "/chats";
  
  useEffect(() => {
    setMounted(true);
    if (isChatsPage) {
      const animationShown = sessionStorage.getItem('neuraChatAnimationShown');
      if (!animationShown) {
        setAnimate(true);
        sessionStorage.setItem('neuraChatAnimationShown', 'true');
      }
    }
  }, [isChatsPage]);


  const agentName = searchParams.get('agent');
  const agentAvatar = searchParams.get('avatar');
  const agentPhone = searchParams.get('phone');
  const agentEmoji = searchParams.get('emoji');
  
  const isRealContact = agentPhone && agentPhone !== 'undefined' && agentPhone !== 'null';

  const getTitle = () => {
    if (isChatDetailPage && agentName) {
      return (
        <div className="text-center">
          <h1 className="text-xl font-bold">{agentName}</h1>
          <p className="text-xs font-medium opacity-80">{isOnline ? "Online" : "Active now"}</p>
        </div>
      );
    }
    
    if (isChatsPage) {
      return <h1 className={cn("text-2xl font-bold text-primary", animate && 'animate-fade-in-long')}>{ "NeuraChat" }</h1>;
    }

    let pageTitle = "NeuraChat";
    if (pathname === '/agents') pageTitle = "Agents";
    if (pathname === '/archive') pageTitle = "Archive";
    if (pathname === '/settings') pageTitle = "Settings";
    if (pathname === '/new-chat') pageTitle = "New Chat";
    if (pathname === '/create-group') pageTitle = "Create Group";
    if (pathname === '/reminders') pageTitle = "Reminders";
    if (pathname === '/profile') pageTitle = "Profile";
    if (pathname === '/call-history') pageTitle = "Call History";
    
    return <h1 className={cn("text-2xl font-bold", isChatDetailPage ? 'text-header-pink-neon-foreground' : 'text-foreground')}>{pageTitle}</h1>;
  };

  const showBackButton = mounted && (
    pathname === "/settings" ||
    isChatDetailPage ||
    pathname === "/create-group" ||
    pathname === "/reminders" ||
    pathname === "/profile" ||
    pathname === "/create-contact"
  );
  
  const AgentSettingsMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={cn(isChatDetailPage && 'hover:bg-black/10 text-header-pink-neon-foreground')}>
          <Settings className="h-6 w-6" />
          <span className="sr-only">Agent Settings</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
         {isRealContact && (
          <>
            <div className="px-2 py-1.5 flex items-center space-x-2">
              <Switch id="online-mode" checked={isOnline} onCheckedChange={setIsOnline}/>
              <Label htmlFor="online-mode" className="text-sm font-medium cursor-pointer">Online</Label>
            </div>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuLabel>Agent Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/profile?name=${encodeURIComponent(agentName || '')}&avatar=${encodeURIComponent(agentAvatar || '')}&phone=${encodeURIComponent(agentPhone || '')}&emoji=${encodeURIComponent(agentEmoji || '')}`}>
            <User className="mr-2 h-4 w-4" />
            <span>View Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Bot className="mr-2 h-4 w-4" />
          <span>Agent Mode</span>
        </DropdownMenuItem>
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
    <>
    <header className={cn(
      "flex h-16 items-center justify-between gap-4 px-4 md:px-6 sticky top-0 z-30", 
      isChatDetailPage 
        ? "bg-header-pink-neon text-header-pink-neon-foreground animate-neon-glow" 
        : "bg-card text-card-foreground border-b"
    )}>
      <div className="flex items-center gap-2 w-1/4">
        {showBackButton ? (
          <Button variant="ghost" size="icon" onClick={() => router.back()} className={cn(isChatDetailPage && 'hover:bg-black/10 text-header-pink-neon-foreground')}>
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Back</span>
          </Button>
        ) : (
          <div className="w-9 h-9"></div> // Placeholder for alignment
        )}
      </div>

      <div className="flex-1 text-center">
        {getTitle()}
      </div>

      <div className="flex items-center justify-end w-1/4">
        {isChatDetailPage ? (
           <AgentSettingsMenu />
        ) : (
           <Button variant="ghost" size="icon" onClick={() => setIsAssistantOpen(true)}>
                <Mic className="h-6 w-6" />
                <span className="sr-only">Open Assistant</span>
            </Button>
        )}
      </div>
    </header>
    {isAssistantOpen && <AssistantOverlay onClose={() => setIsAssistantOpen(false)} />}
    </>
  );
}
