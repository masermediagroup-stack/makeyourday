import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-textPrimary/10 bg-background py-12">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-3xl text-textPrimary">TexasGrounds</p>
          <p className="mt-3 text-sm text-textMuted">
            Rooted in Texas. Built to Last.
          </p>
        </div>

        <nav aria-label="Footer links" className="grid grid-cols-2 gap-3 text-sm">
          <Link href="/services" className="text-textPrimary hover:text-primaryGreen">
            Services
          </Link>
          <Link href="/portfolio" className="text-textPrimary hover:text-primaryGreen">
            Portfolio
          </Link>
          <Link href="/about" className="text-textPrimary hover:text-primaryGreen">
            About
          </Link>
          <Link href="/#contact" className="text-textPrimary hover:text-primaryGreen">
            Contact
          </Link>
        </nav>

        <div className="text-sm text-textMuted">
          <p>
            Phone:{" "}
            <a className="text-textPrimary hover:text-primaryGreen" href="tel:+13128471928">
              +1 (312) 847-1928
            </a>
          </p>
          <p className="mt-2">
            Email:{" "}
            <a
              className="text-textPrimary hover:text-primaryGreen"
              href="mailto:hello@texasgrounds.com"
            >
              hello@texasgrounds.com
            </a>
          </p>
        </div>
      </div>
      <p className="mx-auto mt-10 w-full max-w-7xl px-4 text-xs text-textMuted sm:px-6 lg:px-8">
        © {currentYear} TexasGrounds. All rights reserved.
      </p>
    </footer>
  );
}
