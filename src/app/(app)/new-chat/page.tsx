
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { UserPlus, Users, Search, Contact } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

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

type Contact = {
    name?: string[];
    icon?: string[];
};

export default function NewChatPage() {
    const [phoneContacts, setPhoneContacts] = useState<Contact[]>([]);
    const [isContactsApiSupported, setIsContactsApiSupported] = useState(false);

    useEffect(() => {
        if ('contacts' in navigator && 'select' in (navigator as any).contacts) {
            setIsContactsApiSupported(true);
        }
    }, []);

    const handleGetContacts = async () => {
        if (!isContactsApiSupported) {
            alert("Your browser doesn't support the Contact Picker API.");
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

    return (
        <div className="h-[calc(100vh-10rem)] flex flex-col">
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search agents or contacts..." className="pl-10" />
            </div>

            <ScrollArea className="flex-1">
                <Card>
                    <CardContent className="p-4 space-y-4">
                        <Button variant="ghost" className="w-full justify-start gap-3 text-base h-auto p-2">
                            <div className="bg-primary text-primary-foreground rounded-full p-2">
                                <UserPlus className="h-6 w-6" />
                            </div>
                            <span>New Agent</span>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-3 text-base h-auto p-2">
                           <div className="bg-primary text-primary-foreground rounded-full p-2">
                             <Users className="h-6 w-6" />
                           </div>
                           <span>Create Group</span>
                        </Button>
                    </CardContent>
                </Card>

                <Separator className="my-4" />

                <h2 className="text-lg font-semibold mb-2 px-2">Agents</h2>
                <div className="space-y-1">
                    {agents.map((agent) => (
                        <Link href={`/chat-detail?agent=${encodeURIComponent(agent.name)}&emoji=${encodeURIComponent(agent.emoji)}`} key={agent.name} className="block hover:no-underline">
                           <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-card transition-colors cursor-pointer">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={agent.avatar} data-ai-hint={agent.hint} />
                                    <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <p className="font-bold text-lg text-foreground">{agent.name}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between items-center mb-2 px-2">
                    <h2 className="text-lg font-semibold">Phone Contacts</h2>
                    {isContactsApiSupported && (
                        <Button onClick={handleGetContacts} variant="outline" size="sm">
                            <Contact className="mr-2 h-4 w-4" />
                            Sync Contacts
                        </Button>
                    )}
                </div>
                <div className="space-y-1">
                    {phoneContacts.length > 0 ? (
                        phoneContacts.map((contact, index) => (
                           <div key={index} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-card transition-colors cursor-pointer">
                                <Avatar className="h-12 w-12">
                                    {contact.icon && contact.icon.length > 0 ? (
                                        <AvatarImage src={contact.icon[0]} data-ai-hint="person face" />
                                    ) : (
                                       <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person placeholder" />
                                    )}
                                    <AvatarFallback>{contact.name ? contact.name[0].charAt(0) : '?'}</AvatarFallback>
                                </Avatar>
                                <p className="font-bold text-lg text-foreground">{contact.name ? contact.name[0] : "No Name"}</p>
                            </div>
                        ))
                    ) : (
                       <p className="text-sm text-muted-foreground px-4 py-2">Click "Sync Contacts" to select and display contacts from your phone.</p>
                    )}
                </div>
            </ScrollArea>
        </div>
    )
}
