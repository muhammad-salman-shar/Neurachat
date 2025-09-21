

"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { SendHorizontal, Phone, Bot, Video, Mic, Paperclip, Trash, Copy, CheckSquare, X } from "lucide-react";
import Image from "next/image";
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState, useRef, ChangeEvent } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


type Message = {
  id: string;
  sender: "user" | "ai";
  text: string;
  avatar: string;
  name: string;
  time: string;
  image?: string;
};

function ChatContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const agentName = searchParams.get('agent') || 'AI Companion';
  const agentEmoji = searchParams.get('emoji') || '🤖';
  const agentAvatar = searchParams.get('avatar') || 'https://placehold.co/100x100.png';
  const contactPhone = searchParams.get('phone');
  const isNewChat = searchParams.get('isNew') === 'true';

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedMessages, setSelectedMessages] = useState<Set<string>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    if (contactPhone && contactPhone !== 'undefined' && agentEmoji === '👤') {
      const smsUri = `sms:${contactPhone}?body=${encodeURIComponent(inputValue)}`;
      window.location.href = smsUri;
      setInputValue('');
      return;
    }

    if (isNewChat && messages.length === 0) {
       try {
            const existingChats = JSON.parse(localStorage.getItem("chats") || "[]");
            const isAlreadyAdded = existingChats.some((chat: any) => chat.name === agentName);
    
            if (!isAlreadyAdded) {
                 const newChat = {
                    name: agentName,
                    avatar: agentAvatar,
                    hint: "person face",
                    message: inputValue,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    emoji: agentEmoji,
                    unread: true,
                    phone: contactPhone,
                };
                localStorage.setItem("chats", JSON.stringify([...existingChats, newChat]));
            }
        } catch (error) {
            console.error("Failed to update chats in localStorage", error);
        }
        router.push('/chats');
        return;
    }


    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue,
      avatar: 'https://placehold.co/100x100.png',
      name: 'You',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newMessage: Message = {
          id: Date.now().toString(),
          sender: 'user',
          text: '',
          image: e.target?.result as string,
          avatar: 'https://placehold.co/100x100.png',
          name: 'You',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prevMessages => [...prevMessages, newMessage]);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleDelete = (id: string) => {
    setMessages(messages.filter(msg => msg.id !== id));
  }

  const handleSelect = (id: string) => {
    setSelectedMessages(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  const handleDeleteSelected = () => {
    setMessages(messages.filter(msg => !selectedMessages.has(msg.id)));
    setSelectedMessages(new Set());
  }

  const handleMakeCall = () => {
    if (contactPhone && contactPhone !== 'undefined' && contactPhone !== 'null') {
      window.location.href = `tel:${contactPhone}`;
    } else {
      alert("No phone number available for this contact.");
    }
  };

  const inSelectionMode = selectedMessages.size > 0;

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col animate-fade-in-up">
       {inSelectionMode && (
        <div className="flex items-center justify-between p-2 bg-card mb-2 rounded-xl">
          <Button variant="ghost" size="icon" onClick={() => setSelectedMessages(new Set())}>
            <X className="h-5 w-5" />
          </Button>
          <span className="font-semibold">{selectedMessages.size} selected</span>
          <Button variant="ghost" size="icon" onClick={handleDeleteSelected}>
            <Trash className="h-5 w-5 text-destructive" />
          </Button>
        </div>
      )}
      <div className="flex-1 bg-background rounded-3xl shadow-inner overflow-hidden">
        <ScrollArea className="h-full p-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <span className="text-6xl mb-4">{agentEmoji}</span>
              <h2 className="text-2xl font-bold text-foreground">Start chatting with {agentName}</h2>
              <p>Send a message to begin your conversation.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message) => {
                 const isSelected = selectedMessages.has(message.id);
                 return (
                  <div
                    key={message.id}
                    className={cn(
                      "flex items-end gap-3",
                      message.sender === "user" && "flex-row-reverse"
                    )}
                  >
                     {message.sender !== 'user' && (
                        <Avatar className={cn("h-10 w-10")}>
                        <AvatarImage src={agentAvatar} alt={message.name} data-ai-hint="person face" />
                        <AvatarFallback>{message.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                     )}
                    <div className={cn("max-w-xs md:max-w-md lg:max-w-lg space-y-1", message.sender === 'user' && 'items-end flex flex-col')}>
                       <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <div
                            className={cn(
                              "rounded-2xl px-4 py-2.5 shadow-sm cursor-pointer relative text-card-foreground",
                              message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card',
                              { 'p-2': message.image && !message.text },
                              isSelected && "ring-2 ring-primary"
                            )}
                          >
                            {isSelected && (
                              <div className="absolute -top-2 -left-2 bg-primary rounded-full p-0.5">
                                <CheckSquare className="h-4 w-4 text-primary-foreground" />
                              </div>
                            )}
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
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {message.text && (
                            <DropdownMenuItem onClick={() => handleCopy(message.text)}>
                              <Copy className="mr-2 h-4 w-4" />
                              <span>Copy</span>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => handleSelect(message.id)}>
                             <CheckSquare className="mr-2 h-4 w-4" />
                             <span>{isSelected ? "Deselect" : "Select"}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(message.id)} className="text-destructive">
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <p className="text-xs text-muted-foreground px-1">{message.time}</p>
                    </div>
                  </div>
              )})}
            </div>
          )}
        </ScrollArea>
      </div>
      <div className="mt-auto bg-card rounded-2xl shadow-lg p-3 mx-auto w-full max-w-2xl mt-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 flex-grow bg-background rounded-xl p-2">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageSelect}
              className="hidden" 
              accept="image/*"
            />
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={triggerFileSelect}>
                <Paperclip className="h-5 w-5 text-muted-foreground" />
                <span className="sr-only">Attach file</span>
            </Button>
            <Input
              placeholder={`Message ${agentName}`}
              className="bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base flex-grow h-auto p-0"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
          </div>
          <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0" onClick={handleSendMessage}>
            <SendHorizontal className="h-5 w-5" />
          </Button>
          <div className="w-px h-6 bg-border mx-1"></div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0">
                    <Phone className="h-5 w-5" />
                    <span className="sr-only">Call</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleMakeCall}>
                    <Video className="mr-2 h-4 w-4" />
                    <span>Video Call</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleMakeCall}>
                    <Mic className="mr-2 h-4 w-4" />
                    <span>Voice Call</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export default function ChatsDetailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatContent />
    </Suspense>
  )
}
