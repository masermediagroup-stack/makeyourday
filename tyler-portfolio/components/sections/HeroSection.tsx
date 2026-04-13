import Link from "next/link";

import { site } from "@/data/site";

import { BlurFade } from "@/components/ui/blur-fade";
import { DotPattern } from "@/components/ui/dot-pattern";

import styles from "@/styles/hero.module.css";

export function HeroSection() {
  return (
    <section className={styles.section} aria-labelledby="hero-heading">
      <div className={styles.pattern} aria-hidden>
        <DotPattern
          className="mask-[radial-gradient(ellipse_at_center,white,transparent_70%)] opacity-40"
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
        />
      </div>
      <h1 id="hero-heading" className={styles.title}>
        <span className="display-xl text-[var(--text-primary)]">TYLER</span>
        <span className="display-xl block text-[var(--portfolio-accent)]">VEA</span>
      </h1>
      <BlurFade delay={0.12} inView>
        <p className={`body-lg ${styles.subtitle}`}>{site.heroTagline}</p>
      </BlurFade>
      <div className={styles.accentRule} aria-hidden />
      <div className={styles.lines}>
        {site.heroLines.map((line) => (
          <BlurFade key={line} delay={0.08} inView>
            <p className={`body-md ${styles.line} text-[var(--text-muted)]`}>{line}</p>
          </BlurFade>
        ))}
      </div>
      <div className={styles.ctaRow}>
        <BlurFade delay={0.2} inView>
          <Link href="/work/web-design" className={styles.primaryCta}>
            View work
          </Link>
        </BlurFade>
        <BlurFade delay={0.28} inView>
          <Link href={`mailto:${site.email}`} className={styles.ghost}>
            GET IN TOUCH
          </Link>
        </BlurFade>
      </div>
    </section>
  );
}
