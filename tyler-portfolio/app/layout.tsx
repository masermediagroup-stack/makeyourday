import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { Geist_Mono } from "next/font/google";

import { NoiseOverlay } from "@/components/effects/NoiseOverlay";
import { Preloader } from "@/components/effects/Preloader";
import { PortfolioShell } from "@/components/layout/PortfolioShell";
import { ThemeProvider } from "@/components/providers/theme-provider";

import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Tyler Vea — Creative Technologist & Brand Strategist",
    template: "%s · Tyler Vea",
  },
  description:
    "Designer from Central Texas building brands, websites, and visual identities for startups and creators.",
  icons: {
    icon: "/images/logo-star.svg",
  },
  openGraph: {
    title: "Tyler Vea — Creative Technologist & Brand Strategist",
    description:
      "Designer from Central Texas building brands, websites, and visual identities for startups and creators.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <ThemeProvider>
          <a href="#main-content" className="sr-only">
            Skip to content
          </a>
          <Preloader />
          <NoiseOverlay />
          <PortfolioShell>{children}</PortfolioShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
