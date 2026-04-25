"use client";

import { getFeaturedProjects } from "@/lib/projects";

import { ProjectCard } from "@/components/ui/ProjectCard";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Marquee } from "@/components/ui/marquee";

import gridStyles from "@/styles/featured-grid.module.css";

const tools = ["Figma", "After Effects", "Illustrator", "Photoshop", "Framer", "Next.js"];

export function FeaturedGrid() {
  const featured = getFeaturedProjects();

  return (
    <section
      id="featured-work"
      className={gridStyles.section}
      aria-labelledby="featured-heading"
    >
      <div className={gridStyles.stats}>
        <p className="label-sm leading-snug text-[var(--text-muted)]">
          Selected work
        </p>
        <div className={gridStyles.statsRow}>
          <div className="font-heading text-xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-2xl">
            <NumberTicker value={7} delay={0.15} />+ years of practice
          </div>
          <div className="font-heading text-xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-2xl sm:text-right">
            <NumberTicker value={75} delay={0.22} />+ clients and teams
          </div>
        </div>
      </div>
      <div className="mb-6 overflow-hidden rounded-sm border border-[var(--border-line)] bg-[var(--bg-secondary)] py-1.5">
        <Marquee pauseOnHover className="[--duration:40s]">
          {tools.map((t) => (
            <span
              key={t}
              className="mx-4 text-xs font-medium text-[var(--text-muted)]"
            >
              {t}
            </span>
          ))}
        </Marquee>
      </div>
      <h2
        id="featured-heading"
        className="font-heading mb-6 text-2xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-3xl"
      >
        Featured work
      </h2>
      <div className={gridStyles.grid}>
        {featured.map((p) => (
          <div key={p.slug} className={gridStyles.gridItem}>
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
