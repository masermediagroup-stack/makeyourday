import type { Metadata } from "next";

import { site } from "@/data/site";
import { logos } from "@/data/projects";

import { ScrollRevealGrid } from "@/components/effects/ScrollRevealGrid";
import { LogoGrid } from "@/components/ui/LogoGrid";

import styles from "@/styles/subpage.module.css";

export const metadata: Metadata = {
  title: "Logos",
};

export default function LogosPage() {
  return (
    <div>
      <header className={styles.header}>
        <h1 className="display-lg text-[var(--text-primary)]">Logos</h1>
        <p className="body-lg mt-6 max-w-3xl text-[var(--text-secondary)]">
          {site.logosIntro}
        </p>
      </header>
      <ScrollRevealGrid>
        <LogoGrid items={logos} />
      </ScrollRevealGrid>
    </div>
  );
}
