
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Archive, Check, X, Search, MessageSquarePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import NewChatDialog from "@/components/new-chat-dialog";


const initialChats: Chat[] = [];

export type Chat = {
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
    const [selectedChats, setSelectedChats] = useState<Set<string>>(new Set());
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isNewChatOpen, setIsNewChatOpen] = useState(false);


    const inSelectionMode = selectedChats.size > 0;
    
    const loadChats = () => {
        try {
            const storedChatsItem = localStorage.getItem("chats");
            if (storedChatsItem) {
                const storedChats: Chat[] = JSON.parse(storedChatsItem);
                
                const chatMap = new Map<string, Chat>();
                
                initialChats.forEach(chat => chatMap.set(chat.name, chat));
                storedChats.forEach(chat => chatMap.set(chat.name, chat));

                const mergedChats = Array.from(chatMap.values());
                setChats(mergedChats);
            } else {
                 setChats(initialChats);
            }
        } catch (error) {
            console.error("Failed to parse chats from localStorage", error);
            setChats(initialChats);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadChats();
    }, []);

    const toggleSelection = (chatName: string) => {
        setSelectedChats(prev => {
            const newSelection = new Set(prev);
            if (newSelection.has(chatName)) {
                newSelection.delete(chatName);
            } else {
                newSelection.add(chatName);
            }
            return newSelection;
        });
    };

    const handleChatClick = (e: React.MouseEvent, chatName: string) => {
        if (inSelectionMode) {
            e.preventDefault();
            toggleSelection(chatName);
        }
    };

    const handleDeleteSelected = () => {
        const updatedChats = chats.filter(chat => !selectedChats.has(chat.name));
        setChats(updatedChats);

        try {
            const storedChats = JSON.parse(localStorage.getItem("chats") || "[]");
            const updatedStoredChats = storedChats.filter((chat: Chat) => !selectedChats.has(chat.name));
            localStorage.setItem("chats", JSON.stringify(updatedStoredChats));
        } catch (error) {
             console.error("Failed to update chats in localStorage", error);
        }

        setSelectedChats(new Set());
    };
    
    const handleArchiveSelected = () => {
        alert(`${selectedChats.size} chats archived!`);
        setSelectedChats(new Set());
    };

    const handleMarkAsReadSelected = () => {
        const updatedChats = chats.map(chat => {
            if (selectedChats.has(chat.name)) {
                return { ...chat, unread: false };
            }
            return chat;
        });
        setChats(updatedChats);
        setSelectedChats(new Set());
    };

    const handleChatsAdded = () => {
        loadChats(); // Reload chats from localStorage
    };

    const filteredChats = chats.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const SelectionHeader = () => (
         <div className="flex items-center justify-between p-2 bg-card mb-2 rounded-xl sticky top-16 z-10 shadow">
            <Button variant="ghost" size="icon" onClick={() => setSelectedChats(new Set())}>
                <X className="h-5 w-5" />
            </Button>
            <span className="font-semibold">{selectedChats.size} selected</span>
            <div className="flex items-center">
                 <Button variant="ghost" size="icon" onClick={handleMarkAsReadSelected}>
                    <Check className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleArchiveSelected}>
                    <Archive className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleDeleteSelected}>
                    <Trash2 className="h-5 w-5 text-destructive" />
                </Button>
            </div>
        </div>
    );
    
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
                <p>Loading chats...</p>
            </div>
        )
    }

    if (chats.length === 0 && !searchQuery) {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] text-center text-muted-foreground p-4">
                <MessageSquarePlus className="h-16 w-16 mb-4 text-primary" />
                <h2 className="text-2xl font-bold text-foreground mb-2">Welcome to NeuraChat!</h2>
                <p className="mb-1">Your journey to smarter communication starts here.</p>
                <p>Tap the button below to add your first AI Agent or contact.</p>
                <NewChatDialog onOpenChange={setIsNewChatOpen} onChatsAdded={handleChatsAdded}>
                     <Button className="mt-6">
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Chat
                    </Button>
                </NewChatDialog>
            </div>
        )
    }


    return (
        <div className="relative h-full">
            {!inSelectionMode && (
                 <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        placeholder="Search chats..." 
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            )}
            {inSelectionMode && <SelectionHeader />}
            <div className={cn("space-y-2", inSelectionMode && "pt-2")}>
                {filteredChats.map((chat, index) => {
                    const isSelected = selectedChats.has(chat.name);
                    const profileUrl = `/profile?name=${encodeURIComponent(chat.name)}&avatar=${encodeURIComponent(chat.avatar)}&phone=${encodeURIComponent(chat.phone || '')}&emoji=${encodeURIComponent(chat.emoji)}`;
                    const chatUrl = `/chat-detail?agent=${encodeURIComponent(chat.name)}&emoji=${encodeURIComponent(chat.emoji)}&avatar=${encodeURIComponent(chat.avatar)}&phone=${encodeURIComponent(chat.phone || '')}`;

                    return (
                        <div
                            key={`${chat.name}-${index}`}
                            onContextMenu={(e) => { e.preventDefault(); toggleSelection(chat.name); }}
                            onClick={(e) => handleChatClick(e, chat.name)}
                            className={cn("rounded-2xl transition-colors relative", isSelected && "bg-primary/10")}
                        >
                            <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-card">
                                <div className="relative">
                                    <Link href={profileUrl} onClick={(e) => {
                                        // Stop propagation to prevent the outer link from firing
                                        if (!inSelectionMode) {
                                            e.stopPropagation();
                                        } else {
                                            e.preventDefault();
                                        }
                                    }}>
                                        <Avatar className="h-14 w-14 text-2xl">
                                            <AvatarImage src={chat.avatar} data-ai-hint={chat.hint} />
                                            <AvatarFallback>{chat.emoji}</AvatarFallback>
                                        </Avatar>
                                    </Link>
                                    {chat.unread && !isSelected && <span className="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-background"></span>}
                                    {isSelected && (
                                        <div className="absolute top-0 left-0 h-full w-full bg-black/50 rounded-full flex items-center justify-center pointer-events-none">
                                            <Check className="h-7 w-7 text-white" />
                                        </div>
                                    )}
                                </div>
                                <Link href={chatUrl} className="flex-1 block hover:no-underline">
                                    <div className="flex-1">
                                        <p className="font-bold text-lg text-foreground">{chat.name}</p>
                                        <p className="text-sm text-muted-foreground truncate">{chat.message}</p>
                                    </div>
                                </Link>
                                <Link href={chatUrl} className="block hover:no-underline">
                                    <div className="text-right">
                                         {chat.time && <p className="text-xs text-muted-foreground">{chat.time}</p>}
                                         {chat.unread && <Badge className="mt-1 bg-primary h-6 w-6 flex items-center justify-center p-0">{chat.isGroup ? '' : '1'}</Badge>}
                                    </div>
                                </Link>
                            </div>
                            <Link href={chatUrl} className="absolute inset-0 z-0"/>
                        </div>
                    )
                })}
            </div>
            {!inSelectionMode && (
                <NewChatDialog onOpenChange={setIsNewChatOpen} onChatsAdded={handleChatsAdded}>
                    <Button className="fixed bottom-24 right-6 h-16 w-16 rounded-full shadow-lg">
                        <Plus className="h-8 w-8" />
                        <span className="sr-only">New Chat</span>
                    </Button>
                </NewChatDialog>
            )}
        </div>
    );
}
