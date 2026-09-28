import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/AppShell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IHV Admin Dashboard",
  description: "Admin dashboard for IHV Travel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#030712] text-slate-200 antialiased h-screen overflow-hidden flex`}>
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
