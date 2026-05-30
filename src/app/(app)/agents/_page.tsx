// 1. Sabse upar ye line daal agar nahi hai:
import { Suspense } from "react";

// 2. Apne component ke return ko Suspense se cover kar de:
export default function AgentsPage() {
    return (
        <Suspense fallback={<div className="p-4 text-center">Loading Agents...</div>}>
            {/* TERA PURANA AGENTS WALA CODE IDHAR RAHEGA */}
            <div>
               ... 
            </div>
        </Suspense>
    );
}
