"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

type Project = {
  name: string;
  location: string;
  imageSrc: string;
};

type PortfolioProps = {
  projects: Project[];
};

export default function Portfolio({ projects }: PortfolioProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="portfolio" className="bg-background py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-4xl tracking-tight text-textPrimary md:text-5xl">
          Recent Projects
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
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.article
              key={project.name}
              variants={{
                hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 18 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              tabIndex={0}
              className="group relative aspect-[4/5] overflow-hidden focus:outline-none"
              aria-label={`${project.name}, ${project.location}`}
            >
              <Image
                src={project.imageSrc}
                alt={`${project.name} landscape project in ${project.location}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(44,44,42,0.72),rgba(44,44,42,0.1))] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100">
                <p className="font-display text-2xl text-white">{project.name}</p>
                <p className="text-sm text-white/85">{project.location}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
