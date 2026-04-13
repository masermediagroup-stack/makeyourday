import { PageHero } from "@/components/sections/PageHero";

export default function BlogPage() {
  return (
    <div>
      <PageHero
        title="Caddo insights"
        subtitle="Workspace strategy, productivity tips, and local business updates."
        image="https://picsum.photos/seed/blog-hero/1920/1200"
      />
      <section className="section-wrap py-16 md:py-24">
        <div className="grid gap-6 md:grid-cols-3">
          {["How to choose an office in DFW", "Coworking vs private office", "Designing better team routines"].map(
            (title) => (
              <article key={title} className="rounded-2xl border border-[var(--gray-200)] p-6">
                <p className="text-xs uppercase tracking-[0.15em] text-[var(--text-muted)]">Article</p>
                <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-2xl">{title}</h2>
              </article>
            ),
          )}
        </div>
      </section>
    </div>
  );
}
