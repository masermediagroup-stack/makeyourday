"use client";

import { useLenis } from "@/hooks/useLenis";
import { useRef } from "react";

import styles from "@/styles/shell.module.css";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLenis(wrapperRef, contentRef);

  return (
    <main className={styles.main} id="main-content" tabIndex={-1}>
      <div ref={wrapperRef} className={styles.scroll}>
        <div ref={contentRef} className={styles.inner}>
          {children}
        </div>
      </div>
    </main>
  );
}
