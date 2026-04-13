import type { Metadata } from "next";

import { site } from "@/data/site";
import { getProjectsByCategory } from "@/lib/projects";

import { ScrollRevealGrid } from "@/components/effects/ScrollRevealGrid";
import { UiUxCard } from "@/components/ui/UiUxCard";

import styles from "@/styles/ui-ux-page.module.css";

export const metadata: Metadata = {
  title: "UI/UX",
};

export default function UiUxPage() {
  const items = getProjectsByCategory("ui-ux");

  return (
    <div>
      <header className={styles.header}>
        <h1 className="display-lg text-[var(--text-primary)]">UI/UX</h1>
        <p className="body-lg mt-6 max-w-2xl text-[var(--text-secondary)]">
          {site.uiUxIntro}
        </p>
      </header>
      <ScrollRevealGrid className={styles.grid}>
        {items.map((p) => (
          <UiUxCard key={p.slug} project={p} />
        ))}
      </ScrollRevealGrid>
    </div>
  );
}
