"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

import loaderStyles from "@/styles/preloader-loader.module.css";

const STORAGE_KEY = "tyler-portfolio-preloader";

export function Preloader() {
  const [show, setShow] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const done = sessionStorage.getItem(STORAGE_KEY);
    if (done === "1") return;
    const id = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!show || !rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem(STORAGE_KEY, "1");
        },
      });

      tl.to(rootRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.out",
        delay: 2.4,
        onComplete: () => {
          setShow(false);
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [show]);

  if (!show) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--bg-primary)] text-[var(--text-primary)]"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className={loaderStyles.loader} aria-hidden />
      <span className="label-sm mt-8 tracking-[0.15em] text-[var(--text-muted)]">
        TYLER VEA
      </span>
    </div>
  );
}
