"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

type HeroProps = {
  imageSrc: string;
};

export default function Hero({ imageSrc }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="top" className="relative min-h-[100dvh] overflow-hidden">
      <Image
        src={imageSrc}
        alt="Curated luxury landscape design in DFW"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(44,44,42,0.62),rgba(44,44,42,0.35),rgba(250,247,242,0.24))]" />

      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-7xl items-center px-4 py-28 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, staggerChildren: 0.14 }}
          className="max-w-2xl"
        >
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl leading-none tracking-tight text-white md:text-7xl"
          >
            Your Land. Our Craft.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/90 md:text-lg"
          >
            Premium landscaping design and maintenance for DFW homes and
            properties.
          </motion.p>
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#portfolio"
              className="rounded-full border border-white/80 px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:translate-y-[-1px] active:scale-[0.98]"
            >
              See Our Work
            </a>
            <a
              href="#contact"
              className="rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:translate-y-[-1px] active:scale-[0.98]"
            >
              Get a Free Quote
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
