
"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Phone, MessageSquare, Video } from 'lucide-react';

function ProfileContent() {
    const searchParams = useSearchParams();
    const name = searchParams.get('name') || 'Unknown User';
    const avatar = searchParams.get('avatar') || 'https://placehold.co/128x128.png';
    const phone = searchParams.get('phone') || 'No phone number';

    return (
        <div className="flex flex-col items-center pt-8 space-y-6">
            <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-primary shadow-lg">
                    <AvatarImage src={avatar} data-ai-hint="person profile" />
                    <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                </Avatar>
            </div>
            
            <div className="text-center">
                <h1 className="text-3xl font-bold">{name}</h1>
                <p className="text-muted-foreground">{phone}</p>
            </div>

            <div className="flex gap-4">
                <Button size="lg" className="gap-2">
                    <MessageSquare />
                    Message
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                    <Phone />
                    Call
                </Button>
            </div>

            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>User Info</CardTitle>
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
