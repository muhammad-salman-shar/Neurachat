import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { BellRing, Snooze, Trash2 } from "lucide-react";

const notifications = [
    { agent: "Teacher Agent", message: "Reminder: Quiz in 15 minutes!", avatar: "https://placehold.co/40x40.png", type: "reminder" },
    { agent: "Friend Agent", message: "Bhai lag raha mood kharab hai, meme bheju?", avatar: "https://placehold.co/40x40.png", type: "alert" },
    { agent: "Boss Agent", message: "You have a missed call regarding the project deadline.", avatar: "https://placehold.co/40x40.png", type: "missed_call" },
    { agent: "Gym Coach", message: "Time for your evening workout session!", avatar: "https://placehold.co/40x40.png", type: "reminder" },
];

export default function NotificationsPage() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Smart Notifications</CardTitle>
                    <CardDescription>Your personal alert center.</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch id="smart-mode" defaultChecked/>
                    <Label htmlFor="smart-mode">Smart Mode</Label>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {notifications.map((notification, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                            <Avatar>
                                <AvatarImage src={notification.avatar} data-ai-hint="person face" />
                                <AvatarFallback>{notification.agent.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                                <p className="font-semibold">{notification.agent}</p>
                                <p className="text-sm text-muted-foreground">{notification.message}</p>
                            </div>
                            <div className="flex gap-1">
                               <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Snooze className="h-4 w-4" />
                                    <span className="sr-only">Snooze</span>
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Trash2 className="h-4 w-4" />
                                     <span className="sr-only">Dismiss</span>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
