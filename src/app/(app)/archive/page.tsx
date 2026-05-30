import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArchiveX } from "lucide-react";
import { Suspense } from "react";

export default function ArchivePage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
            <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)]">
                <ArchiveX className="h-16 w-16 mb-4 text-primary" />
                <h2 className="text-2xl font-bold text-foreground mb-2">Archive</h2>
                <p className="mb-6">This feature has been replaced with the new payment system.</p>
                <Button asChild>
                    <Link href="/payments">
                        Go to Payments
                    </Link>
                </Button>
            </div>
        </Suspense>
    )
}
