
"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Phone, UserPlus, Pencil } from "lucide-react";
import type { Chat } from "@/app/(app)/chats/page";
import { useRouter } from "next/navigation";

type ChatActionsSheetProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  chat: Chat;
};

export default function ChatActionsSheet({
  isOpen,
  onOpenChange,
  chat,
}: ChatActionsSheetProps) {
  const router = useRouter();

  const handleAction = (action: () => void) => {
    action();
    onOpenChange(false);
  };

  const handleMakeCall = () => {
    if (chat.phone && chat.phone !== "undefined" && chat.phone !== "null") {
      window.location.href = `tel:${chat.phone}`;
    } else {
      alert("No phone number available for this contact.");
    }
  };

  const handleChatWith = () => {
    const chatUrl = `/chat-detail?agent=${encodeURIComponent(
      chat.name
    )}&emoji=${encodeURIComponent(chat.emoji)}&avatar=${encodeURIComponent(
      chat.avatar
    )}&phone=${encodeURIComponent(chat.phone || "")}`;
    router.push(chatUrl);
  };

  const handleAddToGroup = () => {
    // This would navigate to a group creation/selection flow
    // For now, it can navigate to the create group page
    router.push("/create-group");
  };

  const handleEditProfile = () => {
    // This would navigate to a profile editing screen
    // For now, it can navigate to the main profile page
    const profileUrl = `/profile?name=${encodeURIComponent(
      chat.name
    )}&avatar=${encodeURIComponent(chat.avatar)}&phone=${encodeURIComponent(
      chat.phone || ""
    )}&emoji=${encodeURIComponent(chat.emoji)}`;
    router.push(profileUrl);
  };

  const actions = [
    {
      label: "Chat With",
      icon: MessageSquare,
      action: handleChatWith,
    },
    {
      label: "Make Call",
      icon: Phone,
      action: handleMakeCall,
      disabled: !chat.phone,
    },
    {
      label: "Add to Group",
      icon: UserPlus,
      action: handleAddToGroup,
    },
    {
      label: "Edit Profile",
      icon: Pencil,
      action: handleEditProfile,
    },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-2xl">
        <SheetHeader className="text-center mb-4">
          <div className="flex flex-col items-center gap-2">
            <Avatar className="h-16 w-16">
              <AvatarImage src={chat.avatar} data-ai-hint={chat.hint} />
              <AvatarFallback>{chat.emoji}</AvatarFallback>
            </Avatar>
            <SheetTitle>{chat.name}</SheetTitle>
            {chat.phone && (
              <SheetDescription>{chat.phone}</SheetDescription>
            )}
          </div>
        </SheetHeader>
        <div className="grid grid-cols-1 gap-2">
          {actions.map((item) => (
            <Button
              key={item.label}
              variant="outline"
              className="w-full justify-start h-14 text-lg"
              onClick={() => handleAction(item.action)}
              disabled={item.disabled}
            >
              <item.icon className="mr-4 h-5 w-5" />
              {item.label}
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
