import type { Metadata } from "next";

import { site } from "@/data/site";
import { getProjectsByCategory } from "@/lib/projects";

import { ScrollRevealGrid } from "@/components/effects/ScrollRevealGrid";
import { BrandIdentityCard } from "@/components/ui/BrandIdentityCard";

import styles from "@/styles/ui-ux-page.module.css";
import sub from "@/styles/subpage.module.css";

export const metadata: Metadata = {
  title: "Brand Identities",
};

export default function BrandIdentitiesPage() {
  const items = getProjectsByCategory("brand-identities");

  return (
    <div>
      <header className={sub.header}>
        <h1 className="display-lg text-[var(--text-primary)]">Brand Identities</h1>
        <p className="body-lg mt-6 max-w-2xl text-[var(--text-secondary)]">
          {site.brandIdentitiesIntro}
        </p>
      </header>
      <ScrollRevealGrid className={styles.grid}>
        {items.map((p) => (
          <BrandIdentityCard key={p.slug} project={p} />
        ))}
      </ScrollRevealGrid>
    </div>
  );
}
