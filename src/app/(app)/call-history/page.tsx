import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Phone, Video, ArrowUpRight, ArrowDownLeft } from "lucide-react";

const callHistory = [
    { name: "Friend Agent", avatar: "https://placehold.co/100x100.png", type: "outgoing", status: "Outgoing", time: "5 minutes ago", duration: "2m 15s" },
    { name: "Teacher Agent", avatar: "https://placehold.co/100x100.png", type: "incoming", status: "Incoming", time: "1 hour ago", duration: "10m 30s" },
    { name: "Boss Agent", avatar: "https://placehold.co/100x100.png", type: "missed", status: "Missed Call", time: "Yesterday", duration: "" },
    { name: "Girlfriend Agent", avatar: "https://placehold.co/100x100.png", type: "outgoing", status: "Outgoing", time: "Yesterday", duration: "30m 05s" },
    { name: "Gym Coach", avatar: "https://placehold.co/100x100.png", type: "incoming", status: "Incoming", time: "2 days ago", duration: "5m 45s" },
];

const CallStatusIcon = ({ type }: { type: string }) => {
    switch (type) {
        case "outgoing":
            return <ArrowUpRight className="h-4 w-4 text-green-500" />;
        case "incoming":
            return <ArrowDownLeft className="h-4 w-4 text-blue-500" />;
        case "missed":
            return <ArrowDownLeft className="h-4 w-4 text-red-500" />;
        default:
            return null;
    }
};

export default function CallHistoryPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Call History</CardTitle>
                <CardDescription>Review your recent voice and video calls.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {callHistory.map((call, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={call.avatar} data-ai-hint="person face" />
                                <AvatarFallback>{call.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                                <p className="font-semibold">{call.name}</p>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <CallStatusIcon type={call.type} />
                                    <span>{call.status} - {call.time}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {call.duration && <span className="text-sm text-muted-foreground">{call.duration}</span>}
                                <Button variant="ghost" size="icon">
                                    <Phone className="h-5 w-5" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <Video className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
