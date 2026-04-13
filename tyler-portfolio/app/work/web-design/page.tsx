import type { Metadata } from "next";

import { site } from "@/data/site";
import { getProjectsByCategory } from "@/lib/projects";

import { ProjectRow } from "@/components/ui/ProjectRow";
import { ScrollRevealGrid } from "@/components/effects/ScrollRevealGrid";

import styles from "@/styles/work-page.module.css";

export const metadata: Metadata = {
  title: "Web Design",
};

export default function WebDesignPage() {
  const items = getProjectsByCategory("web-design");

  return (
    <div>
      <header className={styles.header}>
        <h1 className="display-lg text-[var(--text-primary)]">Web Design</h1>
      </header>
      <aside className={styles.banner} role="note">
        {site.webDesignDisclaimer.map((line) => (
          <p key={line} className="body-sm text-[var(--text-muted)]">
            {line}
          </p>
        ))}
      </aside>
      <ScrollRevealGrid className="flex flex-col gap-6">
        {items.map((p) => (
          <ProjectRow key={p.slug} project={p} />
        ))}
      </ScrollRevealGrid>
    </div>
  );
}
