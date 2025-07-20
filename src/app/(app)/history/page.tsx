import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const history = {
    "Today": [
        { name: "Friend Agent", message: "Not much, bro! Just chillin'...", avatar: "https://placehold.co/40x40.png" },
        { name: "Teacher Agent", message: "Remember to review chapter 5...", avatar: "https://placehold.co/40x40.png" },
    ],
    "Yesterday": [
        { name: "Boss Agent", message: "Deadline is EOD tomorrow.", avatar: "https://placehold.co/40x40.png" },
        { name: "Gym Coach", message: "You missed your workout!", avatar: "https://placehold.co/40x40.png" },
    ],
    "June 15, 2024": [
        { name: "Comedian Agent", message: "Why don't scientists trust atoms?...", avatar: "https://placehold.co/40x40.png" },
    ]
}

export default function HistoryPage() {
    return (
        <div className="space-y-6">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search by keyword or agent..." className="pl-10" />
            </div>

            <Accordion type="single" collapsible defaultValue="Today" className="w-full">
                {Object.entries(history).map(([date, chats]) => (
                     <AccordionItem value={date} key={date}>
                        <AccordionTrigger className="text-lg font-semibold">{date}</AccordionTrigger>
                        <AccordionContent>
                           <div className="space-y-4 pt-2">
                             {chats.map((chat, index) => (
                                <div key={index} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted cursor-pointer">
                                     <Avatar>
                                        <AvatarImage src={chat.avatar} data-ai-hint="person face" />
                                        <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-grow">
                                        <p className="font-medium">{chat.name}</p>
                                        <p className="text-sm text-muted-foreground truncate">{chat.message}</p>
                                    </div>
                                </div>
                             ))}
                           </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}
