
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Phone, Video, ArrowUpRight, ArrowDownLeft, Trash2, X, Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const initialCallHistory = [
    { name: "Friend Agent", avatar: "https://placehold.co/100x100.png", type: "outgoing", status: "Outgoing", time: "5 minutes ago", duration: "2m 15s", phone: "+11234567890" },
    { name: "Teacher Agent", avatar: "https://placehold.co/100x100.png", type: "incoming", status: "Incoming", time: "1 hour ago", duration: "10m 30s", phone: "+12345678901" },
    { name: "Boss Agent", avatar: "https://placehold.co/100x100.png", type: "missed", status: "Missed Call", time: "Yesterday", duration: "", phone: "+13456789012" },
    { name: "Girlfriend Agent", avatar: "https://placehold.co/100x100.png", type: "outgoing", status: "Outgoing", time: "Yesterday", duration: "30m 05s", phone: "+14567890123" },
    { name: "Gym Coach", avatar: "https://placehold.co/100x100.png", type: "incoming", status: "Incoming", time: "2 days ago", duration: "5m 45s", phone: "+15678901234" },
];

type CallType = "all" | "incoming" | "outgoing" | "missed";

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
    const [calls, setCalls] = useState(initialCallHistory);
    const [selectedCalls, setSelectedCalls] = useState<Set<number>>(new Set());
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState<CallType>("all");
    
    const inSelectionMode = selectedCalls.size > 0;

    const toggleSelection = (index: number) => {
        setSelectedCalls(prev => {
            const newSelection = new Set(prev);
            if (newSelection.has(index)) {
                newSelection.delete(index);
            } else {
                newSelection.add(index);
            }
            return newSelection;
        });
    };

    const handleCallClick = (e: React.MouseEvent, index: number) => {
        if (inSelectionMode) {
            e.preventDefault();
            toggleSelection(index);
        } else {
            console.log("Viewing call details for index:", index);
        }
    };

    const handleDeleteSelected = () => {
        setCalls(calls.filter((_, index) => !selectedCalls.has(index)));
        setSelectedCalls(new Set());
    };

    const handleClearAll = () => {
        setCalls([]);
        setSelectedCalls(new Set());
    };
    
    const handleMakeCall = (phoneNumber: string) => {
        if (phoneNumber) {
            window.location.href = `tel:${phoneNumber}`;
        }
    };

    const filteredCalls = calls
        .map((call, index) => ({ ...call, originalIndex: index })) // Keep original index
        .filter(call => call.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter(call => filter === 'all' || call.type === filter);

    const SelectionHeader = () => (
        <div className="flex items-center justify-between p-2 bg-card mb-2 rounded-xl sticky top-0 z-10 shadow-sm border">
            <Button variant="ghost" size="icon" onClick={() => setSelectedCalls(new Set())}>
                <X className="h-5 w-5" />
            </Button>
            <span className="font-semibold">{selectedCalls.size} selected</span>
            <div className="flex items-center">
                <Button variant="ghost" size="icon" onClick={handleDeleteSelected} title="Delete Selected">
                    <Trash2 className="h-5 w-5 text-destructive" />
                </Button>
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="ghost" className="text-destructive">Clear All</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will permanently delete your entire call history. This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleClearAll}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle>Call History</CardTitle>
                <CardDescription>Review your recent voice and video calls.</CardDescription>
            </CardHeader>
            <CardContent>
                {inSelectionMode ? (
                    <SelectionHeader />
                ) : (
                    <div className="space-y-4 mb-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                placeholder="Search by name..."
                                className="pl-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2">
                            {(['all', 'incoming', 'outgoing', 'missed'] as CallType[]).map(f => (
                                <Button 
                                    key={f}
                                    variant={filter === f ? "default" : "outline"}
                                    onClick={() => setFilter(f)}
                                    className="capitalize"
                                >
                                    {f}
                                </Button>
                            ))}
                        </div>
                    </div>
                )}
                <div className="space-y-2">
                    {filteredCalls.map((call) => {
                         const isSelected = selectedCalls.has(call.originalIndex);
                         return (
                            <div 
                                key={call.originalIndex} 
                                onClick={(e) => handleCallClick(e, call.originalIndex)}
                                onContextMenu={(e) => { e.preventDefault(); toggleSelection(call.originalIndex); }}
                                className={cn(
                                    "flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer relative",
                                    isSelected && "bg-primary/10"
                                )}
                            >
                                {isSelected && (
                                    <div className="absolute top-2 left-2 h-5 w-5 bg-primary rounded-full flex items-center justify-center">
                                        <Check className="h-4 w-4 text-primary-foreground" />
                                    </div>
                                )}
                                <Avatar className={cn("h-12 w-12", isSelected && "opacity-60")}>
                                    <AvatarImage src={call.avatar} data-ai-hint="person face" />
                                    <AvatarFallback>{call.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className={cn("flex-grow", isSelected && "opacity-60")}>
                                    <p className="font-semibold">{call.name}</p>
                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                        <CallStatusIcon type={call.type} />
                                        <span>{call.status} - {call.time}</span>
                                    </div>
                                </div>
                                <div className={cn("flex items-center gap-2", isSelected && "opacity-60")}>
                                    {call.duration && <span className="text-sm text-muted-foreground">{call.duration}</span>}
                                    <Button variant="ghost" size="icon" disabled={inSelectionMode} onClick={() => handleMakeCall(call.phone)}>
                                        <Phone className="h-5 w-5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" disabled={inSelectionMode} onClick={() => handleMakeCall(call.phone)}>
                                        <Video className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        )
                    })}
                    {calls.length > 0 && filteredCalls.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                            <p>No calls match your search or filter.</p>
                        </div>
                    )}
                    {calls.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                            <p>Your call history is empty.</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
