"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SiteMotion() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-reveal]",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: "[data-page-root]",
            start: "top 85%",
          },
        }
      );

      gsap.utils.toArray<HTMLElement>("[data-scale-fade]").forEach((item) => {
        gsap.fromTo(
          item,
          { scale: 0.88, opacity: 0.55 },
          {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top 98%",
              end: "bottom 45%",
              scrub: true,
            },
          }
        );
      });

      const processTitle = document.querySelector("[data-process-title]");
      const processTrack = document.querySelector("[data-process-track]");
      if (processTitle && processTrack) {
        ScrollTrigger.create({
          trigger: processTrack,
          start: "top 24%",
          end: "bottom 72%",
          pin: processTitle,
          pinSpacing: false,
        });
      }

      gsap.to("[data-marquee-track]", {
        xPercent: -50,
        duration: 24,
        ease: "none",
        repeat: -1,
      });
    });

    return () => context.revert();
  }, []);

  return null;
}
