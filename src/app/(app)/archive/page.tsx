import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArchiveX } from "lucide-react";

export default function ArchivePage() {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] text-center text-muted-foreground p-4">
            <ArchiveX className="h-16 w-16 mb-4 text-primary" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Archive Not Found</h2>
            <p className="mb-6">This feature has been replaced with the new Payments section.</p>
            <Button asChild>
                <Link href="/payments">
                    Go to Payments
                </Link>
            </Button>
        </div>
    )
}
