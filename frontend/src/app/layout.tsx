import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
 
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});
 
const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});
 
export const metadata: Metadata = {
  title: "Tourism",
  description:
    "Private itineraries, boutique stays, and seamless logistics for discerning travelers.",
  icons: {
    icon: "/images/Title.png",
  },
};
 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning
      lang="en"
      className={`${outfit.variable} ${playfair.variable} h-full scroll-smooth antialiased relative`}
      data-scroll-behavior="smooth"
    >
      <body className="relative min-h-full bg-[#111416] font-sans text-white">
        <ReduxProvider>
          <AuthProvider>
            <Navbar />
            <SmoothScroll>
              {children}
              <Footer />
            </SmoothScroll>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
