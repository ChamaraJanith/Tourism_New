"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { AuthGuard } from "@/components/AuthGuard";
import { NotificationProvider } from "@/context/NotificationContext";
import { AdminHeader } from "@/components/AdminHeader";
import { RealtimeToast } from "@/components/RealtimeToast";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  if (isLoginPage) {
    // Login page: no sidebar, no auth check needed here (AuthGuard handles redirect away if already logged in)
    return <div className="flex-1 w-full h-full">{children}</div>;
  }

  return (
    <AuthGuard>
      <NotificationProvider>
        <Sidebar />
        <div className="flex-1 h-full flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            {children}
          </main>
        </div>
        <RealtimeToast />
      </NotificationProvider>
    </AuthGuard>
  );
}

