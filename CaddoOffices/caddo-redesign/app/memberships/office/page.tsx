import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";

export default function OfficePage() {
  return (
    <div>
      <PageHero
        title="Your Own Private Office Suite in DFW"
        subtitle="Professional office space without long leases."
        image="https://picsum.photos/seed/private-office-hero/1920/1200"
      />
      <section className="section-wrap py-16 md:py-24">
        <div className="rounded-3xl border border-[var(--gray-200)] bg-white p-8 md:p-12">
          <p className="text-sm uppercase tracking-[0.14em] text-[var(--text-muted)]">
            Private office membership
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-4xl md:text-5xl">
            Starting at $499/mo
          </h2>
          <p className="mt-4 max-w-3xl text-[var(--gray-700)]">
            Ideal for teams who need dedicated space, secure access, client-ready meeting rooms,
            signage, and a real business address.
          </p>
          <div className="mt-8">
            <Button href="/contact" variant="brand">
              Get a Private Office
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
