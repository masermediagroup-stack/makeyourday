"use client";

import { useLenis } from "@/hooks/useLenis";
import { useRef } from "react";

import { ProgressiveBlur } from "@/components/ui/progressive-blur";

import styles from "@/styles/shell.module.css";

/** Extra soft bottom blur stack for subtle depth. */
const progressiveBlurLevels = [0.15, 0.3, 0.5, 0.9, 1.5, 2.5, 4, 6] as const;

/** Aligns with fixed sidebar: full width on mobile, offset on tablet/desktop. */
const mainColumnEdge =
  "left-0 right-0 md:left-[216px] lg:left-[288px]";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLenis(wrapperRef, contentRef);

  return (
    <main className={styles.main} id="main-content" tabIndex={-1}>
      <div ref={wrapperRef} className={styles.scroll}>
        <div className={styles.progressiveBlurGlobal} aria-hidden>
          {/* Subtle blue wash + progressive blur — bottom edge only, main column */}
          <div
            className={`fixed bottom-0 z-[5] h-[min(18vh,180px)] bg-gradient-to-t from-sky-500/[0.05] to-transparent ${mainColumnEdge}`}
          />
          <ProgressiveBlur
            position="bottom"
            height="min(18vh, 180px)"
            blurLevels={[...progressiveBlurLevels]}
            className={`!fixed bottom-0 top-auto z-[6] ${mainColumnEdge} !h-[min(18vh,180px)]`}
          />
        </div>
        <div ref={contentRef} className={styles.inner}>
          {children}
        </div>
      </div>
    </main>
  );
}
