import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Script from "next/script";

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
    icon: "/images/goldlogo.png",
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
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
          .goog-te-banner-frame.skiptranslate,
          iframe.skiptranslate,
          .VIpgJd-ZVi9od-ORHb-OEVmcd,
          .skiptranslate > iframe {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
          }
          body {
            top: 0px !important;
            margin-top: 0px !important;
            padding-top: 0px !important;
          }
        `}} />
        <script type="text/javascript" dangerouslySetInnerHTML={{
          __html: `
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,de,it,zh-CN,ja,fr,ru',
                autoDisplay: false
              }, 'google_translate_element');
            }
          `
        }} />
      </head>
      <body className="relative min-h-full bg-[#111416] font-sans text-white" suppressHydrationWarning>
        <div id="google_translate_element" style={{ display: 'none' }}></div>
        <ReduxProvider>
          <AuthProvider>
            <Navbar />
            <SmoothScroll>
              {children}
            </SmoothScroll>
            <Footer />
          </AuthProvider>
        </ReduxProvider>
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <Script
          id="register-sw"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('Media Cache SW registered with scope: ', registration.scope);
                    },
                    function(err) {
                      console.log('Media Cache SW registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}

