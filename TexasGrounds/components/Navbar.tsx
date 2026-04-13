"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavbarProps = {
  links: { label: string; href: string }[];
};

export default function Navbar({ links }: NavbarProps) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);

    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const isActiveLink = (href: string) => {
    if (href.startsWith("/#")) {
      return pathname === "/" && hash === href.replace("/", "");
    }

    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-40 border-b border-textPrimary/10 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-display text-2xl text-textPrimary">
          TexasGrounds
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primaryGreen ${
                isActiveLink(link.href) ? "text-primaryGreen" : "text-textPrimary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/contact"
            className="rounded-full border border-textPrimary/20 px-5 py-2.5 text-sm font-semibold text-textPrimary transition-transform duration-200 hover:translate-y-[-1px] active:scale-[0.98]"
          >
            Contact
          </Link>
          <Link
            href="/#contact"
            className="rounded-full bg-terracotta px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-200 hover:translate-y-[-1px] active:scale-[0.98]"
          >
            Get a Free Quote
          </Link>
        </div>
        <Link
          href="/contact"
          className="rounded-full border border-textPrimary/20 px-4 py-2 text-xs font-semibold text-textPrimary transition-transform duration-200 hover:translate-y-[-1px] active:scale-[0.98] md:hidden"
        >
          Contact
        </Link>
      </div>
      <nav
        aria-label="Mobile section links"
        className="mx-auto flex w-full max-w-7xl items-center gap-5 overflow-x-auto px-4 pb-3 text-sm md:hidden sm:px-6 lg:px-8"
      >
        {links.map((link) => (
          <Link
            key={`mobile-${link.href}`}
            href={link.href}
            className={`whitespace-nowrap transition-colors hover:text-primaryGreen ${
              isActiveLink(link.href) ? "text-primaryGreen" : "text-textPrimary"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
