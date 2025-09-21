
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { User, DatabaseZap, ShieldCheck, Info, BellRing, CalendarIcon, Mic, Video, LogIn, Mail, KeyRound, Phone, UserPlus, ArrowLeft, Camera, FolderOpen, Lock, Star, Calendar as CalendarIconLucide } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const settingsOptions = [
    { id: "account", icon: User, title: "Account", description: "Profile pic, name, status", action: "dialog", dialog: "editProfile" },
    { id: "login-signup", icon: LogIn, title: "Login & Sign Up", description: "Create an account or sign in", action: "dialog", dialog: "login" },
    { id: "permissions", icon: Lock, title: "Permissions", description: "Manage app permissions", action: "dialog", dialog: "permissions" },
    { id: "make-default", icon: Star, title: "Make Default", description: "Set NeuraChat as your default app", action: "toast" },
    { id: "cloud-sync", icon: DatabaseZap, title: "Memory & Cloud", description: "Storage use, clean/delete option", action: "switch" },
    { id: "privacy", icon: ShieldCheck, title: "Privacy", description: "Data encryption, manual delete", action: "dialog", dialog: "privacy" },
    { id: "smart-notifications", icon: BellRing, title: "Smart Notifications", description: "Enable or disable smart notifications", action: "switch" },
    { id: "reminders", icon: CalendarIcon, title: "Reminders", description: "View and manage your reminders", href: "/reminders", action: "link" },
    { id: "about", icon: Info, title: "About", description: "Version 68.7.526, check for updates", action: "none" },
];

function EditProfileDialog() {
    const [name, setName] = useState("Sam");
    const [username, setUsername] = useState("NeuraKing");
    const [bio, setBio] = useState("Your friendly AI companion!");
    const [dob, setDob] = useState<Date | undefined>(new Date("1998-01-01"));
    const [showActivity, setShowActivity] = useState(true);
    const { toast } = useToast();

    const handleSave = () => {
        toast({
            title: "Profile Updated",
            description: "Your new details have been saved.",
        });
    };

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                 <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <img src="https://placehold.co/100x100.png" alt="Profile" className="rounded-full w-24 h-24" data-ai-hint="person face" />
                        <Button size="icon" className="absolute bottom-0 right-0 rounded-full h-8 w-8">
                            <Camera className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="@yourhandle" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="bio">Bio/Status</Label>
                    <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} maxLength={150} placeholder="Tell us about yourself" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                     <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "justify-start text-left font-normal",
                                    !dob && "text-muted-foreground"
                                )}
                            >
                                <CalendarIconLucide className="mr-2 h-4 w-4" />
                                {dob ? format(dob, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={dob}
                                onSelect={setDob}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                 <div className="flex items-center justify-between pt-2">
                    <Label htmlFor="activity-status">Show Activity Status</Label>
                    <Switch id="activity-status" checked={showActivity} onCheckedChange={setShowActivity} />
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
                       <Mail className="h-5 w-5 text-muted-foreground" />
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
                <DialogTitle>Join NeuraChat</DialogTitle>
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

function PermissionsDialog() {
    const { toast } = useToast();
    const [permissions, setPermissions] = useState({
        microphone: false,
        camera: false,
        storage: false,
    });
    const [storagePath, setStoragePath] = useState<string | null>(null);

    const handlePermissionChange = (permission: keyof typeof permissions) => {
        setPermissions(prev => ({ ...prev, [permission]: !prev[permission] }));
    };

    const handleSelectStoragePath = async () => {
        if ('showDirectoryPicker' in window) {
            try {
                const handle = await (window as any).showDirectoryPicker();
                // For demonstration, we'll just log the handle.
                // In a real app, you would store this handle in IndexedDB to persist access.
                console.log(handle);
                setStoragePath(handle.name);
                toast({
                    title: "Storage Path Selected",
                    description: `Selected folder: ${handle.name}`,
                });
            } catch (error) {
                console.error("Error selecting directory:", error);
                toast({
                    variant: "destructive",
                    title: "Permission Denied",
                    description: "Could not access the selected directory.",
                });
            }
        } else {
            alert("Your browser does not support the File System Access API.");
        }
    };
    
    return (
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>App Permissions</DialogTitle>
                <DialogDescription>
                    Manage permissions for different app features.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                       <Mic className="h-5 w-5 text-muted-foreground" />
                       <Label htmlFor="mic-permission" className="font-semibold cursor-pointer">Microphone Access</Label>
                    </div>
                    <Switch id="mic-permission" checked={permissions.microphone} onCheckedChange={() => handlePermissionChange('microphone')} />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                   <div className="flex items-center gap-3">
                       <Camera className="h-5 w-5 text-muted-foreground" />
                       <Label htmlFor="camera-permission" className="font-semibold cursor-pointer">Camera Access</Label>
                    </div>
                    <Switch id="camera-permission" checked={permissions.camera} onCheckedChange={() => handlePermissionChange('camera')} />
                </div>
                 <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                        <FolderOpen className="h-5 w-5 text-muted-foreground" />
                        <Label htmlFor="storage-permission" className="font-semibold cursor-pointer">Media & Storage</Label>
                    </div>
                    <Switch id="storage-permission" checked={permissions.storage} onCheckedChange={() => handlePermissionChange('storage')} />
                </div>
                {permissions.storage && (
                    <div className="pl-4 pt-2">
                        <Button variant="outline" onClick={handleSelectStoragePath}>
                            <FolderOpen className="mr-2 h-4 w-4" />
                            Change Storage Path
                        </Button>
                        {storagePath && <p className="text-sm text-muted-foreground mt-2">Current path: {storagePath}</p>}
                    </div>
                )}
            </div>
             <DialogFooter>
                <DialogClose asChild>
                    <Button>Done</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    )
}

function DialogManager({ option }: { option: (typeof settingsOptions)[number] }) {
    if (option.action !== 'dialog' || !option.dialog) return null;

    let content = null;
    switch(option.dialog) {
        case 'editProfile':
            content = <EditProfileDialog />;
            break;
        case 'privacy':
            content = <PrivacySettingsDialog />;
            break;
        case 'login':
            content = <LoginSignupDialog />;
            break;
        case 'permissions':
            content = <PermissionsDialog />;
            break;
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    {option.id === 'account' ? 'Edit Profile' : 'Manage'}
                </Button>
            </DialogTrigger>
            {content}
        </Dialog>
    )
}


export default function SettingsPage() {
    const { toast } = useToast();

    const handleToastAction = (optionId: string) => {
        if (optionId === 'make-default') {
            toast({
                title: "Web App Limitation",
                description: "Browsers do not allow web apps to be set as the default for system functions like messaging or calls.",
            });
        }
    };

    return (
        <Card className="border-border/60">
            <CardHeader>
                <CardTitle>NeuraChat</CardTitle>
                <CardDescription>Manage your NeuraChat experience.</CardDescription>
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
                                {option.action === 'dialog' ? (
                                    <DialogManager option={option} />
                                ) : option.action === 'switch' ? (
                                    <Switch id={option.id} defaultChecked={option.id === 'smart-notifications' || option.id === 'cloud-sync'} />
                                ) : option.action === 'toast' ? (
                                    <Button variant="outline" onClick={() => handleToastAction(option.id)}>
                                        Set Default
                                    </Button>
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
