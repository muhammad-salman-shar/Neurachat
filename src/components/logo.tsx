import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/chats" className="flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7 text-primary"
      >
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
        <path d="M8 14s1.5-2 4-2 4 2 4 2" />
        <path d="M9 9h.01" />
        <path d="M15 9h.01" />
      </svg>
      <h1 className="text-xl font-bold text-foreground">NeuraSaMu</h1>
    </Link>
  );
}
