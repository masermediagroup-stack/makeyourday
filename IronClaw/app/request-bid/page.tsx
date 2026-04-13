import Image from "next/image";
import { BidRequestForm } from "@/components/request-bid/BidRequestForm";

const galleryItems = [
  {
    src: "/images/ironclad/fallback-01.jpeg",
    alt: "Brutalist interior corridors in cast concrete.",
    code: "SITE LOG / 201",
  },
  {
    src: "/images/ironclad/fallback-02.jpg",
    alt: "Monolithic concrete blocks under overcast daylight.",
    code: "SITE LOG / 202",
  },
  {
    src: "/images/ironclad/fallback-05.jpg",
    alt: "Crew working on reinforced concrete formwork.",
    code: "SITE LOG / 203",
  },
  {
    src: "/images/ironclad/fallback-07.jpg",
    alt: "Active demolition staging with heavy machinery.",
    code: "SITE LOG / 204",
  },
];

export default function RequestBidPage() {
  return (
    <main className="min-h-[100dvh] bg-[var(--bg)]">
      <header className="border-b border-[var(--line)]">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-4 py-4 md:px-8">
          <p className="text-lg font-semibold uppercase tracking-tight">Ironclad Build Co.</p>
          <a
            href="/"
            className="border border-[var(--line)] px-4 py-2 text-xs uppercase tracking-[0.14em] text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Back to home
          </a>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-8 px-4 py-10 md:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6 border border-[var(--line)] bg-[var(--surface)] p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
            Request a bid
          </p>
          <h1 className="max-w-[20ch] text-3xl font-bold uppercase tracking-[-0.02em] md:text-5xl">
            Send project scope for pricing.
          </h1>
          <p className="max-w-[65ch] text-sm leading-relaxed text-[var(--muted)] md:text-base">
            This demo intake page collects your project profile, timeline, and
            budget range so estimating can return an initial proposal package.
          </p>
          <BidRequestForm />
        </div>

        <aside className="space-y-4">
          <div className="border border-[var(--line)] bg-[var(--surface)] p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
              Typical turnaround
            </p>
            <p className="mt-2 font-mono text-2xl">18-36 hrs</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Scope review, site assumptions, and an initial work package estimate.
            </p>
          </div>

          <div className="grid gap-px bg-[var(--line)]">
            {galleryItems.map((item) => (
              <article key={item.code} className="bg-[var(--surface)] p-3">
                <div className="relative aspect-[16/10] overflow-hidden border border-[var(--line)]">
                  <Image src={item.src} alt={item.alt} fill className="object-cover opacity-85" />
                </div>
                <p className="pt-2 text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
                  {item.code}
                </p>
              </article>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
