type NavbarProps = {
  links: { label: string; href: string }[];
};

export default function Navbar({ links }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-textPrimary/10 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#top" className="font-display text-2xl text-textPrimary">
          TexasGrounds
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-textPrimary transition-colors hover:text-primaryGreen"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="rounded-full bg-terracotta px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-200 hover:translate-y-[-1px] active:scale-[0.98]"
        >
          Get a Free Quote
        </a>
      </div>
      <nav
        aria-label="Mobile section links"
        className="mx-auto flex w-full max-w-7xl items-center gap-5 overflow-x-auto px-4 pb-3 text-sm md:hidden sm:px-6 lg:px-8"
      >
        {links.map((link) => (
          <a
            key={`mobile-${link.href}`}
            href={link.href}
            className="whitespace-nowrap text-textPrimary transition-colors hover:text-primaryGreen"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
