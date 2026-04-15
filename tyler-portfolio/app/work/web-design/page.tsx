import type { Metadata } from "next";

import { site } from "@/data/site";
import { getProjectsByCategory, partitionWebDesignProjects } from "@/lib/projects";

import { ProjectRow } from "@/components/ui/ProjectRow";
import { ScrollRevealGrid } from "@/components/effects/ScrollRevealGrid";

import styles from "@/styles/work-page.module.css";

export const metadata: Metadata = {
  title: "Web Design",
};

export default function WebDesignPage() {
  const items = getProjectsByCategory("web-design");
  const { scope, client } = partitionWebDesignProjects(items);

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
      <ScrollRevealGrid className="flex flex-col">
        {scope.length > 0 ? (
          <section
            className={styles.section}
            aria-labelledby="web-design-scope-heading"
          >
            <h2 id="web-design-scope-heading" className={styles.subheading}>
              Scope Work
            </h2>
            <div className="flex flex-col gap-6">
              {scope.map((p) => (
                <ProjectRow key={p.slug} project={p} />
              ))}
            </div>
          </section>
        ) : null}
        {client.length > 0 ? (
          <section
            className={styles.section}
            aria-labelledby="web-design-client-heading"
          >
            <h2 id="web-design-client-heading" className={styles.subheading}>
              Client Work
            </h2>
            <div className="flex flex-col gap-6">
              {client.map((p) => (
                <ProjectRow key={p.slug} project={p} />
              ))}
            </div>
          </section>
        ) : null}
      </ScrollRevealGrid>
    </div>
  );
}
