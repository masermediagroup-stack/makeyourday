import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Safety", href: "/safety" },
  { label: "Process", href: "/#process" },
];

export function TopNav() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 md:px-6">
      <div className="mx-auto flex w-full max-w-[1380px] items-center justify-between gap-4 rounded-full border border-white/10 bg-[rgba(10,12,12,0.78)] px-4 py-3 shadow-2xl shadow-black/25 backdrop-blur-xl md:px-6">
        <Link href="/" className="flex min-w-fit items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-[var(--accent)] bg-[rgba(242,177,70,0.12)] p-1 shadow-[0_0_24px_rgba(242,177,70,0.22)]">
            <Image
              src="/images/ironclad/ironclad-logo-nav.png"
              alt="Ironclad Build Co. logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
              priority
            />
          </span>
          <span className="text-sm font-black uppercase tracking-[0.12em] text-white md:text-base">
            Ironclad
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-xs font-bold uppercase tracking-[0.12em] text-white/68 transition-colors duration-300 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/request-bid"
          className="btn-gradient-accent rounded-full border border-[var(--accent)] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] md:px-5"
        >
          Request Bid
        </Link>
      </div>
    </header>
  );
}
