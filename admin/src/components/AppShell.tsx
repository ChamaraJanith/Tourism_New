"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { AuthGuard } from "@/components/AuthGuard";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  if (isLoginPage) {
    // Login page: no sidebar, no auth check needed here (AuthGuard handles redirect away if already logged in)
    return <div className="flex-1 w-full h-full">{children}</div>;
  }


  return (
    <AuthGuard>
      <Sidebar />
      <main className="flex-1 h-full overflow-y-auto p-6 md:p-8">
        {children}
      </main>
    </AuthGuard>
  );
}
