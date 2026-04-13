"use client";

import { MobileNav } from "@/components/layout/MobileNav";
import { Sidebar } from "@/components/layout/Sidebar";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { PageTransition } from "@/components/effects/PageTransition";

import styles from "@/styles/shell.module.css";

export function PortfolioShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.shell}>
      <MobileNav />
      <Sidebar />
      <SmoothScroll>
        <PageTransition>{children}</PageTransition>
      </SmoothScroll>
    </div>
  );
}
