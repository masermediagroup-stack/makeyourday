import type { Metadata } from "next";
import Link from "next/link";

import styles from "@/styles/brand-overview.module.css";

export const metadata: Metadata = {
  title: "Brand Design",
};

const links = [
  { href: "/work/brand-design/logos", label: "Logos", desc: "Logo marks and wordmarks." },
  {
    href: "/work/brand-design/brand-identities",
    label: "Brand Identities",
    desc: "Full systems, motion, and guidelines.",
  },
  {
    href: "/work/brand-design/social-media",
    label: "Social Media",
    desc: "Campaign and platform-native graphics.",
  },
] as const;

export default function BrandDesignOverviewPage() {
  return (
    <div>
      <header className={styles.header}>
        <h1 className="display-lg text-[var(--text-primary)]">Brand Design</h1>
        <p className="body-lg mt-6 max-w-2xl text-[var(--text-secondary)]">
          Explore logo work, full identities, and social campaigns — organized for quick browsing.
        </p>
      </header>
      <ul className={styles.list}>
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className={styles.card}>
              <span className="display-md text-[var(--text-primary)]">{l.label}</span>
              <span className="body-md text-[var(--text-muted)]">{l.desc}</span>
              <span className="label-sm text-[var(--portfolio-accent)]">Open →</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
