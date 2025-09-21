
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDownLeft, Banknote, FileText, Landmark, Plus, QrCode, ScanLine, Send, ShieldCheck, Fingerprint, Minus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AddPaymentAccountWithOTP from "@/components/add-payment-account-with-otp";


const transactions = [
    { name: "Friend Agent", type: "Sent", amount: "- PKR 500", status: "Success", time: "2:30 PM", avatar: "https://placehold.co/40x40.png" },
    { name: "Easypaisa Top-up", type: "Added", amount: "+ PKR 2,000", status: "Success", time: "11:00 AM", avatar: "https://placehold.co/40x40.png" },
    { name: "Boss Agent", type: "Received", amount: "+ PKR 1,200", status: "Pending", time: "Yesterday", avatar: "https://placehold.co/40x40.png" },
];

const JazzCashIcon = () => <svg className="h-6 w-6" viewBox="0 0 24 24"><path fill="#E41E26" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path fill="#fff" d="M12 12.28c.55 0 1-.45 1-1V8.5c0-.55-.45-1-1-1s-1 .45-1 1V11.28c0 .55.45 1 1 1zm-1.03-3.71l.71-.71c.39-.39 1.02-.39 1.41 0l.71.71c.39.39.39 1.02 0 1.41l-.71.71c-.39.39-1.02.39-1.41 0l-.71-.71c-.39-.39-.39-1.02 0-1.41zm2.06 5.43H11v-1.5h2.03c.55 0 1 .45 1 1s-.45 1-1 1z"/></svg>;
const EasypaisaIcon = () => <svg className="h-6 w-6" viewBox="0 0 24 24"><path fill="#00B14F" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path fill="#fff" d="M15.5 12.5h-1.87l-1.63-3.26-1.63 3.26H8.5l3-6 3 6z"/></svg>;
const PaypalIcon = () => <svg className="h-6 w-6" viewBox="0 0 24 24"><path fill="#003087" d="M20.57 6.09c-.27-.64-1.16-1.09-2.1-1.09H8.54c-.9 0-1.65.41-1.95 1.25L4 16.59c-.24.69.21 1.41.93 1.41h3.19c.6 0 1.12-.42 1.26-1.01l.01-.06.71-3.65c.12-.62.63-1.02 1.24-1.02h2.2c1.33 0 2.22-.92 2.38-2.29l.17-1.89zm-4.48 3.65c-.17 1.07-.97 1.83-1.98 1.83h-1.89c-.58 0-1.08-.38-1.2-.93l-.8-4.23c-.1-.53.28-1.04.8-1.04h2.2c.86 0 1.5.6 1.63 1.45l.24 1.92z"/></svg>;

export type Account = {
    provider: 'JazzCash' | 'Easypaisa' | 'PayPal' | 'Bank';
    identifier: string;
};

