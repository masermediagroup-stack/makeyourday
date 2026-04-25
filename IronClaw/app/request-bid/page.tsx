import Image from "next/image";
import Link from "next/link";
import { TopNav } from "@/components/landing/TopNav";
import { BidRequestForm } from "@/components/request-bid/BidRequestForm";

const readinessItems = [
  "Drawings or narrative scope",
  "Target start date",
  "Known access restrictions",
  "Safety or owner requirements",
];

export default function RequestBidPage() {
  return (
    <main className="w-full max-w-full overflow-x-hidden bg-[var(--bg)] text-[var(--fg)]">
      <TopNav />
      <section className="px-5 pb-20 pt-36 md:px-8 md:pb-28">
        <div className="mx-auto grid max-w-[1380px] gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Link href="/" className="text-xs font-black uppercase tracking-[0.14em] text-[var(--accent)]">
              Back to Ironclad
            </Link>
            <h1 className="mt-6 max-w-5xl text-[clamp(3rem,7vw,6.5rem)] font-black uppercase leading-[0.88] tracking-normal">
              Send scope for estimating.
            </h1>
            <p className="mt-7 max-w-3xl text-xl leading-8 text-[var(--muted)]">
              The intake now asks for the details that shape price and schedule: project type, timing, budget posture, contact path, and scope narrative.
            </p>
            <div className="mt-10 grid gap-3 md:grid-cols-2">
              {readinessItems.map((item) => (
                <div key={item} className="shader-surface rounded-lg border border-white/10 p-4 text-sm font-bold uppercase tracking-[0.08em] text-white/78">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-white/10">
            <Image src="/images/ironclad/fallback-05.jpg" alt="Crew working on concrete formwork." fill priority className="object-cover opacity-88" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/20 to-transparent" />
          </div>
        </div>
      </section>

      <section className="px-5 pb-28 md:px-8 md:pb-40">
        <div className="mx-auto grid max-w-[1380px] gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="shader-surface rounded-lg border border-white/10 p-6 md:p-8">
            <BidRequestForm />
          </div>
          <aside className="shader-accent h-fit rounded-lg border border-white/10 bg-white p-6 text-[var(--ink)] md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.12em] text-black/48">Typical turnaround</p>
            <p className="mt-4 font-mono text-5xl">18-36 hrs</p>
            <p className="mt-5 text-base font-semibold leading-7 text-black/62">
              Scope review, site assumptions, alternates, and an initial work package estimate. Complex public or occupied-site bids may need a pre-bid call.
            </p>
            <div className="mt-8 grid gap-3">
              <Link href="/services/concrete-structures" className="rounded-full border border-black/12 px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-[var(--ink)]">
                Concrete Services
              </Link>
              <Link href="/projects" className="rounded-full border border-black/12 px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-[var(--ink)]">
                Project Proof
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
