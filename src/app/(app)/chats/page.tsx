import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Mic, Paperclip } from "lucide-react";

type Message = {
  id: string;
  sender: "user" | "ai";
  agent?: "Friend" | "Teacher" | "Boss";
  text: string;
  avatar: string;
  name: string;
};

const messages: Message[] = [
  { id: '1', sender: 'user', text: "Hey, what's up?", avatar: "https://placehold.co/40x40.png", name: "You" },
  { id: '2', sender: 'ai', agent: 'Friend', text: "Not much, bro! Just chillin'. Bheju kya ek meme?", avatar: "https://placehold.co/40x40.png", name: "Friend Agent" },
  { id: '3', sender: 'ai', agent: 'Teacher', text: "Remember to review chapter 5 for the quiz tomorrow.", avatar: "https://placehold.co/40x40.png", name: "Teacher Agent" },
  { id: '4', sender: 'user', text: "Ugh, fine. But I need help with a question.", avatar: "https://placehold.co/40x40.png", name: "You" },
  { id: '5', sender: 'ai', agent: 'Boss', text: "Stop procrastinating and get back to your tasks. The deadline is approaching.", avatar: "https://placehold.co/40x40.png", name: "Boss Agent" },
  { id: '6', sender: 'ai', agent: 'Friend', text: "lol, boss agent is so serious. check this out!", avatar: "https://placehold.co/40x40.png", name: "Friend Agent" },
];


const getAgentBubbleClass = (agent?: "Friend" | "Teacher" | "Boss") => {
    switch(agent) {
        case 'Friend': return 'bg-blue-500 text-white';
        case 'Teacher': return 'bg-green-600 text-white';
        case 'Boss': return 'bg-gray-700 text-white';
        default: return 'bg-muted';
    }
}


export default function ChatsPage() {
  return (
    <div className="h-[calc(100vh-12rem)] md:h-[calc(100vh-10rem)] flex flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-4",
                message.sender === "user" && "flex-row-reverse"
              )}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={message.avatar} alt={message.name} data-ai-hint="person face" />
                <AvatarFallback>{message.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className={cn("max-w-xs md:max-w-md lg:max-w-lg space-y-1", message.sender === 'user' && 'text-right')}>
                <p className="text-sm font-semibold">{message.name}</p>
                <div
                  className={cn(
                    "rounded-xl px-4 py-2.5",
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : getAgentBubbleClass(message.agent)
                  )}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="mt-auto border-t bg-card p-4">
        <div className="relative">
          <Input
            placeholder="Write or Speak..."
            className="pr-24 text-base"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <Button variant="ghost" size="icon">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Mic className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
