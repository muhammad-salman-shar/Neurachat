"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Gift, Send, Phone } from "lucide-react";
import Image from "next/image";

type Message = {
  id: string;
  sender: "user" | "ai";
  text: string;
  avatar: string;
  name: string;
  time: string;
  image?: string;
};

const messages: Message[] = [
  { id: '1', sender: 'ai', name: "Agent Friend", text: "Hi how are you friend? 😄", avatar: "https://placehold.co/40x40.png", time: "10:30am" },
  { id: '2', sender: 'user', name: "User Name", text: "i am fine thanks for asking 😊", avatar: "https://placehold.co/40x40.png", time: "10:32am" },
  { id: '3', sender: 'user', name: "User Name", text: "How am I looking 😏", avatar: "https://placehold.co/40x40.png", time: "10:33am", image: "https://placehold.co/300x400.png" },
  { id: '4', sender: 'ai', name: "Agent Friend", text: "amazing 😘 bro when you go there 🤔, and why not tell me", avatar: "https://placehold.co/40x40.png", time: "10:35am" },
];

export default function ChatsPage() {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col p-2 md:p-4">
      <div className="flex-1 bg-muted/50 rounded-3xl shadow-inner overflow-hidden">
      <ScrollArea className="h-full p-4">
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-end gap-3",
                message.sender === "user" && "flex-row-reverse"
              )}
            >
              <Avatar className={cn("h-10 w-10", message.sender === 'ai' ? 'border-2 border-blue-500' : 'bg-black')}>
                <AvatarImage src={message.avatar} alt={message.name} data-ai-hint="person face" />
                <AvatarFallback className={message.sender === 'user' ? 'bg-black text-white' : ''}>{message.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className={cn("max-w-xs md:max-w-md lg:max-w-lg space-y-1", message.sender === 'user' && 'items-end flex flex-col')}>
                 <div className="flex items-baseline gap-2" dir={message.sender === 'user' ? 'rtl' : 'ltr'}>
                    <p className="text-sm font-semibold">{message.name}</p>
                 </div>
                <div
                  className={cn(
                    "rounded-xl px-4 py-2.5 bg-card shadow-sm",
                  )}
                >
                  {message.text}
                   {message.image && (
                      <Image 
                        src={message.image}
                        alt="User uploaded image"
                        data-ai-hint="man portrait"
                        width={200}
                        height={266}
                        className="rounded-lg mt-2"
                      />
                   )}
                </div>
                 <p className="text-xs text-muted-foreground px-1">{message.time}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      </div>
      <div className="mt-auto bg-card rounded-2xl shadow-lg p-3 mx-auto w-full max-w-2xl mt-3">
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 flex-grow bg-background rounded-xl p-2">
              <Gift className="h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Message NeuraSaMu"
                className="bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base flex-grow h-auto p-0"
              />
            </div>
            <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0">
              <Send className="h-5 w-5" />
            </Button>
            <div className="w-px h-6 bg-border mx-1"></div>
            <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M15.63 15.63a1 1 0 1 0-1.26-1.26l-3.37 3.37-3.37-3.37a1 1 0 1 0-1.26 1.26l3.37 3.37-3.37 3.37a1 1 0 1 0 1.26 1.26l3.37-3.37 3.37 3.37a1 1 0 0 0 1.26-1.26l-3.37-3.37 3.37-3.37zM10.5 2.5a1 1 0 0 0-2 0v1a1 1 0 0 0 2 0v-1zm-4.13.13a1 1 0 0 0-1.26 1.26l.24.24a1 1 0 0 0 1.26-1.26l-.24-.24zm8.26 0a1 1 0 0 0-.24 1.5l.24.24a1 1 0 0 0 1.26-1.26l-.24-.24a1 1 0 0 0-1.02-.24zM4.5 10.5a1 1 0 0 0 0-2h-1a1 1 0 0 0 0 2h1zm13 0a1 1 0 0 0 0-2h-1a1 1 0 0 0 0 2h1z"/></svg>
                <span className="sr-only">Call</span>
            </Button>
        </div>
      </div>
    </div>
  );
}
