import Link from "next/link";

const navItems = [
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Safety", href: "#safety" },
  { label: "Contact", href: "#contact" },
];

export function TopNav() {
  return (
    <header className="border-b border-[var(--line)]">
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-4 px-4 py-4 md:grid-cols-[1fr_auto] md:gap-6 md:px-8">
        <div className="flex items-baseline gap-3">
          <span className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
            01
          </span>
          <p className="text-xl font-bold uppercase tracking-tight">Ironclad Build Co.</p>
        </div>

        <nav aria-label="Primary navigation" className="flex flex-wrap items-center gap-4 md:justify-end md:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-xs uppercase tracking-[0.14em] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--fg)]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/request-bid"
            className="border border-[var(--accent)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--accent)] transition-transform duration-300 hover:bg-[var(--accent)] hover:text-[var(--bg)] active:scale-[0.98]"
          >
            Request Bid
          </Link>
        </nav>
      </div>
    </header>
  );
}
