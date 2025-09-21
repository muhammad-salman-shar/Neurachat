
"use client";

import { useState, useRef, ChangeEvent, useEffect, Suspense } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, User, Phone } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Chat } from "@/app/(app)/chats/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function CreateContactForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const phoneFromParams = searchParams.get("phone");

    const [contactName, setContactName] = useState("");
    const [contactPhone, setContactPhone] = useState(phoneFromParams || "");
    const [contactImage, setContactImage] = useState<string | null>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (phoneFromParams) {
            setContactPhone(phoneFromParams);
        }
    }, [phoneFromParams]);
    
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setContactImage(event.target?.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSaveContact = () => {
        if (!contactName || !contactPhone) {
            alert("Please enter a name and phone number.");
            return;
        }

        const newContact: Chat = {
            name: contactName,
            avatar: contactImage || "https://placehold.co/100x100.png",
            hint: "person face",
            message: `You are now connected with ${contactName}.`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            emoji: "👤",
            unread: false,
            phone: contactPhone,
        };

        const existingChats = JSON.parse(localStorage.getItem("chats") || "[]");
        localStorage.setItem("chats", JSON.stringify([...existingChats, newContact]));

        router.push('/chats');
    };

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Create New Contact</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center gap-4 mb-6">
                    <div className="relative">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={contactImage || "https://placehold.co/100x100.png"} data-ai-hint="person placeholder"/>
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

                <div className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="contact-name">Name</Label>
                        <Input id="contact-name" value={contactName} onChange={e => setContactName(e.target.value)} placeholder="Enter name" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="contact-phone">Phone</Label>
                        <Input id="contact-phone" type="tel" value={contactPhone} onChange={e => setContactPhone(e.target.value)} placeholder="Enter phone number" />
                    </div>
                </div>

                 <Button onClick={handleSaveContact} className="w-full mt-6">
                    Save Contact
                </Button>
            </CardContent>
        </Card>
    );
}

export default function CreateContactPage() {
    return (
        <div className="flex justify-center items-start pt-8">
            <Suspense fallback={<div>Loading...</div>}>
                <CreateContactForm />
            </Suspense>
        </div>
    )
}

