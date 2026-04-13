"use client";

import { site } from "@/data/site";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import styles from "@/styles/sidebar.module.css";

const workLinks = [
  { href: "/work/web-design", label: "Web Design" },
  { href: "/work/ui-ux", label: "UI/UX" },
] as const;

const brandSubLinks = [
  { href: "/work/brand-design/logos", label: "Logos" },
  { href: "/work/brand-design/brand-identities", label: "Brand Identities" },
  { href: "/work/brand-design/social-media", label: "Social Media" },
] as const;

function BrandDesignNav({
  pathname,
  isActive,
}: {
  pathname: string;
  isActive: (href: string) => boolean;
}) {
  const onBrandPath = brandSubLinks.some((l) => pathname.startsWith(l.href));
  const [brandOpen, setBrandOpen] = useState(onBrandPath);

  return (
    <li>
      <button
        type="button"
        className={styles.brandRow}
        onClick={() => setBrandOpen((o) => !o)}
        aria-expanded={brandOpen}
      >
        <span className="body-md flex-1 text-left">Brand Design</span>
        <span
          className={`${styles.arrow} ${brandOpen ? styles.arrowOpen : ""}`}
          aria-hidden
        >
          ▸
        </span>
      </button>
      <ul className={`${styles.subList} ${brandOpen ? styles.subListOpen : ""}`}>
        {brandSubLinks.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className={`${styles.subLink} ${isActive(l.href) ? styles.subLinkActive : ""}`}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside className={styles.aside}>
      <div className={styles.block}>
        <Link href="/" aria-label="Home">
          <Image
            src="/images/logo-mark.svg"
            alt=""
            width={44}
            height={44}
            priority
            className="h-11 w-auto"
          />
        </Link>

        <div>
          <p className={styles.name}>{site.name}</p>
          <p className={`body-sm ${styles.mutedSecondary}`}>{site.titleLine}</p>
          <p className={`body-sm ${styles.mutedSecondary}`}>{site.subtitleLine}</p>
        </div>

        <p className={`body-sm ${styles.bio}`}>{site.shortBio}</p>

        <nav aria-label="Primary">
          <p className={`label-sm ${styles.navMuted} ${styles.navHeader}`}>
            {site.navSectionWork}
          </p>
          <ul className={styles.navList}>
            {workLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`body-md ${styles.navLink} ${isActive(l.href) ? styles.navLinkActive : ""}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <BrandDesignNav key={pathname} pathname={pathname} isActive={isActive} />
            <li>
              <Link
                href="/work/thumbnail"
                className={`body-md ${styles.navLink} ${isActive("/work/thumbnail") ? styles.navLinkActive : ""}`}
              >
                Thumbnail
              </Link>
            </li>
          </ul>
        </nav>

        <hr className={styles.divider} />

        <div className="flex flex-col gap-2">
          <a className={`body-sm ${styles.contactLink}`} href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <a
            className={`body-sm ${styles.contactLink}`}
            href={site.twitterUrl}
            target="_blank"
            rel="noreferrer"
          >
            {site.twitterLabel}
          </a>
          <a
            className={`body-sm ${styles.contactLink}`}
            href={site.linkedInUrl}
            target="_blank"
            rel="noreferrer"
          >
            {site.linkedInLabel}
          </a>
        </div>

        <div className={styles.badge}>
          <span className={styles.dot} aria-hidden />
          <span className={`label-sm ${styles.navMuted}`}>{site.availability}</span>
        </div>
      </div>
    </aside>
  );
}
