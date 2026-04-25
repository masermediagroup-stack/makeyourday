import Image from "next/image";
import Link from "next/link";
import { SiteMotion } from "@/components/landing/SiteMotion";
import { TopNav } from "@/components/landing/TopNav";
import { projects, safetyStats, sectors, services } from "@/components/landing/siteData";

const processSteps = [
  ["Scope Lock", "We translate drawings, site constraints, access limits, and owner priorities into a buildable field plan."],
  ["Field Sequencing", "Crews, pours, lifts, removals, deliveries, and inspections are mapped before the first mobilization call."],
  ["Daily Control", "Superintendents run pre-task planning, safety checks, and progress updates with decisions tied to the schedule."],
  ["Handoff", "Closeout documentation, punch control, and trade turnover are packaged so the next phase starts without confusion."],
];

export default function Home() {
  return (
    <main data-page-root className="w-full max-w-full overflow-x-hidden bg-[var(--bg)] text-[var(--fg)]">
      <SiteMotion />
      <TopNav />

      <section className="relative min-h-[100dvh] overflow-hidden">
        <Image
          src="/images/ironclad/generated-hero-site.png"
          alt="Commercial construction site with concrete frame, crane, and organized crews."
          fill
          priority
          className="object-cover opacity-72"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(242,177,70,0.26),transparent_34%),linear-gradient(90deg,rgba(8,10,10,0.96)_0%,rgba(8,10,10,0.72)_42%,rgba(8,10,10,0.2)_100%)]" />
        <div className="relative mx-auto grid min-h-[100dvh] w-full max-w-[1380px] items-end px-5 pb-14 pt-28 md:px-8 md:pb-20">
          <div className="max-w-6xl">
            <h1 data-reveal className="max-w-6xl text-[clamp(3rem,7vw,6.75rem)] font-black uppercase leading-[0.88] tracking-normal text-white">
              Construction that holds under pressure.
            </h1>
            <p data-reveal className="mt-8 max-w-2xl text-lg leading-8 text-white/78 md:text-xl">
              Ironclad plans and builds concrete, demolition, steel, and site logistics packages for owners who need fewer surprises between bid day and turnover.
            </p>
            <div data-reveal className="mt-9 flex flex-wrap gap-3">
              <Link href="/request-bid" className="btn-gradient-accent rounded-full border border-[var(--accent)] px-6 py-4 text-sm font-black uppercase tracking-[0.12em] transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]">
                Price a Project
              </Link>
              <Link href="/projects" className="proof-button rounded-full border border-white/24 bg-white/8 px-6 py-4 text-sm font-black uppercase tracking-[0.12em] text-white backdrop-blur">
                View Proof
              </Link>
            </div>
          </div>
          <div data-reveal className="mt-12 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/12 bg-white/12 md:grid-cols-4">
            {safetyStats.map(([value, label]) => (
              <div key={label} className="bg-black/38 p-5 backdrop-blur">
                <p className="font-mono text-3xl text-white">{value}</p>
                <p className="mt-2 text-xs font-semibold uppercase leading-5 tracking-[0.12em] text-white/58">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-32 md:px-8 md:py-44">
        <div className="mx-auto max-w-[1380px]">
          <div className="mx-auto grid max-w-5xl place-items-center gap-8 text-center">
            <h2 data-reveal className="mx-auto max-w-5xl text-[clamp(2.5rem,5vw,5.6rem)] font-black uppercase leading-[0.92] tracking-normal">
              Built around the missing details most contractor sites hide.
            </h2>
            <p data-reveal className="mx-auto max-w-3xl text-lg leading-8 text-[var(--muted)]">
              The redesign adds the pages buyers expect before awarding serious work: dedicated service detail, project outcomes, safety proof, process clarity, sector fit, testimonials, and a persistent bid path.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-flow-dense md:grid-cols-6">
            <article data-scale-fade className="shader-surface group overflow-hidden rounded-lg border border-white/10 md:col-span-4 md:row-span-2">
              <div className="grid h-full lg:grid-cols-[0.9fr_1.1fr]">
                <div className="p-6 md:p-8">
                  <h3 className="text-3xl font-black uppercase leading-none md:text-5xl">Service depth</h3>
                  <p className="mt-5 text-base leading-7 text-[var(--muted)]">
                    Each major capability now links to its own detail page with scope, proof points, process notes, and bid CTA.
                  </p>
                  <div className="mt-8 grid gap-3">
                    {services.map((service) => (
                      <Link key={service.slug} href={`/services/${service.slug}`} className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-bold text-white transition-colors hover:border-[var(--accent)]">
                        <span>{service.title}</span>
                        <span className="text-[var(--accent)]">Open</span>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="relative min-h-[360px] overflow-hidden">
                  <Image src="/images/ironclad/fallback-04.jpg" alt="Rebar and structural concrete preparation on a construction site." fill className="object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105" />
                </div>
              </div>
            </article>

            <Link data-scale-fade href="/projects" className="group relative min-h-[420px] overflow-hidden rounded-lg border border-white/10 md:col-span-2 md:row-span-2">
              <Image src="/images/ironclad/fallback-06.jpg" alt="Crane and steel structure on a commercial project." fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/48 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <h3 className="text-3xl font-black uppercase leading-none">Project proof</h3>
                <p className="mt-4 text-sm leading-6 text-white/72">Portfolio cards now carry location, role, timeline, scope, and outcomes.</p>
              </div>
            </Link>

            <div className="grid gap-4 md:col-span-6">
              <Link data-scale-fade href="/safety" className="shader-surface group grid gap-5 rounded-lg border border-white/10 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_24px_80px_rgba(242,177,70,0.12)] md:grid-cols-[220px_1fr_auto] md:items-center md:p-6">
                <div className="rounded-md border border-[var(--accent)]/35 bg-[rgba(242,177,70,0.1)] px-4 py-5 text-[var(--accent)]">
                  <p className="text-sm font-black uppercase tracking-[0.14em]">Risk</p>
                  <p className="mt-2 text-3xl font-black uppercase leading-none">Safety</p>
                </div>
                <div>
                  <h3 className="text-3xl font-black uppercase leading-none">Safety is visible</h3>
                  <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--muted)]">
                    Credentials, EMR, daily planning, and field controls sit near conversion points because buyers treat risk as part of price.
                  </p>
                </div>
                <span className="btn-gradient-accent inline-flex w-fit rounded-full border border-[var(--accent)] px-5 py-3 text-xs font-black uppercase tracking-[0.12em]">
                  Open Safety
                </span>
              </Link>

              <article data-scale-fade className="shader-surface group grid gap-5 rounded-lg border border-white/10 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_24px_80px_rgba(242,177,70,0.12)] md:grid-cols-[220px_1fr_auto] md:items-center md:p-6">
                <div className="rounded-md border border-[var(--accent)]/35 bg-[rgba(242,177,70,0.1)] px-4 py-5 text-[var(--accent)]">
                  <p className="text-sm font-black uppercase tracking-[0.14em]">Control</p>
                  <p className="mt-2 text-3xl font-black uppercase leading-none">Process</p>
                </div>
                <div>
                  <h3 className="text-3xl font-black uppercase leading-none">Process clarity</h3>
                  <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--muted)]">
                    Prospects can see how the work moves from scope review to field control and closeout before they submit a bid.
                  </p>
                </div>
                <Link href="/#process" className="btn-gradient-accent inline-flex w-fit rounded-full border border-[var(--accent)] px-5 py-3 text-xs font-black uppercase tracking-[0.12em]">
                  See Process
                </Link>
              </article>

              <article data-scale-fade className="shader-surface group grid gap-5 rounded-lg border border-white/10 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_24px_80px_rgba(242,177,70,0.12)] md:grid-cols-[220px_1fr_auto] md:items-center md:p-6">
                <div className="rounded-md border border-[var(--accent)]/35 bg-[rgba(242,177,70,0.1)] px-4 py-5 text-[var(--accent)]">
                  <p className="text-sm font-black uppercase tracking-[0.14em]">Intake</p>
                  <p className="mt-2 text-3xl font-black uppercase leading-none">Bid Path</p>
                </div>
                <div>
                  <h3 className="text-3xl font-black uppercase leading-none">Fast bid path</h3>
                  <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--muted)]">
                    The request page asks for the fields estimating actually needs, with support content around turnaround and readiness.
                  </p>
                </div>
                <Link href="/request-bid" className="btn-gradient-accent inline-flex w-fit rounded-full border border-[var(--accent)] px-5 py-3 text-xs font-black uppercase tracking-[0.12em]">
                  Start Intake
                </Link>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-white/10 py-8">
        <div data-marquee-track className="flex w-max gap-10 whitespace-nowrap text-5xl font-black uppercase leading-none text-white/12 md:text-7xl">
          {[...sectors, ...sectors].map((sector, index) => (
            <span key={`${sector}-${index}`}>{sector}</span>
          ))}
        </div>
      </section>

      <section id="process" className="px-5 py-32 md:px-8 md:py-48">
        <div className="mx-auto grid max-w-[1380px] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div data-process-title className="h-fit lg:pt-12">
            <h2 className="text-[clamp(2.5rem,5vw,5.5rem)] font-black uppercase leading-[0.92] tracking-normal">
              Field control from first scope call.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">
              Serious buyers do not need vague promises. They need to know how decisions, risks, and handoffs are controlled.
            </p>
          </div>
          <div data-process-track className="grid gap-6">
            {processSteps.map(([title, copy], index) => (
              <article key={title} data-scale-fade className="shader-surface rounded-lg border border-white/10 p-7 md:p-9">
                <div className="flex items-start justify-between gap-6">
                  <h3 className="text-3xl font-black uppercase leading-none md:text-5xl">{title}</h3>
                  <span className="font-mono text-xl text-[var(--accent)]">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-32 md:px-8 md:pb-48">
        <div className="mx-auto max-w-[1380px]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="max-w-4xl text-[clamp(2.5rem,5vw,5.5rem)] font-black uppercase leading-[0.92] tracking-normal">
              Recent work with project facts.
            </h2>
            <Link href="/projects" className="w-fit rounded-full border border-white/14 px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-white hover:border-[var(--accent)]">
              All Projects
            </Link>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {projects.map((project) => (
              <Link key={project.slug} href="/projects" className="shader-surface group overflow-hidden rounded-lg border border-white/10">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={project.image} alt={`${project.title} project image.`} fill className="object-cover opacity-88 transition-transform duration-700 ease-out group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <p className="text-sm font-bold uppercase tracking-[0.1em] text-[var(--accent)]">{project.sector}</p>
                  <h3 className="mt-3 text-2xl font-black uppercase leading-none">{project.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{project.outcome}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8">
        <div className="shader-accent mx-auto grid max-w-[1380px] gap-8 rounded-lg bg-white p-6 text-[var(--ink)] md:grid-cols-[1fr_auto] md:p-10">
          <div>
            <h2 className="max-w-4xl text-[clamp(2.4rem,5vw,5.5rem)] font-black uppercase leading-[0.92] tracking-normal">
              Send the drawings. Get the field plan.
            </h2>
            <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-black/62">
              Estimating reviews scope, schedule pressure, access, safety requirements, and likely bid alternates before responding.
            </p>
          </div>
          <div className="flex items-end">
            <Link href="/request-bid" className="btn-gradient-dark rounded-full px-6 py-4 text-sm font-black uppercase tracking-[0.12em] text-white">
              Request Bid
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-10 md:px-8">
        <div className="shader-surface mx-auto max-w-[1380px] rounded-lg border border-white/10 p-6 md:p-8">
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr_auto] md:items-start">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-[var(--accent)] bg-[rgba(242,177,70,0.12)] p-1 shadow-[0_0_24px_rgba(242,177,70,0.18)]">
                  <Image
                    src="/images/ironclad/ironclad-logo-nav.png"
                    alt="Ironclad Build Co. logo"
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain"
                  />
                </span>
                <p className="font-black uppercase tracking-[0.12em] text-white">Ironclad</p>
              </div>
              <p className="mt-5 max-w-md text-sm leading-6 text-[var(--muted)]">
                Concrete, demolition, steel, and site logistics packages built around field control and clean handoffs.
              </p>
            </div>

            <div className="grid gap-3 text-sm font-bold text-white/62 sm:grid-cols-2">
              <Link href="/services" className="transition-colors hover:text-[var(--accent)]">Services</Link>
              <Link href="/projects" className="transition-colors hover:text-[var(--accent)]">Projects</Link>
              <Link href="/safety" className="transition-colors hover:text-[var(--accent)]">Safety</Link>
              <Link href="/#process" className="transition-colors hover:text-[var(--accent)]">Process</Link>
              <Link href="/services/demolition-rebuild" className="transition-colors hover:text-[var(--accent)]">Demolition</Link>
              <Link href="/services/site-logistics" className="transition-colors hover:text-[var(--accent)]">Site Logistics</Link>
            </div>

            <div className="md:text-right">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--accent)]">Estimating</p>
              <p className="mt-3 text-sm font-semibold leading-6 text-white/70">bids@ironcladbuild.co</p>
              <Link href="/request-bid" className="btn-gradient-accent mt-5 inline-flex rounded-full border border-[var(--accent)] px-4 py-2 text-xs font-black uppercase tracking-[0.12em]">
                Contact
              </Link>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs font-semibold uppercase tracking-[0.1em] text-white/36 md:flex-row md:items-center md:justify-between">
            <p>Ironclad Build Co.</p>
            <p>Chicago + Midwest commercial work</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
