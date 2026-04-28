import Link from "next/link";

import { site } from "@/data/site";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";

import styles from "@/styles/home-hero.module.css";

const capabilities = [
  { label: "Websites", href: "/work/web-design" },
  { label: "Brand identity", href: "/work/brand-design/brand-identities" },
  { label: "UI/UX", href: "/work/ui-ux" },
  { label: "Thumbnails", href: "/work/thumbnail" },
];

export function HomeHero() {
  return (
    <section className={styles.hero} aria-labelledby="home-hero-heading">
      <div className={styles.copy}>
        <h1 id="home-hero-heading" className={styles.heading}>
          <AnimatedGradientText
            speed={2}
            colorFrom="#a78bfa"
            colorTo="#6d28d9"
            className="inline"
          >
            Brand systems and websites built to launch.
          </AnimatedGradientText>
        </h1>
        <p className={styles.body}>{site.mediumBio}</p>
        <div className={styles.actions} aria-label="Primary actions">
          <Link href="#featured-work" className={styles.primaryCta}>
            View selected work
          </Link>
          <Link href="/contact" className={styles.secondaryCta}>
            Start a project
          </Link>
        </div>
      </div>

      <div className={styles.capabilityRow} aria-label="Capabilities">
        {capabilities.map((item) => (
          <Link key={item.label} href={item.href} className={styles.capabilityPill}>
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
