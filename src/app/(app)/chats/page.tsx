
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const initialChats = [
    { name: "Friend", message: "Of course bro, looking awesome!", avatar: "https://placehold.co/100x100.png", hint: "cool emoji", unread: true, emoji: "😁", phone: "123-456-7890" },
    { name: "Teacher", message: "Next quiz aa raha hai, kal revise kiya?", avatar: "https://placehold.co/100x100.png", hint: "teacher woman", time: "4:20 PM", emoji: "📝", phone: "123-456-7890" },
    { name: "Boss", message: "Project abhi tak complete hua?", avatar: "https://placehold.co/100x100.png", hint: "business man", time: "11:15 AM", emoji: "💼", phone: "123-456-7890" },
    { name: "Gym", message: "Aur 10 push-ups kar! 💪", avatar: "https://placehold.co/100x100.png", hint: "fit person", time: "Yesterday", emoji: "💪", phone: "123-456-7890" },
    { name: "Girlfriend", message: "How was your day?", avatar: "https://placehold.co/100x100.png", hint: "happy woman", time: "Yesterday", emoji: "🥰", phone: "123-456-7890" },
];

type Chat = {
    name: string;
    message: string;
    avatar: string;
    hint: string;
    unread?: boolean;
    emoji: string;
    time?: string;
    isGroup?: boolean;
    phone?: string;
}

export default function ChatsPage() {
    const [chats, setChats] = useState<Chat[]>(initialChats);
    const [longPressedChat, setLongPressedChat] = useState<Chat | null>(null);

    useEffect(() => {
        try {
            const storedChatsItem = localStorage.getItem("chats");
            if (storedChatsItem) {
                const storedChats = JSON.parse(storedChatsItem);
                
                const newChats = storedChats.filter((newChat: Chat) => 
                    !initialChats.some(existingChat => existingChat.name === newChat.name) &&
                    !chats.some(existingChat => existingChat.name === newChat.name)
                );

                if (newChats.length > 0) {
                     setChats(prevChats => [...prevChats, ...newChats]);
                }
            }
        } catch (error) {
            console.error("Failed to parse chats from localStorage", error);
        }
    }, []);

    const handleDeleteChat = () => {
        if (!longPressedChat) return;

        const updatedChats = chats.filter(chat => chat.name !== longPressedChat.name);
        setChats(updatedChats);

        // Also update localStorage if needed
        const storedChats = JSON.parse(localStorage.getItem("chats") || "[]");
        const updatedStoredChats = storedChats.filter((chat: Chat) => chat.name !== longPressedChat.name);
        localStorage.setItem("chats", JSON.stringify(updatedStoredChats));

        setLongPressedChat(null);
    };

    return (
        <div className="relative h-[calc(100vh-10rem)]">
            <div className="space-y-2">
                {chats.map((chat, index) => (
                     <AlertDialog key={`${chat.name}-${index}`}>
                        <AlertDialogTrigger asChild>
                             <div onContextMenu={(e) => { e.preventDefault(); setLongPressedChat(chat); }}>
                                <Link href={`/chat-detail?agent=${encodeURIComponent(chat.name)}&emoji=${encodeURIComponent(chat.emoji)}&avatar=${encodeURIComponent(chat.avatar)}&phone=${encodeURIComponent(chat.phone || '')}`} className="block hover:no-underline">
                                    <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-card transition-colors cursor-pointer">
                                        <div className="relative">
                                            <Avatar className="h-14 w-14 text-2xl">
                                                <AvatarImage src={chat.avatar} data-ai-hint={chat.hint} />
                                                <AvatarFallback>{chat.emoji}</AvatarFallback>
                                            </Avatar>
                                            {chat.unread && <span className="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-background"></span>}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-lg text-foreground">{chat.name}</p>
                                            <p className="text-sm text-muted-foreground truncate">{chat.message}</p>
                                        </div>
                                        <div className="text-right">
                                             {chat.time && <p className="text-xs text-muted-foreground">{chat.time}</p>}
                                             {chat.unread && <Badge className="mt-1 bg-primary h-6 w-6 flex items-center justify-center p-0">{chat.isGroup ? '' : '1'}</Badge>}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </AlertDialogTrigger>
                        {longPressedChat && longPressedChat.name === chat.name && (
                             <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Chat?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Are you sure you want to delete the chat with {chat.name}? This action cannot be undone.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel onClick={() => setLongPressedChat(null)}>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDeleteChat} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        )}
                     </AlertDialog>
                ))}
            </div>
            <Button asChild className="fixed bottom-24 right-6 h-16 w-16 rounded-full shadow-lg">
                <Link href="/new-chat">
                    <Plus className="h-8 w-8" />
                    <span className="sr-only">New Chat</span>
                </Link>
            </Button>
        </div>
    );
}
