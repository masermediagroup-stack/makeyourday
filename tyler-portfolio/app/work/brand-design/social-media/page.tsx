import type { Metadata } from "next";

import { site } from "@/data/site";
import { getProjectsByCategory } from "@/lib/projects";

import { ScrollRevealGrid } from "@/components/effects/ScrollRevealGrid";
import { UiUxCard } from "@/components/ui/UiUxCard";

import styles from "@/styles/ui-ux-page.module.css";
import sub from "@/styles/subpage.module.css";

export const metadata: Metadata = {
  title: "Social Media",
};

export default function SocialMediaPage() {
  const items = getProjectsByCategory("social-media");

  return (
    <div>
      <header className={sub.header}>
        <h1 className="display-lg text-[var(--text-primary)]">Social Media</h1>
        <p className="body-lg mt-6 max-w-2xl text-[var(--text-secondary)]">
          {site.socialMediaIntro}
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
