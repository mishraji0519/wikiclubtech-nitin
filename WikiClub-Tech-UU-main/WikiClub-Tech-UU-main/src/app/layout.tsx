import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WikiClub Tech",
  description: "The official website of the WikiClub Tech community.",
  icons: {
    icon: "/logo.svg",
  },
  manifest: "/manifest.json",
};

// Keep the site on a desktop-width layout even when opened on a phone.
// This makes the desktop composition the single presentation instead of
// switching to a mobile-responsive layout.
export const viewport: Viewport = {
  width: 1280,
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-w-[1280px]`}>
        <Toaster />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-gray-900">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
