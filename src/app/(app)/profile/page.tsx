
"use client";

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Phone, MessageSquare, Edit, Save } from 'lucide-react';
import type { Chat } from '@/app/(app)/chats/page';

function ProfileContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const initialName = searchParams.get('name') || 'Unknown User';
    const avatar = searchParams.get('avatar') || 'https://placehold.co/128x128.png';
    const initialPhone = searchParams.get('phone') || 'No phone number';
    const emoji = searchParams.get('emoji');
    const originalName = searchParams.get('name') || '';

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(initialName);
    const [phone, setPhone] = useState(initialPhone);

    const handleMakeCall = () => {
        if (phone && phone !== 'No phone number') {
            window.location.href = `tel:${phone}`;
        } else {
            alert("No phone number available for this contact.");
        }
    };

    const handleSendMessage = () => {
        const chatUrl = `/chat-detail?agent=${encodeURIComponent(name)}&avatar=${encodeURIComponent(avatar)}&phone=${encodeURIComponent(phone)}&emoji=${encodeURIComponent(emoji || '')}`;
        router.push(chatUrl);
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        try {
            const chats: Chat[] = JSON.parse(localStorage.getItem('chats') || '[]');
            const updatedChats = chats.map(chat => {
                if (chat.name === originalName) {
                    return { ...chat, name, phone };
                }
                return chat;
            });
            localStorage.setItem('chats', JSON.stringify(updatedChats));
            
            // Update URL to reflect new name for future edits, without reloading the page
            const newUrl = `${window.location.pathname}?name=${encodeURIComponent(name)}&avatar=${encodeURIComponent(avatar)}&phone=${encodeURIComponent(phone)}&emoji=${encodeURIComponent(emoji || '')}`;
            window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);

        } catch (error) {
            console.error("Failed to save contact changes:", error);
        }
        setIsEditing(false);
    };

    return (
        <div className="flex flex-col items-center pt-8 space-y-6">
            <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-primary shadow-lg">
                    <AvatarImage src={avatar} data-ai-hint="person profile" />
                    <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                </Avatar>
            </div>
            
            <div className="text-center">
                {isEditing ? (
                    <Input 
                        className="text-3xl font-bold text-center bg-transparent border-0 border-b-2 rounded-none h-auto focus-visible:ring-0"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                ) : (
                    <h1 className="text-3xl font-bold">{name}</h1>
                )}
                {isEditing ? (
                    <Input
                        type="tel"
                        className="text-center text-muted-foreground bg-transparent border-0 h-auto focus-visible:ring-0"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                ) : (
                    <p className="text-muted-foreground">{phone}</p>
                )}
            </div>

            <div className="flex gap-4">
                <Button size="lg" className="gap-2" onClick={handleSendMessage}>
                    <MessageSquare />
                    Message
                </Button>
                <Button size="lg" variant="outline" className="gap-2" onClick={handleMakeCall}>
                    <Phone />
                    Call
                </Button>
            </div>

            <Card className="w-full max-w-md">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>User Info</CardTitle>
                    {isEditing ? (
                        <Button variant="outline" size="icon" onClick={handleSave}>
                            <Save className="h-5 w-5" />
                        </Button>
                    ) : (
                        <Button variant="outline" size="icon" onClick={handleEditToggle}>
                            <Edit className="h-5 w-5" />
                        </Button>
                    )}
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Username</span>
                        <span className="font-medium">{name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Phone</span>
                        <span className="font-medium">{phone}</span>
                    </div>
                     <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <span className="font-medium text-green-500">Online</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default function ProfilePage() {
    return (
        <Suspense fallback={<div>Loading profile...</div>}>
            <ProfileContent />
        </Suspense>
    );
}
