"use client";

import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const prevPath = useRef(pathname);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prevPath.current !== pathname) {
      prevPath.current = pathname;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
      );
    }, el);

    return () => ctx.revert();
  }, [pathname]);

  return (
    <div ref={ref} className="min-h-[50vh]">
      {children}
    </div>
  );
}
