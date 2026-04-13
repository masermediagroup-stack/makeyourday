"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/Button";

const links = [
  { href: "/memberships/coworking", label: "Coworking" },
  { href: "/memberships/office", label: "Private Office" },
  { href: "/locations", label: "Locations" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 z-40 transition-all duration-200 ${
        scrolled ? "top-0 bg-white/95 shadow-md backdrop-blur" : "top-0 bg-transparent"
      }`}
    >
      <nav className="section-wrap flex items-center justify-between py-4">
        <Link href="/" className="font-[family-name:var(--font-playfair)] text-2xl font-semibold">
          Caddo Offices
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm hover:text-[var(--blue-mid)]">
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="text-sm">
            Login
          </Link>
          <Button href="/contact">Book a Tour</Button>
        </div>
        <button
          ref={triggerRef}
          type="button"
          className="md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div
          id="mobile-nav"
          role="menu"
          className="md:hidden bg-white border-t border-[var(--gray-200)]"
        >
          <div className="section-wrap flex flex-col gap-4 py-4">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Button href="/contact">Book a Tour</Button>
          </div>
        </div>
      )}
    </header>
  );
}
