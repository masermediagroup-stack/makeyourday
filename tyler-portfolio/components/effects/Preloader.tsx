"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "tyler-portfolio-preloader";

export function Preloader() {
  const [show, setShow] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const done = sessionStorage.getItem(STORAGE_KEY);
    if (done === "1") return;
    const id = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!show || !rootRef.current || !countRef.current) return;

    const ctx = gsap.context(() => {
      const counter = { value: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem(STORAGE_KEY, "1");
        },
      });

      tl.to(counter, {
        value: 100,
        duration: 2.5,
        ease: "power2.out",
        onUpdate: () => {
          if (countRef.current) {
            countRef.current.textContent = `${Math.round(counter.value)}`;
          }
        },
      }).to(rootRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.out",
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
      <span
        ref={countRef}
        className="font-[family-name:var(--font-syne)] text-[clamp(4rem,15vw,10rem)] font-extrabold leading-none"
      >
        0
      </span>
      <span className="label-sm mt-6 tracking-[0.15em] text-[var(--text-muted)]">
        TYLER VEA
      </span>
    </div>
  );
}
