import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { locations } from "@/lib/locations";
import { membershipCards } from "@/lib/memberships";
import { testimonials } from "@/lib/testimonials";

export default function Home() {
  return (
    <div className="bg-white">
      <section className="relative min-h-[100dvh] overflow-hidden bg-[var(--blue-deep)] text-white">
        <Image
          src="https://picsum.photos/seed/caddo-hero/1920/1200"
          alt="Caddo office interior"
          fill
          priority
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--blue-deep)]/90 to-transparent" />
        <div className="section-wrap relative py-24 md:py-36">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--yellow)]">
              DFW favorite office space
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-5 max-w-3xl font-[family-name:var(--font-playfair)] text-5xl leading-[0.95] md:text-7xl">
              Work near home, not at home.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-base text-white/90 md:text-xl">
              Private offices and coworking for 1800+ small businesses across 10 DFW locations.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-6 inline-flex rounded-full bg-white px-4 py-2 text-sm text-[var(--text-primary)]">
              4.7 Google rating from 500+ reviews
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/locations">Find Your Office</Button>
              <Button href="/pricing" variant="ghost-light">
                See Memberships
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[var(--off-white)] py-12">
        <div className="section-wrap grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            ["1,800+", "Members Served"],
            ["10", "DFW Locations"],
            ["4.7", "Google Rating"],
            ["15-Day", "Cancel Anytime"],
          ].map(([value, label]) => (
            <Reveal key={label}>
              <div className="rounded-2xl border border-[var(--gray-200)] bg-white p-5 text-center">
                <p className="font-mono text-3xl text-[var(--blue-deep)]">{value}</p>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-wrap py-20 md:py-28">
        <Reveal>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl">
            Pick your Caddo membership
          </h2>
        </Reveal>
        <p className="mt-3 text-[var(--text-muted)]">Two ways to work. Zero long-term leases.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {membershipCards.map((card, idx) => (
            <Reveal key={card.title} delay={idx * 0.08}>
              <article className="flex h-full flex-col rounded-[20px] border border-[var(--gray-200)] bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
                <div className="h-1 w-16 rounded-full" style={{ background: card.accent }} />
                <h3 className="mt-5 text-2xl font-semibold">{card.title}</h3>
                <p className="mt-2 font-mono text-3xl" style={{ color: card.accent }}>
                  {card.price}
                </p>
                <ul className="mt-6 flex-1 space-y-2 text-sm text-[var(--gray-700)]">
                  {card.features.map((feature) => (
                    <li key={feature}>• {feature}</li>
                  ))}
                </ul>
                <div className="mt-7">
                  <Button href={card.href} variant={card.title.includes("Private") ? "brand" : "primary"}>
                    Explore
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-wrap pb-20 md:pb-28">
        <Reveal>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl">
            Find your nearest Caddo location
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {locations.map((location, idx) => (
            <Reveal key={location.slug} delay={idx * 0.03}>
              <article className="overflow-hidden rounded-[20px]">
                <div className="relative h-56">
                  <Image src={location.heroImage} alt={location.name} fill className="object-cover transition duration-300 hover:scale-105" />
                </div>
                <div className="space-y-2 border border-t-0 border-[var(--gray-200)] bg-white p-4">
                  <p className="font-[family-name:var(--font-playfair)] text-2xl">{location.name}</p>
                  <p className="text-sm text-[var(--text-muted)]">{location.subtitle}</p>
                  <p className="font-mono text-sm text-[var(--blue-deep)]">Starting at ${location.startingPrice}/mo</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-[var(--blue-deep)] py-20 text-white md:py-28">
        <div className="section-wrap">
          <Reveal>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl">
              What our community is saying
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((item, idx) => (
              <Reveal key={item.name} delay={idx * 0.08}>
                <article className="rounded-2xl bg-white p-6 text-[var(--text-primary)]">
                  <p className="text-sm text-[var(--yellow)]">Five-star review</p>
                  <p className="mt-4 text-sm leading-7 italic text-[var(--gray-700)]">{item.quote}</p>
                  <p className="mt-5 font-semibold">{item.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">{item.location}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
