import { HeroSection } from "@/components/landing/HeroSection";
import { TopNav } from "@/components/landing/TopNav";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-[100dvh] bg-[var(--bg)]">
      <TopNav />
      <section id="projects">
        <HeroSection />
      </section>

      <section id="services" className="mx-auto w-full max-w-[1400px] border-x border-b border-[var(--line)]">
        <div className="grid grid-cols-1 gap-px bg-[var(--line)] lg:grid-cols-[1.1fr_0.9fr]">
          <article className="bg-[var(--surface)] p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
              Services
            </p>
            <h2 className="pt-3 text-3xl font-bold uppercase tracking-[-0.02em] md:text-4xl">
              Structural systems with site-first execution.
            </h2>
            <div className="pt-6 grid gap-px bg-[var(--line)] md:grid-cols-2">
              {[
                ["Concrete packages", "Cast-in-place, slab-on-grade, podium systems."],
                ["Demolition", "Selective and full structure teardown planning."],
                ["Steel installation", "Field sequencing and erection coordination."],
                ["Site logistics", "Access, safety phasing, and delivery routing."],
              ].map(([title, copy]) => (
                <div key={title} className="bg-[var(--bg)] p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.04em]">{title}</p>
                  <p className="pt-2 text-sm leading-relaxed text-[var(--muted)]">{copy}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="bg-[var(--surface)] p-4">
            <div className="relative aspect-[4/5] overflow-hidden border border-[var(--line)]">
              <Image
                src="/images/ironclad/fallback-07.jpg"
                alt="Demolition site with excavators staged around a concrete structure."
                fill
                className="object-cover opacity-85"
              />
            </div>
          </article>
        </div>
      </section>

      <section id="safety" className="mx-auto w-full max-w-[1400px] border-x border-b border-[var(--line)] bg-[var(--surface)] px-6 py-8 md:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["47.2%", "Lower incident frequency than regional heavy-civil baseline."],
            ["2,900+", "Daily checklists completed across active zones in 2025."],
            ["11", "Dedicated site-safety officers across current portfolio."],
          ].map(([metric, detail]) => (
            <article key={metric} className="border border-[var(--line)] bg-[var(--bg)] p-4">
              <p className="font-mono text-3xl">{metric}</p>
              <p className="pt-2 text-sm leading-relaxed text-[var(--muted)]">{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto w-full max-w-[1400px] border-x border-b border-[var(--line)] px-6 py-8 md:px-8">
        <p className="text-xs uppercase tracking-[0.16em] text-[var(--accent)]">Contact</p>
        <p className="pt-3 max-w-[65ch] text-sm leading-relaxed text-[var(--muted)]">
          Estimating Desk: +1 (312) 847-1928 / bids@ironcladbuild.co
        </p>
      </section>
    </main>
  );
}
