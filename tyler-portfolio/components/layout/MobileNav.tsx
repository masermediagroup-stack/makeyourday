"use client";

import { site } from "@/data/site";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import styles from "@/styles/mobile-nav.module.css";
import sidebarStyles from "@/styles/sidebar.module.css";

const links = [
  { href: "/work/web-design", label: "Web Design" },
  { href: "/work/ui-ux", label: "UI/UX" },
  { href: "/work/brand-design", label: "Brand Design" },
  { href: "/work/brand-design/logos", label: "Logos" },
  { href: "/work/brand-design/brand-identities", label: "Brand Identities" },
  { href: "/work/brand-design/social-media", label: "Social Media" },
  { href: "/work/thumbnail", label: "Thumbnail" },
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <div className={styles.bar}>
        <Link href="/" aria-label="Home" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo-mark-black.png"
            alt=""
            width={3418}
            height={1506}
            priority
            quality={100}
            sizes="80px"
            className="h-8 w-auto"
          />
        </Link>
        <button
          type="button"
          className={styles.menuBtn}
          aria-expanded={open}
          aria-controls="mobile-drawer"
          onClick={() => setOpen((o) => !o)}
        >
          Menu
        </button>
      </div>
      {open ? (
        <button
          type="button"
          className={styles.backdrop}
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      ) : null}
      {open ? (
        <div className={`${styles.drawer} ${styles.drawerOpen}`} id="mobile-drawer">
          <div className={sidebarStyles.block}>
            <p className={sidebarStyles.name}>{site.name}</p>
            <p className={`body-sm ${sidebarStyles.mutedSecondary}`}>{site.titleLine}</p>
            <nav aria-label="Mobile primary">
              <ul className={sidebarStyles.navList}>
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={`body-md ${sidebarStyles.navLink} ${isActive(l.href) ? sidebarStyles.navLinkActive : ""}`}
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Link
              href="/contact"
              className={`body-sm ${sidebarStyles.contactLink} ${pathname === "/contact" ? sidebarStyles.contactLinkActive : ""}`}
              onClick={() => setOpen(false)}
            >
              {site.contactCta}
            </Link>
            <a className={`body-sm ${sidebarStyles.contactLink}`} href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
