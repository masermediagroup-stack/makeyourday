import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TopNav } from "@/components/landing/TopNav";
import { projects, services } from "@/components/landing/siteData";

type ServicePageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: ServicePageProps) {
  const service = services.find((item) => item.slug === params.slug);
  return {
    title: service ? `${service.title} | Ironclad Build Co.` : "Service | Ironclad Build Co.",
    description: service?.summary ?? "Ironclad construction service detail.",
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = services.find((item) => item.slug === params.slug);
  if (!service) notFound();

  const relatedProjects = projects.slice(0, 2);

  return (
    <main className="w-full max-w-full overflow-x-hidden bg-[var(--bg)] text-[var(--fg)]">
      <TopNav />
      <section className="relative min-h-[72dvh] overflow-hidden px-5 pb-16 pt-36 md:px-8">
        <Image src={service.image} alt={`${service.title} jobsite image.`} fill priority className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,10,10,0.96),rgba(8,10,10,0.72),rgba(8,10,10,0.24))]" />
        <div className="relative mx-auto grid min-h-[56dvh] max-w-[1380px] items-end">
          <div>
            <Link href="/services" className="text-xs font-black uppercase tracking-[0.14em] text-[var(--accent)]">
              All services
            </Link>
            <h1 className="mt-6 max-w-6xl text-[clamp(3rem,7vw,6.5rem)] font-black uppercase leading-[0.88] tracking-normal">
              {service.title}
            </h1>
            <p className="mt-7 max-w-3xl text-xl leading-8 text-white/76">{service.kicker}</p>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-[1380px] gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="shader-surface h-fit rounded-lg border border-white/10 p-6">
            <p className="text-sm font-black uppercase tracking-[0.12em] text-[var(--accent)]">All service paths</p>
            <div className="mt-5 grid gap-3">
              {services.map((item) => {
                const active = item.slug === service.slug;
                return (
                  <Link
                    key={item.slug}
                    href={`/services/${item.slug}`}
                    className={`flex items-center justify-between rounded-md border px-4 py-3 text-sm font-black transition-colors ${
                      active
                        ? "border-[var(--accent)] bg-[rgba(242,177,70,0.12)] text-white"
                        : "border-white/10 bg-white/[0.03] text-white/68 hover:border-[var(--accent)] hover:text-white"
                    }`}
                  >
                    <span>{item.title}</span>
                    <span className={active ? "text-[var(--accent)]" : "text-white/36"}>
                      {active ? "Current" : "Open"}
                    </span>
                  </Link>
                );
              })}
            </div>
            <p className="mt-8 text-sm font-black uppercase tracking-[0.12em] text-[var(--accent)]">Proof point</p>
            <p className="mt-4 text-4xl font-black uppercase leading-none">{service.proof}</p>
            <Link href="/request-bid" className="btn-gradient-accent mt-8 inline-flex rounded-full border border-[var(--accent)] px-5 py-3 text-xs font-black uppercase tracking-[0.12em]">
              Price This Scope
            </Link>
          </aside>

          <div>
            <h2 className="max-w-4xl text-[clamp(2.4rem,5vw,5.25rem)] font-black uppercase leading-[0.92] tracking-normal">
              Scope that is specific enough to bid.
            </h2>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-[var(--muted)]">{service.summary}</p>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {service.scope.map((item) => (
                <div key={item} className="shader-surface rounded-lg border border-white/10 p-5">
                  <p className="text-xl font-black uppercase leading-none">{item}</p>
                  <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                    Scope review includes constraints, drawings, site access, inspection points, and field sequencing before mobilization.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-28 md:px-8 md:pb-40">
        <div className="mx-auto max-w-[1380px]">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h2 className="max-w-3xl text-4xl font-black uppercase leading-none md:text-6xl">Related project evidence</h2>
            <Link href="/projects" className="proof-button w-fit rounded-full border border-white/14 px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-white">
              View Portfolio
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {relatedProjects.map((project) => (
              <article key={project.slug} className="shader-surface overflow-hidden rounded-lg border border-white/10">
                <div className="relative aspect-[16/9]">
                  <Image src={project.image} alt={`${project.title} project image.`} fill className="object-cover opacity-88" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-black uppercase leading-none">{project.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{project.outcome}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
