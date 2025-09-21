
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function SplashScreen() {
  const [isMounted, setIsMounted] = useState(false);
  const [isHiding, setIsHiding] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    if (sessionStorage.getItem("splashScreenShown")) {
      setIsHiding(true);
    } else {
      setIsHiding(false);
      const timer = setTimeout(() => {
        setIsHiding(true);
        sessionStorage.setItem("splashScreenShown", "true");
      }, 200);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isMounted || isHiding) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-background",
        isHiding ? "animate-splash-out" : "animate-splash-in"
      )}
    >
      <h1 className="text-5xl font-bold text-primary tracking-wider font-headline">
        NeuraChat
      </h1>
    </div>
  );
}