export default function PaymentsPage() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
    const [isAddAccountOpen, setIsAddAccountOpen] = useState(false);

    const handleAccountAdded = (account: Account) => {
        const newAccounts = [...accounts, account];
        setAccounts(newAccounts);
        if (!selectedAccount) {
            setSelectedAccount(account.identifier);
        }
        setIsAddAccountOpen(false); // Close the dialog after adding
    };
    
    if (accounts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] text-center text-muted-foreground p-4">
                <Banknote className="h-16 w-16 mb-4 text-primary" />
                <h2 className="text-2xl font-bold text-foreground mb-2">No payment account added yet.</h2>
                <Dialog open={isAddAccountOpen} onOpenChange={setIsAddAccountOpen}>
                    <DialogTrigger asChild>
                        <Button className="mt-6">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Payment Account
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <AddPaymentAccountWithOTP onAccountAdded={handleAccountAdded} onComplete={() => setIsAddAccountOpen(false)} />
                    </DialogContent>
                </Dialog>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center px-1">
                <Select value={selectedAccount || ''} onValueChange={setSelectedAccount}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Account" />
                    </SelectTrigger>
                    <SelectContent>
                        {accounts.map(acc => (
                            <SelectItem key={acc.identifier} value={acc.identifier}>{acc.provider} - {acc.identifier}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                 <Dialog open={isAddAccountOpen} onOpenChange={setIsAddAccountOpen}>
                    <DialogTrigger asChild>
                         <Button variant="ghost" size="icon">
                            <Plus className="h-5 w-5" />
                         </Button>
                    </DialogTrigger>
                    <DialogContent>
                       <AddPaymentAccountWithOTP onAccountAdded={handleAccountAdded} onComplete={() => setIsAddAccountOpen(false)} />
                    </DialogContent>
                </Dialog>
            </div>
            
            {/* Wallet Summary */}
            <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg">
                <CardHeader>
                    <CardTitle>My Wallet</CardTitle>
                    <CardDescription className="text-primary-foreground/80">Your current balance</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold">PKR 12,500.00</p>
                    <div className="flex gap-4 mt-6">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="secondary" className="flex-1 gap-2"><Plus/>Add Money</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add Money</DialogTitle>
                                    <DialogDescription>Select amount and payment method.</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <Label htmlFor="amount">Amount (PKR)</Label>
                                    <Input id="amount" placeholder="e.g., 1000" type="number" />
                                    <p className="font-semibold">Payment Method</p>
                                    <div className="space-y-2">
                                        <Button variant="outline" className="w-full justify-start gap-3"><JazzCashIcon /> JazzCash</Button>
                                        <Button variant="outline" className="w-full justify-start gap-3"><EasypaisaIcon/> Easypaisa</Button>
                                        <Button variant="outline" className="w-full justify-start gap-3"><Landmark/> Bank Transfer</Button>
                                        <Button variant="outline" className="w-full justify-start gap-3"><PaypalIcon/> PayPal</Button>
                                    </div>
                                </div>
                                <DialogClose asChild><Button className="w-full mt-2">Proceed</Button></DialogClose>
                            </DialogContent>
                        </Dialog>
                         <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="flex-1 gap-2 bg-primary/20 border-primary-foreground/50 hover:bg-primary/30"><Minus/>Withdraw</Button>
                            </DialogTrigger>
                             <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Withdraw Funds</DialogTitle>
                                    <DialogDescription>Select amount and destination account.</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <Label htmlFor="withdraw-amount">Amount (PKR)</Label>
                                    <Input id="withdraw-amount" placeholder="e.g., 500" type="number" />
                                     <p className="font-semibold">Destination</p>
                                     <div className="space-y-2">
                                        <Button variant="outline" className="w-full justify-start gap-3"><JazzCashIcon /> JazzCash</Button>
                                        <Button variant="outline" className="w-full justify-start gap-3"><EasypaisaIcon/> Easypaisa</Button>
                                        <Button variant="outline" className="w-full justify-start gap-3"><Landmark/> Bank Account</Button>
                                    </div>
                                </div>
                                 <DialogClose asChild><Button className="w-full mt-2">Withdraw</Button></DialogClose>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-4 gap-4 text-center">
                {[
                    { label: "Send", icon: Send },
                    { label: "Request", icon: ArrowDownLeft },
                    { label: "Scan QR", icon: ScanLine },
                    { label: "My QR", icon: QrCode }
                ].map(action => (
                    <div key={action.label} className="flex flex-col items-center gap-2">
                        <Button size="icon" variant="outline" className="h-14 w-14 rounded-full shadow-sm">
                            <action.icon className="h-6 w-6" />
                        </Button>
                        <span className="text-xs font-medium text-muted-foreground">{action.label}</span>
                    </div>
                ))}
            </div>

             {/* Split a Bill */}
            <Card>
                <CardContent className="p-4 flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold">Got a shared expense?</h3>
                        <p className="text-sm text-muted-foreground">Easily split a bill with your friends.</p>
                    </div>
                    <Button variant="secondary" size="sm" className="gap-2"><FileText/>Split a Bill</Button>
                </CardContent>
            </Card>

            {/* Transactions List */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {transactions.map((tx, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <Avatar className="bg-muted">
                                    <AvatarImage src={tx.avatar} data-ai-hint="person face" />
                                    <AvatarFallback>{tx.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-grow">
                                    <p className="font-semibold">{tx.name}</p>
                                    <p className="text-sm text-muted-foreground">{tx.time}</p>
                                </div>
                                <div className="text-right">
                                    <p className={`font-bold ${tx.amount.startsWith('+') ? 'text-green-500' : 'text-foreground'}`}>{tx.amount}</p>
                                    <p className={`text-xs ${tx.status === 'Pending' ? 'text-amber-500' : 'text-muted-foreground'}`}>{tx.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button variant="link" className="w-full mt-4">View All</Button>
                </CardContent>
            </Card>

            {/* Security Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>Keep your account safe</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                            <Label htmlFor="pin" className="font-semibold cursor-pointer">Set/Change PIN</Label>
                        </div>
                        <Button variant="ghost" size="sm">Manage</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                           <Fingerprint className="h-5 w-5 text-muted-foreground" />
                           <Label htmlFor="biometric" className="font-semibold cursor-pointer">Enable Biometric Unlock</Label>
                        </div>
                        <label htmlFor="biometric-switch" className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" id="biometric-switch" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                        </label>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
