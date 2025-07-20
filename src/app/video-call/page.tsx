import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, Video, ScreenShare, PhoneOff } from "lucide-react";
import Link from "next/link";

export default function VideoCallPage() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-background text-foreground">
      <div className="absolute top-4 right-4">
        <Button asChild variant="destructive" className="gap-2">
            <Link href="/chats">
                <PhoneOff className="h-4 w-4" />
                End Call
            </Link>
        </Button>
      </div>

      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative mb-4">
            <Image
                src="https://placehold.co/300x300.png"
                alt="Agent Avatar"
                data-ai-hint="friendly robot"
                width={300}
                height={300}
                className="rounded-full border-4 border-primary object-cover shadow-2xl animate-pulse"
            />
             <div className="absolute -bottom-4 left-1/2 w-max -translate-x-1/2 flex items-center gap-2 rounded-full bg-card/80 px-4 py-2 text-lg backdrop-blur-sm border">
                <span className="text-2xl">🤖</span>
                <p>Ooo bhai mast lag rahe ho!</p>
            </div>
        </div>
        <h2 className="text-4xl font-bold tracking-tighter">Friend Agent</h2>
        <p className="text-muted-foreground">Connecting...</p>
      </div>

      <Card className="absolute bottom-24 right-4 h-48 w-36 overflow-hidden border-2 border-primary draggable-card shadow-lg">
        <Image
          src="https://placehold.co/144x192.png"
          alt="User camera"
          data-ai-hint="man selfie"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute bottom-1 left-1 bg-black/50 px-2 py-0.5 rounded text-xs">You</div>
      </Card>
      
      <div className="absolute bottom-6 flex items-center justify-center gap-4 rounded-full bg-card/80 p-3 backdrop-blur-sm border">
        <Button variant="secondary" size="icon" className="h-14 w-14 rounded-full">
          <Mic className="h-7 w-7" />
        </Button>
        <Button variant="secondary" size="icon" className="h-14 w-14 rounded-full">
          <Video className="h-7 w-7" />
        </Button>
        <Button variant="secondary" size="icon" className="h-14 w-14 rounded-full">
          <ScreenShare className="h-7 w-7" />
        </Button>
      </div>
    </div>
  );
}
