
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function SplashScreen() {
  const [show, setShow] = useState(true);
  const [animationClass, setAnimationClass] = useState("animate-splash-in");

  useEffect(() => {
    const splashShown = sessionStorage.getItem("splashScreenShown");
    if (splashShown) {
      setShow(false);
      return;
    }

    const timer = setTimeout(() => {
      setAnimationClass("animate-splash-out");
      setTimeout(() => {
        setShow(false);
        sessionStorage.setItem("splashScreenShown", "true");
      }, 500); // match animation duration
    }, 1000); // 1s visible, 0.5s fade out

    return () => clearTimeout(timer);
  }, []);

  if (!show) {
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
