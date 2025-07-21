
"use client";

import { useState, useRef, ChangeEvent, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Camera, Contact, User, Users } from "lucide-react";
import { useRouter } from "next/navigation";

const agents = [
    { name: "Friend Agent", avatar: "https://placehold.co/100x100.png", hint: "friendly person" },
    { name: "Teacher Agent", avatar: "https://placehold.co/100x100.png", hint: "teacher woman" },
    { name: "Boss Agent", avatar: "https://placehold.co/100x100.png", hint: "business man" },
    { name: "Girlfriend Agent", avatar: "https://placehold.co/100x100.png", hint: "happy woman" },
    { name: "Religious Guide", avatar: "https://placehold.co/100x100.png", hint: "wise person" },
    { name: "Gym Coach", avatar: "https://placehold.co/100x100.png", hint: "fit person" },
    { name: "Comedian Agent", avatar: "https://placehold.co/100x100.png", hint: "laughing person" },
    { name: "Business Mentor", avatar: "https://placehold.co/100x100.png", hint: "mentor professional" },
];

type PhoneContact = {
    name?: string[];
    icon?: string[];
};

export default function CreateGroupPage() {
    const [groupName, setGroupName] = useState("");
    const [groupImage, setGroupImage] = useState<string | null>(null);
    const [selectedAgents, setSelectedAgents] = useState<Set<string>>(new Set());
    const [phoneContacts, setPhoneContacts] = useState<PhoneContact[]>([]);
    const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set());
    const [isContactsApiSupported, setIsContactsApiSupported] = useState(false);
    const [isRunningInIframe, setIsRunningInIframe] = useState(false);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        const inIframe = window.self !== window.top;
        setIsRunningInIframe(inIframe);

        if ('contacts' in navigator && 'select' in (navigator as any).contacts) {
            setIsContactsApiSupported(true);
        }
    }, []);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setGroupImage(event.target?.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    
    const handleGetContacts = async () => {
        if (!isContactsApiSupported || isRunningInIframe) {
            alert("Contact syncing is not available in this environment.");
            return;
        }
        try {
            const contacts = await (navigator as any).contacts.select(['name', 'icon'], { multiple: true });
            if (contacts.length > 0) {
                setPhoneContacts(contacts);
            }
        } catch (error) {
            console.error("Error picking contacts:", error);
        }
    };

    const toggleAgentSelection = (agentName: string) => {
        setSelectedAgents(prev => {
            const newSet = new Set(prev);
            if (newSet.has(agentName)) {
                newSet.delete(agentName);
            } else {
                newSet.add(agentName);
            }
            return newSet;
        });
    };

     const toggleContactSelection = (contactName: string) => {
        setSelectedContacts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(contactName)) {
                newSet.delete(contactName);
            } else {
                newSet.add(contactName);
            }
            return newSet;
        });
    };
    
    const isSyncDisabled = !isContactsApiSupported || isRunningInIframe;

    const handleCreateGroup = () => {
        if (!groupName) {
            alert("Please enter a group name.");
            return;
        }

        const newGroup = {
            name: groupName,
            avatar: groupImage || "https://placehold.co/100x100.png",
            hint: "group icon",
            message: `${[...selectedAgents, ...selectedContacts].slice(0, 2).join(', ')} and others`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isGroup: true,
            emoji: "👥",
            unread: true,
        };

        const existingChats = JSON.parse(localStorage.getItem("chats") || "[]");
        localStorage.setItem("chats", JSON.stringify([...existingChats, newGroup]));

        router.push('/chats');
    };

    return (
        <div className="h-[calc(100vh-10rem)] flex flex-col">
            <div className="flex flex-col items-center gap-4 mb-6">
                <div className="relative">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={groupImage || "https://placehold.co/100x100.png"} data-ai-hint="group placeholder"/>
                        <AvatarFallback><Users className="h-10 w-10" /></AvatarFallback>
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
                <Input
                    placeholder="Group Name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="text-center text-lg font-semibold"
                />
            </div>

            <ScrollArea className="flex-1">
                <h2 className="text-lg font-semibold mb-2 px-2 flex items-center gap-2"><User className="h-5 w-5"/>Add Agents</h2>
                <div className="space-y-1 mb-4">
                    {agents.map((agent) => (
                        <Label key={agent.name} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-card transition-colors cursor-pointer">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={agent.avatar} data-ai-hint={agent.hint} />
                                <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-bold text-lg text-foreground flex-1">{agent.name}</span>
                            <Checkbox 
                                checked={selectedAgents.has(agent.name)}
                                onCheckedChange={() => toggleAgentSelection(agent.name)}
                            />
                        </Label>
                    ))}
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between items-center mb-2 px-2">
                    <h2 className="text-lg font-semibold flex items-center gap-2"><Contact className="h-5 w-5"/>Add Friends</h2>
                     <Button onClick={handleGetContacts} variant="outline" size="sm" disabled={isSyncDisabled}>
                        <Contact className="mr-2 h-4 w-4" />
                        Sync Contacts
                    </Button>
                </div>
                 <div className="space-y-1">
                    {phoneContacts.length > 0 ? (
                        phoneContacts.map((contact, index) => {
                           const contactName = contact.name ? contact.name[0] : `Contact ${index}`;
                           return (
                           <Label key={index} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-card transition-colors cursor-pointer">
                                <Avatar className="h-12 w-12">
                                    {contact.icon && contact.icon.length > 0 ? (
                                        <AvatarImage src={contact.icon[0]} data-ai-hint="person face" />
                                    ) : (
                                       <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person placeholder" />
                                    )}
                                    <AvatarFallback>{contact.name ? contact.name[0].charAt(0) : '?'}</AvatarFallback>
                                </Avatar>
                                <p className="font-bold text-lg text-foreground flex-1">{contactName}</p>
                                <Checkbox 
                                  checked={selectedContacts.has(contactName)}
                                  onCheckedChange={() => toggleContactSelection(contactName)}
                                />
                            </Label>
                           )
                        })
                    ) : (
                       <p className="text-sm text-muted-foreground px-4 py-2">
                         {isSyncDisabled
                           ? "Contact syncing is unavailable."
                           : 'Click "Sync Contacts" to add friends.'}
                       </p>
                    )}
                </div>
            </ScrollArea>
             <div className="mt-4">
                <Button className="w-full" size="lg" onClick={handleCreateGroup}>Create Group</Button>
            </div>
        </div>
    );
}
