import type { Metadata } from "next";
import { DM_Mono, DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollReset } from "@/components/motion/ScrollReset";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
});

export const metadata: Metadata = {
  title: "Caddo Offices | DFW Coworking and Private Offices",
  description:
    "Private offices and coworking for 1800+ small businesses across 10 DFW locations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white">
        <SmoothScrollProvider>
          <ScrollReset />
          <div className="grain-overlay" />
          <AnnouncementBar />
          <Navbar />
          <main className="pt-20">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
