import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { FileText, MessageSquareQuote } from "lucide-react";

const mediaItems = [
    { src: 'https://placehold.co/600x400.png', alt: 'Media 1', hint: 'landscape nature' },
    { src: 'https://placehold.co/400x600.png', alt: 'Media 2', hint: 'city architecture' },
    { src: 'https://placehold.co/600x400.png', alt: 'Media 3', hint: 'abstract art' },
    { src: 'https://placehold.co/600x400.png', alt: 'Media 4', hint: 'animal wildlife' },
    { src: 'https://placehold.co/400x600.png', alt: 'Media 5', hint: 'portrait person' },
    { src: 'https://placehold.co/600x400.png', alt: 'Media 6', hint: 'food photography' },
];

const books = [
    { title: 'Chapter 5 Notes', author: 'Teacher Agent' },
    { title: 'Startup Guide', author: 'Business Mentor' },
    { title: 'Workout Plan.pdf', author: 'Gym Coach' },
]

const savedChats = [
    { title: 'Late night gossip', from: 'Friend Agent' },
    { title: 'Project brainstorming', from: 'Boss Agent' },
]

export default function LibraryPage() {
    return (
        <Tabs defaultValue="media" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="books">Books</TabsTrigger>
                <TabsTrigger value="saved">Saved Chats</TabsTrigger>
            </TabsList>
            <ScrollArea className="flex-1 mt-4">
                <TabsContent value="media">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {mediaItems.map((item, index) => (
                            <Card key={index} className="overflow-hidden">
                                <CardContent className="p-0">
                                    <Image
                                        src={item.src}
                                        alt={item.alt}
                                        width={600}
                                        height={400}
                                        data-ai-hint={item.hint}
                                        className="aspect-video object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="books">
                    <div className="space-y-4">
                        {books.map((book, index) => (
                            <Card key={index}>
                                <CardContent className="p-4 flex items-center gap-4">
                                    <FileText className="h-8 w-8 text-primary"/>
                                    <div>
                                        <p className="font-semibold">{book.title}</p>
                                        <p className="text-sm text-muted-foreground">{book.author}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="saved">
                     <div className="space-y-4">
                        {savedChats.map((chat, index) => (
                            <Card key={index}>
                                <CardContent className="p-4 flex items-center gap-4">
                                    <MessageSquareQuote className="h-8 w-8 text-accent"/>
                                    <div>
                                        <p className="font-semibold">{chat.title}</p>
                                        <p className="text-sm text-muted-foreground">{chat.from}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </ScrollArea>
        </Tabs>
    );
}
