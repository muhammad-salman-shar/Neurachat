"use client";

import { useState, useEffect, ReactNode, useRef, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Contact, Bot, Check, Users, UserPlus, ArrowLeft, Camera, User, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Chat } from "@/app/(app)/chats/page";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const agents = [
  { name: "Friend Agent", avatar: "https://placehold.co/100x100.png", hint: "friendly person", emoji: "😁" },
  { name: "Teacher Agent", avatar: "https://placehold.co/100x100.png", hint: "teacher woman", emoji: "📝" },
  { name: "Boss Agent", avatar: "https://placehold.co/100x100.png", hint: "business man", emoji: "💼" },
  { name: "Girlfriend Agent", avatar: "https://placehold.co/100x100.png", hint: "happy woman", emoji: "🥰" },
  { name: "Religious Guide", avatar: "https://placehold.co/100x100.png", hint: "wise person", emoji: "🙏" },
  { name: "Gym Coach", avatar: "https://placehold.co/100x100.png", hint: "fit person", emoji: "💪" },
  { name: "Comedian Agent", avatar: "https://placehold.co/100x100.png", hint: "laughing person", emoji: "😂" },
  { name: "Business Mentor", avatar: "https://placehold.co/100x100.png", hint: "mentor professional", emoji: "📈" },
];

type SelectableItem = {
  name: string;
  avatar: string;
  hint: string;
  emoji: string;
  phone?: string;
}

