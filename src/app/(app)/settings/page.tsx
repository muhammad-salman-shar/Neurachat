
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { User, DatabaseZap, ShieldCheck, Wand, Info, BellRing, CalendarIcon, Mic, MessageSquare, Video, LogIn, Mail, KeyRound, Phone, UserPlus, ArrowLeft } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

const settingsOptions = [
    { id: "account", icon: User, title: "Account", description: "Profile pic, name, status", action: "button", actionText: "Edit Profile" },
    { id: "login-signup", icon: LogIn, title: "Login & Sign Up", description: "Create an account or sign in", action: "dialog" },
    { id: "cloud-sync", icon: DatabaseZap, title: "Memory & Cloud", description: "Storage use, clean/delete option", action: "switch" },
    { id: "privacy", icon: ShieldCheck, title: "Privacy", description: "Data encryption, manual delete", action: "button", actionText: "View Options" },
    { id: "smart-notifications", icon: BellRing, title: "Smart Notifications", description: "Enable or disable smart notifications", action: "switch" },
    { id: "reminders", icon: CalendarIcon, title: "Reminders", description: "View and manage your reminders", href: "/reminders", action: "link" },
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
                 <DialogClose asChild>
                    <Button type="submit" onClick={handleSave}>Save changes</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    )
}

function PrivacySettingsDialog() {
    const [textTraining, setTextTraining] = useState(true);
    const [videoTraining, setVideoTraining] = useState(false);
    const [voiceTraining, setVoiceTraining] = useState(false);
    const { toast } = useToast();

    const handleSave = () => {
        toast({
            title: "Privacy Settings Updated",
            description: "Your choices have been saved.",
        });
    };

    return (
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Privacy Settings</DialogTitle>
                <DialogDescription>
                    Manage how your data is used to improve our AI models. Your privacy is important to us.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                       <MessageSquare className="h-5 w-5 text-muted-foreground" />
                       <Label htmlFor="text-training" className="font-semibold cursor-pointer">Model Text Training</Label>
                    </div>
                    <Switch id="text-training" checked={textTraining} onCheckedChange={setTextTraining} />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                   <div className="flex items-center gap-3">
                       <Video className="h-5 w-5 text-muted-foreground" />
                       <Label htmlFor="video-training" className="font-semibold cursor-pointer">Model Video Training</Label>
                    </div>
                    <Switch id="video-training" checked={videoTraining} onCheckedChange={setVideoTraining} />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                        <Mic className="h-5 w-5 text-muted-foreground" />
                        <Label htmlFor="voice-training" className="font-semibold cursor-pointer">Voice Call Model Training</Label>
                    </div>
                    <Switch id="voice-training" checked={voiceTraining} onCheckedChange={setVoiceTraining} />
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button onClick={handleSave}>Save</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    );
}

const GoogleIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.222 0-9.618-3.67-11.283-8.591l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path>
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.021 35.591 44 30.134 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
    </svg>
);

function LoginSignupDialog() {
    type AuthStep = 'initial' | 'login' | 'signup' | 'login-userpass';
    const [step, setStep] = useState<AuthStep>('initial');

    const renderInitial = () => (
        <>
            <DialogHeader>
                <DialogTitle>Join NeuraSaMu</DialogTitle>
                <DialogDescription>
                    Create an account or sign in to sync your data across devices.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <Button onClick={() => setStep('signup')}><UserPlus className="mr-2"/> New User</Button>
                <Button variant="secondary" onClick={() => setStep('login')}>Already have an account</Button>
            </div>
        </>
    );

    const renderSignup = () => (
        <>
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setStep('initial')}><ArrowLeft/></Button>
                    Create Account
                </DialogTitle>
                <DialogDescription>Choose a method to sign up.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <Button variant="outline"><Mail className="mr-2"/>Sign up with Email</Button>
                <Button variant="outline"><GoogleIcon/>Sign up with Google</Button>
                <Button variant="outline"><Phone className="mr-2"/>Sign up with Phone Number</Button>
            </div>
        </>
    );
    
    const renderLogin = () => (
        <>
            <DialogHeader>
                 <DialogTitle className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setStep('initial')}><ArrowLeft/></Button>
                    Log In
                </DialogTitle>
                <DialogDescription>Welcome back! Sign in to continue.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <Button variant="outline" onClick={() => setStep('login-userpass')}><KeyRound className="mr-2"/>Login with Username</Button>
                <Button variant="outline"><GoogleIcon/>Login with Google</Button>
            </div>
        </>
    );

    const renderLoginUserPass = () => (
         <>
            <DialogHeader>
                 <DialogTitle className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setStep('login')}><ArrowLeft/></Button>
                    Welcome Back
                </DialogTitle>
                <DialogDescription>Enter your credentials to access your account.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                 <div className="grid gap-2">
                    <Label htmlFor="email">Email or Username</Label>
                    <Input id="email" type="email" placeholder="sam@example.com" required />
                </div>
                 <div className="grid gap-2">
                     <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
                    </div>
                    <Input id="password" type="password" required />
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button className="w-full">Log In</Button>
                </DialogClose>
            </DialogFooter>
        </>
    );

    const renderStep = () => {
        switch (step) {
            case 'signup': return renderSignup();
            case 'login': return renderLogin();
            case 'login-userpass': return renderLoginUserPass();
            case 'initial':
            default:
                return renderInitial();
        }
    }

    return (
        <DialogContent className="sm:max-w-md">
            {renderStep()}
        </DialogContent>
    );
}


export default function SettingsPage() {
    return (
        <Card className="border-border/60">
            <CardHeader>
                <CardTitle>NeuraSaMu</CardTitle>
                <CardDescription>Manage your NeuraSaMu experience.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="divide-y divide-border/60 -mx-6">
                    {settingsOptions.map((option) => {
                       const content = (
                         <div className="py-4 flex items-center justify-between px-6">
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
                                ) : option.id === 'privacy' ? (
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline">{option.actionText}</Button>
                                        </DialogTrigger>
                                        <PrivacySettingsDialog />
                                    </Dialog>
                                ) : option.id === 'login-signup' ? (
                                     <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline">Manage</Button>
                                        </DialogTrigger>
                                        <LoginSignupDialog />
                                    </Dialog>
                                ) : option.action === 'button' ? (
                                    <Button variant="outline">{option.actionText}</Button>
                                ) : option.action === 'switch' ? (
                                    <Switch id={option.id} defaultChecked={option.id === 'smart-notifications' || option.id === 'cloud-sync'} />
                                ) : null}
                            </div>
                         </div>
                       );

                       if (option.action === 'link' && option.href) {
                         return (
                           <Link href={option.href} key={option.id} className="block hover:bg-card/50">
                               {content}
                           </Link>
                         )
                       }

                       return (
                         <div key={option.id}>
                           {content}
                         </div>
                       )
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
