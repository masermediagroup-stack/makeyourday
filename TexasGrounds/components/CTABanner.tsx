export default function CTABanner() {
  return (
    <section id="contact" className="bg-background">
      <svg
        viewBox="0 0 1440 120"
        className="h-16 w-full text-cream md:h-24"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M0,64 C220,130 380,10 620,48 C880,92 1090,12 1440,68 L1440,120 L0,120 Z"
        />
      </svg>
      <div className="bg-cream py-16">
        <div className="mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl tracking-tight text-textPrimary md:text-5xl">
            Ready to Transform Your Property?
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-textMuted md:text-lg">
            Serving Dallas, Fort Worth, Frisco, Allen, Southlake, and surrounding
            areas.
          </p>
          <a
            href="mailto:hello@texasgrounds.com"
            className="mt-8 inline-flex rounded-full bg-terracotta px-7 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:translate-y-[-1px] active:scale-[0.98]"
          >
            Request a Free Quote
          </a>
        </div>
      </div>
    </section>
  );
}
