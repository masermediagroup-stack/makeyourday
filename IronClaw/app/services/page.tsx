import Image from "next/image";
import Link from "next/link";
import { TopNav } from "@/components/landing/TopNav";
import { services } from "@/components/landing/siteData";

export const metadata = {
  title: "Services | Ironclad Build Co.",
  description: "Concrete, demolition, steel erection, and site logistics services from Ironclad Build Co.",
};

export default function ServicesPage() {
  return (
    <main className="w-full max-w-full overflow-x-hidden bg-[var(--bg)] text-[var(--fg)]">
      <TopNav />

      <section className="px-5 pb-20 pt-36 md:px-8 md:pb-28">
        <div className="mx-auto max-w-[1380px]">
          <h1 className="max-w-6xl text-[clamp(3rem,7vw,6.5rem)] font-black uppercase leading-[0.88] tracking-normal">
            Service depth for serious construction packages.
          </h1>
          <p className="mt-7 max-w-3xl text-xl leading-8 text-[var(--muted)]">
            The homepage lists four service paths. This page gives each one a direct entry point with matching scope, proof, and bid context.
          </p>
        </div>
      </section>

      <section className="px-5 pb-28 md:px-8 md:pb-40">
        <div className="mx-auto grid max-w-[1380px] gap-5 md:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="shader-surface group grid overflow-hidden rounded-lg border border-white/10 transition-colors hover:border-[var(--accent)] lg:grid-cols-[0.9fr_1.1fr]"
            >
              <div className="relative min-h-[280px] overflow-hidden">
                <Image
                  src={service.image}
                  alt={`${service.title} service image.`}
                  fill
                  className="object-cover opacity-88 transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/18 to-transparent" />
              </div>
              <div className="p-6 md:p-7">
                <p className="text-sm font-black uppercase tracking-[0.12em] text-[var(--accent)]">
                  {service.proof}
                </p>
                <h2 className="mt-4 text-4xl font-black uppercase leading-none md:text-5xl">
                  {service.title}
                </h2>
                <p className="mt-5 text-base leading-7 text-[var(--muted)]">{service.summary}</p>
                <div className="mt-7 grid gap-2">
                  {service.scope.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-sm font-semibold text-white/72"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <span className="btn-gradient-accent mt-8 inline-flex rounded-full border border-[var(--accent)] px-5 py-3 text-xs font-black uppercase tracking-[0.12em]">
                  Open Service
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
