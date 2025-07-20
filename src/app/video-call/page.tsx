import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Video, VideoOff, ScreenShare, PhoneOff, Smile } from "lucide-react";
import Link from "next/link";

export default function VideoCallPage() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-slate-900 text-white">
      <div className="absolute top-4 right-4">
        <Link href="/chats">
            <Button variant="destructive" className="gap-2">
                <PhoneOff className="h-4 w-4" />
                End Call
            </Button>
        </Link>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="relative">
            <Image
            src="https://placehold.co/300x300.png"
            alt="Agent Avatar"
            data-ai-hint="friendly robot"
            width={300}
            height={300}
            className="rounded-full border-4 border-blue-400 object-cover shadow-2xl animate-pulse"
            />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-slate-800/80 px-4 py-2 text-lg backdrop-blur-sm">
                <Smile className="h-6 w-6 text-yellow-400" />
                <p>Ooo bhai mast lag rahe ho!</p>
            </div>
        </div>
        <h2 className="text-3xl font-bold">Friend Agent</h2>
      </div>

      <Card className="absolute bottom-24 right-4 h-48 w-36 overflow-hidden border-2 border-primary draggable-card">
        <Image
          src="https://placehold.co/144x192.png"
          alt="User camera"
          data-ai-hint="man selfie"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute bottom-1 left-1 bg-black/50 px-2 py-0.5 rounded text-xs">You</div>
      </Card>
      
      <div className="absolute bottom-6 flex items-center justify-center gap-4 rounded-full bg-slate-800/80 p-3 backdrop-blur-sm">
        <Button variant="ghost" size="icon" className="h-14 w-14 rounded-full bg-white/10 hover:bg-white/20">
          <Mic className="h-7 w-7" />
        </Button>
        <Button variant="ghost" size="icon" className="h-14 w-14 rounded-full bg-white/10 hover:bg-white/20">
          <Video className="h-7 w-7" />
        </Button>
        <Button variant="ghost" size="icon" className="h-14 w-14 rounded-full bg-white/10 hover:bg-white/20">
          <ScreenShare className="h-7 w-7" />
        </Button>
      </div>
    </div>
  );
}
