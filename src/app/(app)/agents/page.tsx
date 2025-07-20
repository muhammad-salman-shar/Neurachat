import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Bot, BookOpen, Dumbbell, Briefcase, Heart, Sprout, HandCoins, Drama } from "lucide-react";

const agents = [
    { name: "Friend Agent", mood: "Chill", icon: "😎", avatar: "https://placehold.co/100x100.png", hint: "friendly person", status: "Online - 'Bhai bored lag raha?'", active: true },
    { name: "Teacher Agent", mood: "Strict", icon: "👩‍🏫", avatar: "https://placehold.co/100x100.png", hint: "teacher woman", status: "Next Quiz - 'Kal revise kiya?'", active: true },
    { name: "Boss Agent", mood: "Professional", icon: "💼", avatar: "https://placehold.co/100x100.png", hint: "business man", status: "Focus on your goals!", active: false },
    { name: "Girlfriend Agent", mood: "Caring", icon: "😍", avatar: "https://placehold.co/100x100.png", hint: "happy woman", status: "How was your day?", active: true },
    { name: "Religious Guide", mood: "Wise", icon: "🕌", avatar: "https://placehold.co/100x100.png", hint: "wise person", status: "Peace be upon you.", active: false },
    { name: "Gym Coach", mood: "Energetic", icon: "💪", avatar: "https://placehold.co/100x100.png", hint: "fit person", status: "Let's get pumping!", active: true },
    { name: "Comedian Agent", mood: "Sarcastic", icon: "😂", avatar: "https://placehold.co/100x100.png", hint: "laughing person", status: "Ready for a joke?", active: true },
    { name: "Business Mentor", mood: "Serious", icon: "📈", avatar: "https://placehold.co/100x100.png", hint: "mentor professional", status: "Let's talk strategy.", active: false },
];

export default function AgentsPage() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {agents.map((agent) => (
                <Card key={agent.name} className="flex flex-col">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Avatar className="h-16 w-16 text-4xl">
                            <AvatarImage src={agent.avatar} data-ai-hint={agent.hint} />
                            <AvatarFallback>{agent.icon}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle>{agent.name}</CardTitle>
                            <CardDescription>
                                <Badge variant="outline">{agent.mood}</Badge>
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground">{agent.status}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                        <span className="text-sm font-medium">Status</span>
                        <Switch defaultChecked={agent.active} aria-label={`Activate ${agent.name}`} />
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
