import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search, Info } from "lucide-react";

const archive = {
    "Today": [
        { name: "Friend Agent", message: "Deleted chat snippet...", avatar: "https://placehold.co/40x40.png" },
        { name: "Teacher Agent", message: "Deleted an image.", avatar: "https://placehold.co/40x40.png" },
    ],
    "Yesterday": [
        { name: "Boss Agent", message: "Deleted chat snippet...", avatar: "https://placehold.co/40x40.png" },
    ],
}

export default function ArchivePage() {
    return (
        <div className="space-y-6">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search archive..." className="pl-10" />
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                <Info className="h-5 w-5" />
                <p>Archived items are automatically deleted after 24 hours.</p>
            </div>

            <Accordion type="single" collapsible defaultValue="Today" className="w-full">
                {Object.entries(archive).map(([date, chats]) => (
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
