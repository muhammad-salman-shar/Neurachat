
"use client";

import { useState, useEffect, ReactNode, useRef, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Contact, Bot, Check, Users, UserPlus, ArrowLeft, Camera, Phone, User } from "lucide-react";
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

type PhoneContact = {
    name?: string[];
    tel?: string[];
    icon?: string[];
};

type SelectableItem = {
    name: string;
    avatar: string;
    hint: string;
    emoji: string;
    phone?: string;
}

export default function NewChatDialog({ children, onOpenChange, onChatsAdded }: { children: ReactNode, onOpenChange: (open: boolean) => void, onChatsAdded: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [phoneContacts, setPhoneContacts] = useState<PhoneContact[]>([]);
    const [isContactsApiSupported, setIsContactsApiSupported] = useState(false);
    const [selectedItem, setSelectedItem] = useState<SelectableItem | null>(null);
    const router = useRouter();
    const [view, setView] = useState<'list' | 'create'>('list');

    // Form state for new contact
    const [newContactName, setNewContactName] = useState("");
    const [newContactPhone, setNewContactPhone] = useState("");
    const [newContactImage, setNewContactImage] = useState<string | null>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if ('contacts' in navigator && 'select' in (navigator as any).contacts) {
            setIsContactsApiSupported(true);
        }
    }, []);
    
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setNewContactImage(event.target?.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };


    const handleGetContacts = async () => {
        if (!isContactsApiSupported) {
            alert("Contact syncing is not available in this environment.");
            return;
        }
        try {
            const contacts = await (navigator as any).contacts.select(['name', 'icon', 'tel'], { multiple: true });
            if (contacts.length > 0) {
                setPhoneContacts(contacts);
            }
        } catch (error) {
            console.error("Error picking contacts:", error);
        }
    };

    const handleSelect = (item: SelectableItem) => {
        setSelectedItem(item);
    };

    const handleDone = () => {
        if (!selectedItem) return;

        const existingChats: Chat[] = JSON.parse(localStorage.getItem("chats") || "[]");
        const isAlreadyAdded = existingChats.some(chat => chat.name === selectedItem.name);

        if (!isAlreadyAdded) {
            const newChat: Chat = {
                name: selectedItem.name,
                avatar: selectedItem.avatar,
                hint: selectedItem.hint,
                message: `You are now connected with ${selectedItem.name}.`,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                emoji: selectedItem.emoji,
                unread: false,
                phone: selectedItem.phone,
            };
            localStorage.setItem("chats", JSON.stringify([...existingChats, newChat]));
            onChatsAdded();
        }
        
        setIsOpen(false);
        router.push(`/chat-detail?agent=${encodeURIComponent(selectedItem.name)}&emoji=${encodeURIComponent(selectedItem.emoji)}&avatar=${encodeURIComponent(selectedItem.avatar)}&phone=${encodeURIComponent(selectedItem.phone || '')}`);
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

        setSelectedItem(newContact);
        
        // Reset form and view
        setNewContactName("");
        setNewContactPhone("");
        setNewContactImage(null);
        setView('list');
        handleDone(); // This will add to chats and navigate
    };
    
    const resetState = () => {
        setSelectedItem(null);
        setView('list');
        setNewContactName("");
        setNewContactPhone("");
        setNewContactImage(null);
    }

    useEffect(() => {
        onOpenChange(isOpen);
        if(!isOpen) {
            resetState();
        }
    }, [isOpen, onOpenChange]);

    const renderContactCreationForm = () => (
         <div className="flex flex-col h-full">
            <Button variant="ghost" onClick={() => setView('list')} className="self-start mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to list
            </Button>
            <div className="flex-grow space-y-4">
                 <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={newContactImage || "https://placehold.co/100x100.png"} data-ai-hint="person placeholder"/>
                            <AvatarFallback><User className="h-10 w-10" /></AvatarFallback>
                        </Avatar>
                        <input type="file" ref={imageInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
                        <Button
                            size="icon"
                            className="absolute bottom-0 right-0 rounded-full"
                            onClick={() => imageInputRef.current?.click()}
                        >
                            <Camera className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
                <div>
                    <Label htmlFor="contact-name">Name</Label>
                    <Input id="contact-name" value={newContactName} onChange={e => setNewContactName(e.target.value)} placeholder="Enter name" />
                </div>
                 <div>
                    <Label htmlFor="contact-phone">Phone</Label>
                    <Input id="contact-phone" type="tel" value={newContactPhone} onChange={e => setNewContactPhone(e.target.value)} placeholder="Enter phone number" />
                </div>
            </div>
             <DialogFooter>
                <Button onClick={handleSaveContact} className="w-full">
                    Save Contact
                </Button>
            </DialogFooter>
        </div>
    );

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px] h-[70vh] flex flex-col">
                 {view === 'create' ? renderContactCreationForm() : (
                    <>
                        <DialogHeader>
                            <DialogTitle>New Chat</DialogTitle>
                        </DialogHeader>
                        <Tabs defaultValue="agents" className="flex-grow flex flex-col overflow-hidden">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="agents"><Bot className="mr-2 h-4 w-4"/>Agents</TabsTrigger>
                                <TabsTrigger value="contacts"><Contact className="mr-2 h-4 w-4"/>Contacts</TabsTrigger>
                            </TabsList>
                            <TabsContent value="agents" className="flex-grow overflow-hidden">
                                <ScrollArea className="h-full pr-3">
                                    <div className="space-y-1 py-2">
                                        <Button asChild variant="outline" className="w-full">
                                            <Link href="/create-group" onClick={() => setIsOpen(false)}>
                                                <Users className="mr-2 h-4 w-4" />
                                                Create Group
                                            </Link>
                                        </Button>
                                        {agents.map((agent) => {
                                            const isSelected = selectedItem?.name === agent.name;
                                            return (
                                                <div key={agent.name} onClick={() => handleSelect(agent)} className={cn("flex items-center gap-4 p-3 rounded-2xl transition-colors cursor-pointer", isSelected ? "bg-primary/10" : "hover:bg-card")}>
                                                    <Avatar className="h-12 w-12">
                                                        <AvatarImage src={agent.avatar} data-ai-hint={agent.hint} />
                                                        <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <p className="font-bold text-lg text-foreground flex-1">{agent.name}</p>
                                                    {isSelected && <Check className="h-5 w-5 text-primary" />}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </ScrollArea>
                            </TabsContent>
                            <TabsContent value="contacts" className="flex-grow overflow-hidden">
                                 <ScrollArea className="h-full pr-3">
                                    <div className="space-y-1 py-2">
                                         <Button onClick={() => setView('create')} variant="outline" size="sm" className="w-full mb-2">
                                            <UserPlus className="mr-2 h-4 w-4" />
                                            Create New Contact
                                        </Button>
                                         <Button onClick={handleGetContacts} variant="outline" size="sm" className="w-full mb-2">
                                            <Contact className="mr-2 h-4 w-4" />
                                            Sync Phone Contacts
                                        </Button>
                                        {phoneContacts.length > 0 ? (
                                            phoneContacts.map((contact, index) => {
                                                const contactName = contact.name ? contact.name[0] : `Contact ${index}`;
                                                const item = {
                                                    name: contactName,
                                                    avatar: contact.icon?.[0] || "https://placehold.co/100x100.png",
                                                    hint: "person face",
                                                    emoji: "👤",
                                                    phone: contact.tel?.[0]
                                                };
                                                const isSelected = selectedItem?.name === item.name;
                                                return (
                                                    <div key={`${contactName}-${index}`} onClick={() => handleSelect(item)} className={cn("flex items-center gap-4 p-3 rounded-2xl transition-colors cursor-pointer", isSelected ? "bg-primary/10" : "hover:bg-card")}>
                                                        <Avatar className="h-12 w-12">
                                                            <AvatarImage src={item.avatar} data-ai-hint={item.hint} />
                                                            <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <p className="font-bold text-lg text-foreground flex-1">{item.name}</p>
                                                        {isSelected && <Check className="h-5 w-5 text-primary" />}
                                                    </div>
                                                )
                                            })
                                        ) : (
                                            <p className="text-sm text-muted-foreground text-center pt-4">
                                                {isContactsApiSupported ? 'Click "Sync Contacts" to display contacts from your phone.' : "Contact syncing is unavailable."}
                                            </p>
                                        )}
                                    </div>
                                </ScrollArea>
                            </TabsContent>
                        </Tabs>
                        <DialogFooter>
                            <Button onClick={handleDone} disabled={!selectedItem} className="w-full">
                                Done
                            </Button>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
