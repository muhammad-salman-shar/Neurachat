
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Phone, UserPlus, X, Delete } from "lucide-react";

type DialerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
};

export default function DialerDialog({ open, onOpenChange, children }: DialerDialogProps) {
  const [number, setNumber] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setNumber(""); // Reset number when dialog closes
    }
  }, [open]);

  const handleCall = () => {
    if (number) {
      window.location.href = `tel:${number}`;
      onOpenChange(false);
    }
  };

  const handleMessage = () => {
    if (number) {
      router.push(`/chat-detail?agent=${encodeURIComponent(number)}&isNew=true&phone=${encodeURIComponent(number)}&emoji=👤`);
      onOpenChange(false);
    }
  };
  
   const handleAddContact = () => {
    if (number) {
      router.push(`/create-contact?phone=${encodeURIComponent(number)}`);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex flex-col p-4 top-auto bottom-0 translate-x-[-50%] translate-y-0 rounded-b-none sm:rounded-b-lg data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom">
        <DialogHeader className="text-center sr-only">
            <DialogTitle>Dialer</DialogTitle>
        </DialogHeader>
        <DialogClose asChild>
          <Button variant="ghost" size="icon" className="absolute top-3 right-3">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogClose>
        <div className="flex-grow flex flex-col justify-between">
            <div className="p-4 text-center">
                <Input
                    ref={inputRef}
                    type="tel"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="text-3xl font-light text-center border-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent shrink-0"
                    placeholder="Enter number"
                />
            </div>
            
            <div className="flex justify-around items-center p-4">
                <Button variant="ghost" className="h-20 w-20 rounded-full flex-col gap-1" onClick={handleMessage} disabled={!number}>
                    <MessageSquare className="h-6 w-6" />
                    <span className="text-xs">Message</span>
                </Button>
                <Button
                    variant="default"
                    className="h-20 w-20 rounded-full bg-green-500 hover:bg-green-600"
                    onClick={handleCall}
                    disabled={!number}
                >
                    <Phone className="h-8 w-8" />
                </Button>
                 <Button variant="ghost" className="h-20 w-20 rounded-full flex-col gap-1" onClick={handleAddContact} disabled={!number}>
                    <UserPlus className="h-6 w-6" />
                    <span className="text-xs">Add Contact</span>
                </Button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
