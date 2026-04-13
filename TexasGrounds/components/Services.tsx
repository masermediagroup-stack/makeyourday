"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Droplets, Flower2, Lightbulb, Sprout, Trees } from "lucide-react";

export type Service = {
  title: string;
  description: string;
  icon: "sprout" | "trees" | "droplets" | "flower2" | "lightbulb";
};

type ServicesProps = {
  services: Service[];
};

export default function Services({ services }: ServicesProps) {
  const prefersReducedMotion = useReducedMotion();
  const iconMap = {
    sprout: Sprout,
    trees: Trees,
    droplets: Droplets,
    flower2: Flower2,
    lightbulb: Lightbulb,
  } as const;

  return (
    <section id="services" className="bg-background py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="services-heading"
          className="font-display text-4xl tracking-tight text-textPrimary md:text-5xl"
        >
          What We Do
        </h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.1,
              },
            },
          }}
          className="mt-10 flex flex-col gap-4 md:flex-row md:overflow-x-auto md:pb-2"
        >
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.article
                key={service.title}
                variants={{
                  hidden: {
                    opacity: 0,
                    x: prefersReducedMotion ? 0 : 16,
                  },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
                className="min-w-0 rounded-3xl bg-cream p-6 md:min-w-[240px] md:flex-1"
              >
                <Icon className="h-7 w-7 text-terracotta" strokeWidth={1.75} />
                <h3 className="mt-4 font-display text-2xl text-textPrimary">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-textMuted">
                  {service.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
