import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";

export default function PricingPage() {
  return (
    <div>
      <PageHero
        title="Simple, flexible pricing"
        subtitle="No long-term leases. Month-to-month plans that scale with your business."
        image="https://picsum.photos/seed/pricing-hero/1920/1200"
      />
      <section className="section-wrap py-16 md:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-[var(--gray-200)] p-6">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl">Coworking Plans</h2>
            <p className="mt-2 text-sm text-[var(--gray-700)]">$249 to $399/month</p>
            <Button href="/memberships/coworking" variant="primary">
              Start Coworking
            </Button>
          </article>
          <article className="rounded-2xl border border-[var(--gray-200)] p-6">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl">Private Office</h2>
            <p className="mt-2 text-sm text-[var(--gray-700)]">Starting at $499/month</p>
            <Button href="/memberships/office" variant="brand">
              Get Private Office
            </Button>
          </article>
        </div>
      </section>
    </div>
  );
}
