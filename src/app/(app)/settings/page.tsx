
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { User, Cpu, DatabaseZap, ShieldCheck, Wand, Info, BellRing, CalendarIcon } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

const settingsOptions = [
    { id: "account", icon: User, title: "Account", description: "Profile pic, name, status", action: "button", actionText: "Edit Profile" },
    { id: "agents", icon: Cpu, title: "Agents", description: "Add new agents, personality settings", action: "button", actionText: "Manage Agents" },
    { id: "cloud-sync", icon: DatabaseZap, title: "Memory & Cloud", description: "Storage use, clean/delete option", action: "switch" },
    { id: "privacy", icon: ShieldCheck, title: "Privacy", description: "Data encryption, manual delete", action: "button", actionText: "View Options" },
    { id: "smart-notifications", icon: BellRing, title: "Smart Notifications", description: "Enable or disable smart notifications", action: "switch" },
    { id: "dark-mode", icon: Wand, title: "Theme", description: "Light/Dark mode, color customizations", action: "switch" },
    { id: "about", icon: Info, title: "About", description: "Version 1.0.0, check for updates", action: "none" },
];

function EditProfileDialog() {
    const [name, setName] = useState("Sam");
    const [year, setYear] = useState<string>("1998");
    const { toast } = useToast();

    const handleSave = () => {
        toast({
            title: "Profile Updated",
            description: "Your new details have been saved.",
        });
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1920 + 1 }, (_, i) => currentYear - i);

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Name
                    </Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dob" className="text-right">
                        Birth Year
                    </Label>
                    <Select onValueChange={setYear} defaultValue={year}>
                        <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select a year" />
                        </SelectTrigger>
                        <SelectContent>
                            {years.map((y) => (
                                <SelectItem key={y} value={y.toString()}>
                                    {y}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <DialogFooter>
                <Button type="submit" onClick={handleSave}>Save changes</Button>
            </DialogFooter>
        </DialogContent>
    )
}


export default function SettingsPage() {
    return (
        <Card className="border-border/60">
            <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Manage your NeuraSaMu experience.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="divide-y divide-border/60">
                    {settingsOptions.map((option) => (
                        <div key={option.id} className="py-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <option.icon className="h-6 w-6 text-primary" />
                                <div>
                                    <h3 className="font-semibold">{option.title}</h3>
                                    <p className="text-sm text-muted-foreground">{option.description}</p>
                                </div>
                            </div>
                            <div>
                                {option.id === 'account' ? (
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline">{option.actionText}</Button>
                                        </DialogTrigger>
                                        <EditProfileDialog />
                                    </Dialog>
                                ) : option.action === 'button' ? (
                                    <Button variant="outline">{option.actionText}</Button>
                                ) : option.action === 'switch' ? (
                                    <Switch id={option.id} defaultChecked={option.id === 'smart-notifications'} />
                                ) : null}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
