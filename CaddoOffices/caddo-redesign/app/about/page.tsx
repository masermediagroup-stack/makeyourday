import { PageHero } from "@/components/sections/PageHero";

export default function AboutPage() {
  return (
    <div>
      <PageHero
        title="Built for local business owners"
        subtitle="Caddo Offices supports independent professionals across DFW with premium, practical workspaces."
        image="https://picsum.photos/seed/about-hero/1920/1200"
      />
      <section className="section-wrap py-16 md:py-24">
        <div className="grid gap-6 md:grid-cols-3">
          {["Founded in DFW", "10 active locations", "1800+ members served"].map((item) => (
            <article key={item} className="rounded-2xl border border-[var(--gray-200)] p-6">
              <p className="font-[family-name:var(--font-playfair)] text-3xl">{item}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
