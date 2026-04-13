import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { locations } from "@/lib/locations";

export default async function LocationDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = locations.find((item) => item.slug === slug);
  if (!location) notFound();

  return (
    <div>
      <section className="relative min-h-[60dvh] overflow-hidden text-white">
        <Image src={location.heroImage} alt={location.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--blue-deep)]/90 to-black/40" />
        <div className="section-wrap relative py-24 md:py-32">
          <p className="text-sm text-white/80">Locations / {location.name}</p>
          <h1 className="mt-3 font-[family-name:var(--font-playfair)] text-5xl md:text-6xl">
            Office Space in {location.name}, TX
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/90">{location.subtitle}</p>
        </div>
      </section>
      <section className="section-wrap py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 rounded-2xl border border-[var(--gray-200)] p-6">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl">Location Details</h2>
            <p className="mt-4 text-[var(--gray-700)]">{location.address}</p>
            <p className="text-[var(--gray-700)]">{location.phone}</p>
            <p className="mt-4 text-sm text-[var(--text-muted)]">
              Amenities include 24/7 access, conference rooms, parking, high-speed internet, and
              on-site management.
            </p>
          </div>
          <aside className="rounded-2xl border border-[var(--gray-200)] bg-[var(--off-white)] p-6">
            <p className="text-sm text-[var(--text-muted)]">Starting price</p>
            <p className="mt-2 font-mono text-4xl text-[var(--blue-deep)]">${location.startingPrice}</p>
            <div className="mt-6 space-y-3">
              <Button href="/contact">Book a Tour</Button>
              <Button href="/pricing" variant="ghost-dark">
                Compare Plans
              </Button>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
