import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { User, Bot, Cloud, Lock, Palette, Info } from "lucide-react";

const settingsOptions = [
    { icon: User, title: "Account", description: "Profile pic, name, status", action: "button", actionText: "Edit Profile" },
    { icon: Bot, title: "Agents", description: "Add new agents, personality settings", action: "button", actionText: "Manage Agents" },
    { icon: Cloud, title: "Memory & Cloud", description: "Storage use, clean/delete option", action: "switch", id: "cloud-sync" },
    { icon: Lock, title: "Privacy", description: "Data encryption, manual delete", action: "button", actionText: "View Options" },
    { icon: Palette, title: "Theme", description: "Light/Dark mode, color customizations", action: "switch", id: "dark-mode" },
    { icon: Info, title: "About", description: "Version 1.0.0, check for updates", action: "none" },
];

export default function SettingsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Manage your NeuraSaMu experience.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="divide-y divide-border">
                    {settingsOptions.map((option, index) => (
                        <div key={index} className="py-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <option.icon className="h-6 w-6 text-muted-foreground" />
                                <div>
                                    <h3 className="font-semibold">{option.title}</h3>
                                    <p className="text-sm text-muted-foreground">{option.description}</p>
                                </div>
                            </div>
                            <div>
                                {option.action === 'button' && <Button variant="outline">{option.actionText}</Button>}
                                {option.action === 'switch' && <Switch id={option.id} />}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
