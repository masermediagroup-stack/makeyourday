"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type HeroRevealProps = {
  rootId: string;
};

export function HeroReveal({ rootId }: HeroRevealProps) {
  useEffect(() => {
    const rootElement = document.getElementById(rootId);
    if (!rootElement) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const revealNodes = rootElement.querySelectorAll<HTMLElement>("[data-hero-reveal]");
    const gridNode = rootElement.querySelector<HTMLElement>("[data-hero-grid]");
    const animations: gsap.core.Tween[] = [];

    if (revealNodes.length > 0) {
      animations.push(
        gsap.fromTo(
          revealNodes,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
          }
        )
      );
    }

    if (gridNode) {
      animations.push(
        gsap.to(gridNode, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: rootElement,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })
      );
    }

    return () => {
      animations.forEach((animation) => animation.kill());
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === rootElement) {
          trigger.kill();
        }
      });
    };
  }, [rootId]);

  return <div className="pointer-events-none absolute inset-0" aria-hidden />;
}
