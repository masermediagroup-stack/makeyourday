import Image from "next/image";
import Link from "next/link";

import { site } from "@/data/site";

import styles from "@/styles/home-hero.module.css";

const proofItems = [
  { value: "7+", label: "years building brand systems" },
  { value: "75+", label: "clients and creator teams" },
  { value: "4", label: "disciplines across design and web" },
] as const;

const capabilities = ["Websites", "Brand identity", "UI/UX", "Motion"];

export function HomeHero() {
  return (
    <section className={styles.hero} aria-labelledby="home-hero-heading">
      <div className={styles.copy}>
        <p className={styles.kicker}>{site.name}</p>
        <h1 id="home-hero-heading" className={styles.heading}>
          Brand systems and websites built to launch.
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

      <div className={styles.visualWrap}>
        <Image
          src="/images/hero-visual-2026.png"
          alt="Abstract portfolio hero visual with brand panels, UI layouts, and violet design accents"
          width={1672}
          height={941}
          priority
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 72vw, 760px"
          className={styles.visual}
        />
      </div>

      <div className={styles.proofGrid} aria-label="Portfolio proof points">
        {proofItems.map((item) => (
          <div key={item.label} className={styles.proofItem}>
            <span className={styles.proofValue}>{item.value}</span>
            <span className={styles.proofLabel}>{item.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.capabilityRow} aria-label="Capabilities">
        {capabilities.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  );
}
