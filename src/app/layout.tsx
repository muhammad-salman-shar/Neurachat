import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Inter, Poppins } from 'next/font/google'
import SplashScreen from "@/components/splash-screen";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['600', '700']
})


export const metadata: Metadata = {
  title: "NeuraSaMu: Your AI Companion",
  description: "The Ultimate AI Friend App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="light">
      <body className={`${inter.variable} ${poppins.variable} font-body antialiased bg-background`}>
        <SplashScreen />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
