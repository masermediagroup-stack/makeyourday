import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";

export default function CoworkingPage() {
  return (
    <div>
      <PageHero
        title="A Coworking Membership Built for Small Business Owners"
        subtitle="24/7 access to 10 DFW locations. Cancel in 15 days."
        image="https://picsum.photos/seed/coworking-hero/1920/1200"
        accent="var(--red-accent)"
      />
      <section className="section-wrap py-16 md:py-24">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["Basic", "$249/mo", "Most Flexible", "No monthly credit, pay as needed."],
            ["Standard", "$299/mo", "Most Popular", "$160 monthly credit included."],
            ["Premium", "$399/mo", "Best Value", "$400 monthly credit included."],
          ].map(([name, price, badge, copy], idx) => (
            <article
              key={name}
              className={`rounded-2xl border p-6 ${idx === 1 ? "border-[var(--yellow)] bg-[var(--off-white)]" : "border-[var(--gray-200)] bg-white"}`}
            >
              <p className="text-xs uppercase tracking-[0.15em] text-[var(--text-muted)]">{badge}</p>
              <h2 className="mt-4 text-2xl font-semibold">{name}</h2>
              <p className="mt-2 font-mono text-4xl text-[var(--red-accent)]">{price}</p>
              <p className="mt-4 text-sm text-[var(--gray-700)]">{copy}</p>
              <div className="mt-8">
                <Button href="/contact">Choose {name}</Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
