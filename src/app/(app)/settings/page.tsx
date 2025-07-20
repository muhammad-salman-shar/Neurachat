import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { User, Cpu, DatabaseZap, ShieldCheck, Wand, Info, BellRing } from "lucide-react";

const settingsOptions = [
    { icon: User, title: "Account", description: "Profile pic, name, status", action: "button", actionText: "Edit Profile" },
    { icon: Cpu, title: "Agents", description: "Add new agents, personality settings", action: "button", actionText: "Manage Agents" },
    { icon: DatabaseZap, title: "Memory & Cloud", description: "Storage use, clean/delete option", action: "switch", id: "cloud-sync" },
    { icon: ShieldCheck, title: "Privacy", description: "Data encryption, manual delete", action: "button", actionText: "View Options" },
    { icon: BellRing, title: "Smart Notifications", description: "Enable or disable smart notifications", action: "switch", id: "smart-notifications" },
    { icon: Wand, title: "Theme", description: "Light/Dark mode, color customizations", action: "switch", id: "dark-mode" },
    { icon: Info, title: "About", description: "Version 1.0.0, check for updates", action: "none" },
];

export default function SettingsPage() {
    return (
        <Card className="border-border/60">
            <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Manage your NeuraSaMu experience.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="divide-y divide-border/60">
                    {settingsOptions.map((option, index) => (
                        <div key={index} className="py-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <option.icon className="h-6 w-6 text-primary" />
                                <div>
                                    <h3 className="font-semibold">{option.title}</h3>
                                    <p className="text-sm text-muted-foreground">{option.description}</p>
                                </div>
                            </div>
                            <div>
                                {option.action === 'button' && <Button variant="outline">{option.actionText}</Button>}
                                {option.action === 'switch' && <Switch id={option.id} defaultChecked={option.id === 'smart-notifications'} />}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
