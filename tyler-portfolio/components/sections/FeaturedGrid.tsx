"use client";

import { site } from "@/data/site";
import { getFeaturedProjects } from "@/lib/projects";

import { ProjectCard } from "@/components/ui/ProjectCard";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Marquee } from "@/components/ui/marquee";

import gridStyles from "@/styles/featured-grid.module.css";

const tools = ["Figma", "After Effects", "Illustrator", "Photoshop", "Framer", "Next.js"];

export function FeaturedGrid() {
  const featured = getFeaturedProjects();

  return (
    <section className={gridStyles.section} aria-labelledby="featured-heading">
      <div className={gridStyles.stats}>
        <p className="label-sm text-[var(--text-muted)]">
          {`${site.name} - ${site.heroTagline}`}
        </p>
        <div className={gridStyles.statsRow}>
          <div className="display-md text-[var(--text-primary)]">
            <NumberTicker value={7} delay={0.15} />+ years
          </div>
          <div className="display-md text-[var(--text-primary)] sm:text-right">
            <NumberTicker value={75} delay={0.22} />+ clients satisfied
          </div>
        </div>
      </div>
      <div className="mb-12 overflow-hidden rounded-sm border border-[var(--border-line)] bg-[var(--bg-secondary)] py-3">
        <Marquee pauseOnHover className="[--duration:40s]">
          {tools.map((t) => (
            <span
              key={t}
              className="mx-6 text-sm font-medium text-[var(--text-muted)]"
            >
              {t}
            </span>
          ))}
        </Marquee>
      </div>
      <h2 id="featured-heading" className="display-md mb-10 text-[var(--text-primary)]">
        Featured work
      </h2>
      <div className={gridStyles.grid}>
        {featured.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}
