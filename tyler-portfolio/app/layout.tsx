import type { Metadata } from "next";
import { Geist_Mono, Raleway, Roboto } from "next/font/google";

import { NoiseOverlay } from "@/components/effects/NoiseOverlay";
import { Preloader } from "@/components/effects/Preloader";
import { PortfolioShell } from "@/components/layout/PortfolioShell";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

import "./globals.css";

const raleway = Raleway({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const roboto = Roboto({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
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
      suppressHydrationWarning
      className={`${raleway.variable} ${roboto.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="h-full overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]"
      >
        <ThemeProvider>
          <a href="#main-content" className="sr-only">
            Skip to content
          </a>
          <Preloader />
          <SmoothCursor />
          <NoiseOverlay />
          <PortfolioShell>{children}</PortfolioShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
