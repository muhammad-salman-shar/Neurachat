
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Phone, Delete } from "lucide-react";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";


type DialerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
};

const keypadButtons = [
  "1", "2", "3",
  "4", "5", "6",
  "7", "8", "9",
  "*", "0", "#",
];

export default function DialerDialog({ open, onOpenChange, children }: DialerDialogProps) {
  const [number, setNumber] = useState("");
  const router = useRouter();

  const handleKeyPress = (key: string) => {
    setNumber((prev) => prev + key);
  };

  const handleBackspace = () => {
    setNumber((prev) => prev.slice(0, -1));
  };

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
  
  const handleDialogChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
        setNumber("");
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex flex-col p-4 top-auto bottom-0 translate-x-[-50%] translate-y-0 rounded-b-none sm:rounded-b-lg data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom">
        <DialogHeader>
           <VisuallyHidden>
            <DialogTitle>Dialer</DialogTitle>
          </VisuallyHidden>
        </DialogHeader>
        <div className="flex-grow flex flex-col justify-end">
            <div className="p-4 text-center">
                <Input
                    readOnly
                    value={number}
                    className="text-3xl font-light text-center border-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Enter number"
                />
            </div>
             <div className="px-4 pb-4 text-center">
                 <Button
                    variant="secondary"
                    className="w-full h-12"
                    onClick={handleMessage}
                    disabled={!number}
                >
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Send Message
                </Button>
            </div>

            <div className="grid grid-cols-3 gap-2">
                {keypadButtons.map((key) => (
                    <Button
                        key={key}
                        variant="ghost"
                        className="h-20 text-3xl font-light rounded-full"
                        onClick={() => handleKeyPress(key)}
                    >
                        {key}
                    </Button>
                ))}
            </div>

             <div className="flex justify-around items-center p-4">
                <Button variant="ghost" className="h-20 w-20 rounded-full invisible">
                    {/* Placeholder for alignment */}
                </Button>
                <Button
                    variant="default"
                    className="h-20 w-20 rounded-full bg-green-500 hover:bg-green-600"
                    onClick={handleCall}
                    disabled={!number}
                >
                    <Phone className="h-8 w-8" />
                </Button>
                <Button
                    variant="ghost"
                    className="h-20 w-20 rounded-full"
                    onClick={handleBackspace}
                    disabled={!number}
                >
                    <Delete className="h-8 w-8" />
                </Button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
