import { PageHero } from "@/components/sections/PageHero";

export default function BrokersPage() {
  return (
    <div>
      <PageHero
        title="Broker partnerships"
        subtitle="Bring your clients to flexible, premium office space with responsive support."
        image="https://picsum.photos/seed/broker-hero/1920/1200"
      />
      <section className="section-wrap py-16 md:py-24">
        <p className="max-w-2xl text-[var(--gray-700)]">
          Our broker program offers straightforward referrals, quick tour scheduling, and transparent
          availability updates across all markets.
        </p>
      </section>
    </div>
  );
}
