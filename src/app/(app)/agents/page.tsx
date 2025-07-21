import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Heart, BrainCircuit, Briefcase, Handshake, ShieldCheck, Dumbbell, Zap, TrendingUp } from "lucide-react";
import Link from "next/link";

const agents = [
    { name: "Friend Agent", mood: "Chill", icon: <Handshake />, avatar: "https://placehold.co/100x100.png", hint: "friendly person", status: "Online - 'Bhai bored lag raha?'", active: true, emoji: "😁" },
    { name: "Teacher Agent", mood: "Strict", icon: <BrainCircuit />, avatar: "https://placehold.co/100x100.png", hint: "teacher woman", status: "Next Quiz - 'Kal revise kiya?'", active: true, emoji: "📝" },
    { name: "Boss Agent", mood: "Professional", icon: <Briefcase />, avatar: "https://placehold.co/100x100.png", hint: "business man", status: "Focus on your goals!", active: false, emoji: "💼" },
    { name: "Girlfriend Agent", mood: "Caring", icon: <Heart />, avatar: "https://placehold.co/100x100.png", hint: "happy woman", status: "How was your day?", active: true, emoji: "🥰" },
    { name: "Religious Guide", mood: "Wise", icon: <ShieldCheck />, avatar: "https://placehold.co/100x100.png", hint: "wise person", status: "Peace be upon you.", active: false, emoji: "🙏" },
    { name: "Gym Coach", mood: "Energetic", icon: <Dumbbell />, avatar: "https://placehold.co/100x100.png", hint: "fit person", status: "Let's get pumping!", active: true, emoji: "💪" },
    { name: "Comedian Agent", mood: "Sarcastic", icon: <Zap />, avatar: "https://placehold.co/100x100.png", hint: "laughing person", status: "Ready for a joke?", active: true, emoji: "😂" },
    { name: "Business Mentor", mood: "Serious", icon: <TrendingUp />, avatar: "https://placehold.co/100x100.png", hint: "mentor professional", status: "Let's talk strategy.", active: false, emoji: "📈" },
];

export default function AgentsPage() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {agents.map((agent) => (
                <Link href={`/chat-detail?agent=${encodeURIComponent(agent.name)}&emoji=${encodeURIComponent(agent.emoji)}`} key={agent.name} className="block hover:no-underline">
                    <Card className="flex flex-col border-border/60 hover:border-primary/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 h-full">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <Avatar className="h-16 w-16 text-4xl text-primary">
                                <AvatarImage src={agent.avatar} data-ai-hint={agent.hint} />
                                <AvatarFallback className="bg-primary/10">{agent.icon}</AvatarFallback>
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
                </Link>
            ))}
        </div>
    );
}
