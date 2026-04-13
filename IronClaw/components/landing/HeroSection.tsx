import Image from "next/image";
import Link from "next/link";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { HeroReveal } from "./HeroReveal";

const statItems = [
  { label: "Projects delivered", value: "184" },
  { label: "On-site incidents", value: "0.4%" },
  { label: "Concrete poured", value: "2.1M ft3" },
];

const projectFrames = [
  {
    src: "/images/ironclad/fallback-03.jpg",
    alt: "Worker framing structural timber on an active site.",
    title: "FRAME PACKAGE / NORTH LOOP",
  },
  {
    src: "/images/ironclad/fallback-04.jpg",
    alt: "Steel reinforcement installation before concrete pour.",
    title: "REBAR CAGE / EAST SPAN",
  },
  {
    src: "/images/ironclad/fallback-06.jpg",
    alt: "Tower crane over heavy steel facade assembly.",
    title: "CRANE LIFT / TOWER B",
  },
];

export function HeroSection() {
  return (
    <section id="hero-root" className="relative min-h-[100dvh] border-b border-[var(--line)]">
      <HeroReveal rootId="hero-root" />
      <div className="brutalist-grid absolute inset-0 opacity-70" data-hero-grid />
      <Image
        src="/images/ironclad/hero-bg.jpg"
        alt="Silhouettes of construction crews and crane structures at dusk."
        fill
        className="object-cover opacity-25"
        priority
      />
      <div className="absolute inset-0 bg-[var(--bg)]/70" />

      <div className="relative mx-auto grid min-h-[100dvh] w-full max-w-[1400px] grid-cols-1 items-center gap-8 px-4 py-10 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
        <div className="space-y-8">
          <p
            data-hero-reveal
            className="text-[11px] uppercase tracking-[0.2em] text-[var(--accent)]"
          >
            Structural concrete and heavy civil
          </p>
          <h1
            data-hero-reveal
            className="max-w-4xl text-4xl font-bold uppercase tracking-[-0.03em] text-[var(--fg)] md:text-6xl"
          >
            We Build What Endures.
          </h1>
          <p
            data-hero-reveal
            className="max-w-[60ch] text-sm leading-relaxed text-[var(--muted)] md:text-base"
          >
            Ironclad Build Co. delivers structural systems, demolition, and rebuild
            programs that hold under weather, load, and time.
          </p>

          <div data-hero-reveal className="grid gap-0 border border-[var(--line)] md:grid-cols-3">
            {statItems.map((item) => (
              <div key={item.label} className="border-b border-[var(--line)] p-4 md:border-b-0 md:border-r last:border-r-0">
                <p className="font-mono text-2xl text-[var(--fg)]">{item.value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <div data-hero-reveal className="flex flex-wrap gap-3">
            <Link href="/request-bid" className="border border-[var(--accent)] bg-[var(--accent)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--bg)] transition-transform duration-300 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] active:scale-[0.98]">
              Start Project
            </Link>
            <Link href="#projects" className="border border-[var(--line)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--fg)] transition-transform duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] active:scale-[0.98]">
              View Work
            </Link>
          </div>
        </div>

        <div data-hero-reveal>
          <BeforeAfterSlider
            beforeSrc="/images/ironclad/after-concrete.jpg"
            afterSrc="/images/ironclad/before-demolition.jpg"
          />
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[1400px] border-x border-[var(--line)]">
        <div className="grid grid-cols-1 gap-px bg-[var(--line)] md:grid-cols-3">
          {projectFrames.map((frame) => (
            <article key={frame.title} className="bg-[var(--surface)] p-3">
              <div className="relative aspect-[16/9] overflow-hidden border border-[var(--line)]">
                <Image src={frame.src} alt={frame.alt} fill className="object-cover opacity-80" />
              </div>
              <p className="pt-3 text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
                {frame.title}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
