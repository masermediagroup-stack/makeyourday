import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[var(--black)] text-[var(--gray-200)]">
      <div className="section-wrap grid gap-10 py-16 md:grid-cols-2">
        <div>
          <p className="font-[family-name:var(--font-playfair)] text-3xl text-white">Caddo Offices</p>
          <p className="mt-3 max-w-md text-sm text-[var(--gray-400)]">
            Premium coworking and private offices across DFW designed for modern small business
            teams.
          </p>
        </div>
        <p className="font-[family-name:var(--font-playfair)] text-3xl italic">
          Work near home, not at home.
        </p>
      </div>
      <div className="section-wrap grid gap-8 pb-12 md:grid-cols-4">
        <div className="space-y-2 text-sm">
          <p className="font-semibold text-white">Memberships</p>
          <Link href="/memberships/coworking">Coworking</Link>
          <Link href="/memberships/office">Private Office</Link>
          <Link href="/pricing">Pricing</Link>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-semibold text-white">Locations</p>
          <Link href="/locations">Location Finder</Link>
          <p className="text-[var(--gray-400)]">Allen, Frisco, Lakewood, McKinney, Prosper</p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-semibold text-white">Company</p>
          <Link href="/about">About</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/brokers">Brokers</Link>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-semibold text-white">Members</p>
          <Link href="/contact">Book Conference Rooms</Link>
          <Link href="/contact">Pay Rent</Link>
          <Link href="/contact">Member Login</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
      <div className="section-wrap border-t border-white/10 py-5 text-xs text-[var(--gray-400)]">
        © 2026 Caddo Holdings · Terms · Privacy · Brand Standards
      </div>
    </footer>
  );
}
