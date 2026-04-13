import Link from "next/link";
import Image from "next/image";
import { locations } from "@/lib/locations";
import { PageHero } from "@/components/sections/PageHero";

export default function LocationsPage() {
  return (
    <div>
      <PageHero
        title="Find your nearest Caddo location"
        subtitle="Compare every DFW location in one place."
        image="https://picsum.photos/seed/location-map/1920/1200"
      />
      <section className="section-wrap py-16 md:py-24">
        <div className="mb-8 flex flex-wrap gap-2">
          {["All", "North Dallas", "Collin County", "Tarrant County"].map((pill) => (
            <span key={pill} className="rounded-full border border-[var(--gray-200)] px-4 py-2 text-sm">
              {pill}
            </span>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {locations.map((location) => (
            <Link
              key={location.slug}
              href={`/locations/${location.slug}`}
              className="overflow-hidden rounded-2xl border border-[var(--gray-200)] bg-white"
            >
              <div className="relative h-52">
                <Image src={location.heroImage} alt={location.name} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl">{location.name}</h2>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{location.subtitle}</p>
                <p className="mt-2 font-mono text-sm text-[var(--blue-deep)]">
                  Starting at ${location.startingPrice}/mo
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
