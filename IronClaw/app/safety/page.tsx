import Link from "next/link";
import { TopNav } from "@/components/landing/TopNav";
import { safetyStats } from "@/components/landing/siteData";

export const metadata = {
  title: "Safety | Ironclad Build Co.",
  description: "Safety culture, field controls, and credential signals for Ironclad construction work.",
};

const controls = [
  "Daily pre-task plans before crews start work",
  "Superintendent-led access and delivery reviews",
  "Job hazard analysis by phase and trade interface",
  "Inspection readiness tracking before critical pours and lifts",
  "Close-call review with action owners and due dates",
  "Public protection planning for occupied and urban sites",
];

export default function SafetyPage() {
  return (
    <main className="w-full max-w-full overflow-x-hidden bg-[var(--bg)] text-[var(--fg)]">
      <TopNav />
      <section className="px-5 pb-20 pt-36 md:px-8 md:pb-28">
        <div className="mx-auto max-w-[1380px]">
          <h1 className="max-w-6xl text-[clamp(3rem,7vw,6.5rem)] font-black uppercase leading-[0.88] tracking-normal">
            Safety proof belongs before the bid form.
          </h1>
          <p className="mt-7 max-w-3xl text-xl leading-8 text-[var(--muted)]">
            Owners and general contractors evaluate risk alongside price. This page makes field controls, credentials, and measurable safety behavior easy to find.
          </p>
        </div>
      </section>

      <section className="px-5 pb-28 md:px-8 md:pb-40">
        <div className="mx-auto grid max-w-[1380px] gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4 md:grid-cols-2">
            {safetyStats.map(([value, label]) => (
              <article key={label} className="shader-surface rounded-lg border border-white/10 p-6">
                <p className="font-mono text-5xl text-[var(--accent)]">{value}</p>
                <p className="mt-4 text-sm font-bold uppercase leading-6 tracking-[0.1em] text-white/70">{label}</p>
              </article>
            ))}
          </div>
          <div className="shader-surface rounded-lg border border-white/10 p-6 md:p-8">
            <h2 className="text-4xl font-black uppercase leading-none md:text-6xl">Controls buyers can audit</h2>
            <div className="mt-8 grid gap-3">
              {controls.map((control) => (
                <div key={control} className="rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white/78">
                  {control}
                </div>
              ))}
            </div>
            <Link href="/request-bid" className="btn-gradient-accent mt-8 inline-flex rounded-full border border-[var(--accent)] px-5 py-3 text-xs font-black uppercase tracking-[0.12em]">
              Discuss Site Risk
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
