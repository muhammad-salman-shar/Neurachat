
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
import { MessageSquare, Phone, Delete, UserPlus, X } from "lucide-react";

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
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      // Focus the input when the dialog opens
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const handleKeyPress = (key: string) => {
    setNumber((prev) => prev + key);
  };

  const handleBackspace = () => {
    setNumber((prev) => prev.slice(0, -1));
  };
  
  const handleClear = () => {
    setNumber("");
  }

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

  const handleDialogChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
        setNumber("");
    }
  }

  const handleZeroPressStart = () => {
    longPressTimer.current = setTimeout(() => {
      setNumber(prev => prev + '+');
      longPressTimer.current = null;
    }, 500);
  };

  const handleZeroPressEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
      handleKeyPress('0');
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex flex-col p-4 top-auto bottom-0 translate-x-[-50%] translate-y-0 rounded-b-none sm:rounded-b-lg data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom">
        <DialogHeader className="text-center">
            <DialogTitle>Dialer</DialogTitle>
        </DialogHeader>
        <DialogClose asChild>
          <Button variant="ghost" size="icon" className="absolute top-3 right-3">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogClose>
        <div className="flex-grow flex flex-col justify-end">
            <div className="p-4 text-center">
                <Input
                    ref={inputRef}
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="text-3xl font-light text-center border-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent shrink-0"
                    placeholder="Enter number"
                />
            </div>
            
            <div className="grid grid-cols-3 gap-2 px-4">
                {keypadButtons.map((key) => {
                  const props = key === '0' ? {
                    onMouseDown: handleZeroPressStart,
                    onMouseUp: handleZeroPressEnd,
                    onTouchStart: handleZeroPressStart,
                    onTouchEnd: handleZeroPressEnd,
                  } : {
                    onClick: () => handleKeyPress(key)
                  };
                  return (
                    <Button
                      key={key}
                      variant="ghost"
                      className="h-20 text-3xl font-light rounded-full relative"
                      {...props}
                    >
                      {key}
                      {key === '0' && <span className="absolute bottom-5 text-xs font-semibold">+</span>}
                    </Button>
                  );
                })}
            </div>

             <div className="flex justify-around items-center p-4">
                <Button variant="ghost" className="h-20 w-20 rounded-full" onClick={handleMessage} disabled={!number}>
                    <MessageSquare className="h-7 w-7" />
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
                    onLongPress={handleClear}
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
