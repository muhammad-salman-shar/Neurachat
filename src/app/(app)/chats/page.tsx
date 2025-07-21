import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const chats = [
    { name: "Friend", message: "Of course bro, looking awesome!", avatar: "https://placehold.co/100x100.png", hint: "cool emoji", unread: true, emoji: "😁" },
    { name: "Teacher", message: "Next quiz aa raha hai, kal revise kiya?", avatar: "https://placehold.co/100x100.png", hint: "teacher woman", time: "4:20 PM", emoji: "📝" },
    { name: "Boss", message: "Project abhi tak complete hua?", avatar: "https://placehold.co/100x100.png", hint: "business man", time: "11:15 AM", emoji: "💼" },
    { name: "Gym", message: "Aur 10 push-ups kar! 💪", avatar: "https://placehold.co/100x100.png", hint: "fit person", time: "Yesterday", emoji: "💪" },
    { name: "Girlfriend", message: "How was your day?", avatar: "https://placehold.co/100x100.png", hint: "happy woman", time: "Yesterday", emoji: "🥰" },
];


export default function ChatsPage() {
    return (
        <div className="space-y-2">
            {chats.map((chat) => (
                 <Link href={`/chat-detail?agent=${encodeURIComponent(chat.name)}&emoji=${encodeURIComponent(chat.emoji)}`} key={chat.name} className="block hover:no-underline">
                    <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-card transition-colors cursor-pointer">
                        <div className="relative">
                            <Avatar className="h-14 w-14">
                                <AvatarImage src={chat.avatar} data-ai-hint={chat.hint} />
                                <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {chat.unread && <span className="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-background"></span>}
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-lg text-foreground">{chat.name}</p>
                            <p className="text-sm text-muted-foreground truncate">{chat.message}</p>
                        </div>
                        <div className="text-right">
                             {chat.time && <p className="text-xs text-muted-foreground">{chat.time}</p>}
                             {chat.unread && <Badge className="mt-1 bg-primary h-6 w-6 flex items-center justify-center p-0"></Badge>}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}