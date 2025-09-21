
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function SplashScreen() {
  const [isMounted, setIsMounted] = useState(false);
  const [show, setShow] = useState(true);
  const [animationClass, setAnimationClass] = useState("animate-splash-in");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    const splashShown = sessionStorage.getItem("splashScreenShown");
    if (splashShown) {
      setShow(false);
      return;
    }

    const timer = setTimeout(() => {
      setAnimationClass("animate-splash-out");
      const hideTimer = setTimeout(() => {
        setShow(false);
        sessionStorage.setItem("splashScreenShown", "true");
      }, 200); // match animation duration
      return () => clearTimeout(hideTimer);
    }, 200); // 0.2s visible, 0.2s fade out

    return () => clearTimeout(timer);
  }, [isMounted]);

  if (!show || !isMounted) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-background",
        animationClass
      )}
    >
      <h1 className="text-5xl font-bold text-primary tracking-wider font-headline">
        NeuraChat
      </h1>
    </div>
  );
}