export default function NewChatDialog({ children, onOpenChange, onChatsAdded }: { children: ReactNode, onOpenChange: (open: boolean) => void, onChatsAdded: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [phoneContacts, setPhoneContacts] = useState<SelectableItem[]>([]);
  const [isLoadingContacts, setIsLoadingContacts] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SelectableItem | null>(null);
  const [view, setView] = useState<'list' | 'create'>('list');
  const [newContactName, setNewContactName] = useState("");
  const [newContactPhone, setNewContactPhone] = useState("");
  const [newContactImage, setNewContactImage] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => setNewContactImage(event.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleGetContacts = async () => {
    setIsLoadingContacts(true);
    try {
      // Capacitor Contacts Plugin use karo
      const { Contacts } = await import('@capacitor-community/contacts');
      
      // Pehle permission maango
      const permission = await Contacts.requestPermissions();
      
      if (permission.contacts === 'granted') {
        const result = await Contacts.getContacts({
          projection: {
            name: true,
            phones: true,
            image: true,
          }
        });

        const mapped: SelectableItem[] = result.contacts
          .filter(c => c.name?.display && c.phones && c.phones.length > 0)
          .map(c => ({
            name: c.name?.display || 'Unknown',
            avatar: c.image?.base64String 
              ? `data:image/jpeg;base64,${c.image.base64String}` 
              : "https://placehold.co/100x100.png",
            hint: "person face",
            emoji: "👤",
            phone: c.phones?.[0]?.number || '',
          }));

        setPhoneContacts(mapped);
      } else {
        alert("Contacts permission denied. Please allow in phone settings.");
      }
    } catch (error) {
      console.error("Contacts error:", error);
      alert("Could not load contacts. Make sure app has contacts permission.");
    } finally {
      setIsLoadingContacts(false);
    }
  };

  const handleSelect = (item: SelectableItem) => setSelectedItem(item);

  const handleDone = (item?: SelectableItem) => {
    const selected = item || selectedItem;
    if (!selected) return;

    const existingChats: Chat[] = JSON.parse(localStorage.getItem("chats") || "[]");
    const isAlreadyAdded = existingChats.some(chat => chat.name === selected.name);

    if (!isAlreadyAdded) {
      const newChat: Chat = {
        name: selected.name,
        avatar: selected.avatar,
        hint: selected.hint,
        message: `You are now connected with ${selected.name}.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        emoji: selected.emoji,
        unread: false,
        phone: selected.phone,
      };
      localStorage.setItem("chats", JSON.stringify([...existingChats, newChat]));
      onChatsAdded();
    }

    setIsOpen(false);
    router.push(`/chat-detail?agent=${encodeURIComponent(selected.name)}&emoji=${encodeURIComponent(selected.emoji)}&avatar=${encodeURIComponent(selected.avatar)}&phone=${encodeURIComponent(selected.phone || '')}`);
  };

  const handleSaveContact = () => {
    if (!newContactName || !newContactPhone) {
      alert("Please enter a name and phone number.");
      return;
    }
    const newContact: SelectableItem = {
      name: newContactName,
      avatar: newContactImage || "https://placehold.co/100x100.png",
      hint: "person face",
      emoji: "👤",
      phone: newContactPhone,
    };
    setNewContactName("");
    setNewContactPhone("");
    setNewContactImage(null);
    setView('list');
    handleDone(newContact);
  };

  const resetState = () => {
    setSelectedItem(null);
    setView('list');
    setNewContactName("");
    setNewContactPhone("");
    setNewContactImage(null);
  };

  useEffect(() => {
    onOpenChange(isOpen);
    if (!isOpen) resetState();
  }, [isOpen, onOpenChange]);

  const renderCreateForm = () => (
    <div className="flex flex-col h-full">
      <Button variant="ghost" onClick={() => setView('list')} className="self-start mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <div className="flex-grow space-y-4">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={newContactImage || "https://placehold.co/100x100.png"} />
              <AvatarFallback><User className="h-10 w-10" /></AvatarFallback>
            </Avatar>
            <input type="file" ref={imageInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
            <Button size="icon" className="absolute bottom-0 right-0 rounded-full" onClick={() => imageInputRef.current?.click()}>
              <Camera className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div>
          <Label>Name</Label>
          <Input value={newContactName} onChange={e => setNewContactName(e.target.value)} placeholder="Enter name" />
        </div>
        <div>
          <Label>Phone</Label>
          <Input type="tel" value={newContactPhone} onChange={e => setNewContactPhone(e.target.value)} placeholder="Enter phone number" />
        </div>
      </div>
      <DialogFooter>
        <Button onClick={handleSaveContact} className="w-full">Save Contact</Button>
      </DialogFooter>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-[70vh] flex flex-col">
        {view === 'create' ? renderCreateForm() : (
          <>
            <DialogHeader>
              <DialogTitle>New Chat</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="agents" className="flex-grow flex flex-col overflow-hidden">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="agents"><Bot className="mr-2 h-4 w-4" />Agents</TabsTrigger>
                <TabsTrigger value="contacts"><Contact className="mr-2 h-4 w-4" />Contacts</TabsTrigger>
              </TabsList>
              <TabsContent value="agents" className="flex-grow overflow-hidden">
                <ScrollArea className="h-full pr-3">
                  <div className="space-y-1 py-2">
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/create-group" onClick={() => setIsOpen(false)}>
                        <Users className="mr-2 h-4 w-4" />Create Group
                      </Link>
                    </Button>
                    {agents.map((agent) => {
                      const isSelected = selectedItem?.name === agent.name;
                      return (
                        <div key={agent.name} onClick={() => handleSelect(agent)} className={cn("flex items-center gap-4 p-3 rounded-2xl transition-colors cursor-pointer", isSelected ? "bg-primary/10" : "hover:bg-card")}>
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={agent.avatar} />
                            <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <p className="font-bold text-lg flex-1">{agent.name}</p>
                          {isSelected && <Check className="h-5 w-5 text-primary" />}
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="contacts" className="flex-grow overflow-hidden">
                <ScrollArea className="h-full pr-3">
                  <div className="space-y-1 py-2">
                    <Button onClick={() => setView('create')} variant="outline" className="w-full mb-2">
                      <UserPlus className="mr-2 h-4 w-4" />Create New Contact
                    </Button>
                    <Button onClick={handleGetContacts} variant="outline" className="w-full mb-2" disabled={isLoadingContacts}>
                      <RefreshCw className={cn("mr-2 h-4 w-4", isLoadingContacts && "animate-spin")} />
                      {isLoadingContacts ? "Loading..." : "Sync Phone Contacts"}
                    </Button>
                    {phoneContacts.length > 0 ? (
                      phoneContacts.map((contact, index) => {
                        const isSelected = selectedItem?.name === contact.name;
                        return (
                          <div key={index} onClick={() => handleSelect(contact)} className={cn("flex items-center gap-4 p-3 rounded-2xl transition-colors cursor-pointer", isSelected ? "bg-primary/10" : "hover:bg-card")}>
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={contact.avatar} />
                              <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-bold text-lg">{contact.name}</p>
                              {contact.phone && <p className="text-sm text-muted-foreground">{contact.phone}</p>}
                            </div>
                            {isSelected && <Check className="h-5 w-5 text-primary" />}
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-sm text-muted-foreground text-center pt-4">
                        Tap "Sync Phone Contacts" to load your contacts.
                      </p>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button onClick={() => handleDone()} disabled={!selectedItem} className="w-full">Done</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
