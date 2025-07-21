import BottomNav from "@/components/bottom-nav";
import Header from "@/components/header";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="min-h-screen w-full flex flex-col bg-background">
        <Header />
        <main className="flex-1 overflow-y-auto pb-20">
          <div className="p-4">
            {children}
          </div>
        </main>
        <BottomNav />
      </div>
  );
}
