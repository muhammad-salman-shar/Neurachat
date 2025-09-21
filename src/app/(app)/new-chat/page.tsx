
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// This page is no longer used directly. It redirects to the chats page.
// The new chat functionality is now handled by the NewChatDialog component.
export default function NewChatPage() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/chats');
    }, [router]);

    return (
        <div className="flex items-center justify-center h-full">
            <p>Redirecting...</p>
        </div>
    );
}
