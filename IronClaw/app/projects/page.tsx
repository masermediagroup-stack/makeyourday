import Image from "next/image";
import Link from "next/link";
import { TopNav } from "@/components/landing/TopNav";
import { projects, services } from "@/components/landing/siteData";

export const metadata = {
  title: "Projects | Ironclad Build Co.",
  description: "Commercial construction project proof with scope, role, timeline, and outcomes.",
};

export default function ProjectsPage() {
  return (
    <main className="w-full max-w-full overflow-x-hidden bg-[var(--bg)] text-[var(--fg)]">
      <TopNav />
      <section className="px-5 pb-20 pt-36 md:px-8 md:pb-28">
        <div className="mx-auto max-w-[1380px]">
          <h1 className="max-w-6xl text-[clamp(3rem,7vw,6.5rem)] font-black uppercase leading-[0.88] tracking-normal">
            Project proof with field details.
          </h1>
          <p className="mt-7 max-w-3xl text-xl leading-8 text-[var(--muted)]">
            A construction portfolio should do more than show finished photos. These cards include location, role, timeline, scope, and the operating result.
          </p>
        </div>
      </section>

      <section className="px-5 pb-28 md:px-8 md:pb-40">
        <div className="mx-auto grid max-w-[1380px] gap-6">
          {projects.map((project) => (
            <article key={project.slug} className="shader-surface grid overflow-hidden rounded-lg border border-white/10 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[360px]">
                <Image src={project.image} alt={`${project.title} construction image.`} fill className="object-cover opacity-88" />
              </div>
              <div className="p-6 md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.12em] text-[var(--accent)]">{project.sector}</p>
                <h2 className="mt-4 text-4xl font-black uppercase leading-none md:text-6xl">{project.title}</h2>
                <div className="mt-8 grid gap-3 text-sm text-[var(--muted)] md:grid-cols-3">
                  <p><span className="block font-black uppercase text-white">Location</span>{project.location}</p>
                  <p><span className="block font-black uppercase text-white">Timeline</span>{project.timeline}</p>
                  <p><span className="block font-black uppercase text-white">Role</span>{project.role}</p>
                </div>
                <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)]">{project.outcome}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-[1380px] rounded-lg bg-white p-7 text-[var(--ink)] md:p-10">
          <h2 className="text-4xl font-black uppercase leading-none md:text-6xl">Need a comparable package?</h2>
          <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-black/62">
            Send drawings, constraints, and the target start date. We will route it to the right estimator by scope.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/request-bid" className="btn-gradient-dark rounded-full px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-white">
              Request Bid
            </Link>
            {services.slice(0, 2).map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="rounded-full border border-black/15 px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-[var(--ink)]">
                {service.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
