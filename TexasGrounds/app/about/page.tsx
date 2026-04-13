import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import StatStrip from "@/components/StatStrip";
import { navLinks, stats, testimonials } from "@/lib/site-data";

const values = [
  {
    name: "Design with regional intent",
    detail:
      "Every planting and material choice is selected for North Texas heat, wind, and water realities.",
  },
  {
    name: "Maintain with craftsmanship",
    detail:
      "Our teams keep structure and detail sharp through weekly standards and seasonal planning.",
  },
  {
    name: "Communicate clearly",
    detail:
      "You get proactive updates, punctual service windows, and accountable follow-through.",
  },
];

export default function AboutPage() {
  const featuredTestimonial = testimonials[0];

  return (
    <>
      <Navbar links={navLinks} />
      <main>
        <PageHero
          eyebrow="About"
          title="A Texas crew focused on long-term landscape quality."
          description="TexasGrounds was built for homeowners and property teams that need design precision and consistent maintenance at premium standards."
          imageSrc="/photos/claude-laprise-_GvVDmvh81I-unsplash.jpg"
          imageAlt="TexasGrounds crew planning a high-end landscape installation"
        />

        <section className="bg-background py-16 md:py-24">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:px-8">
            <article className="rounded-3xl bg-cream p-8">
              <h2 className="font-display text-4xl tracking-tight text-textPrimary md:text-5xl">
                Rooted in Texas. Built to Last.
              </h2>
              <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-textMuted">
                Our work balances ranch-inspired openness with refined, editorial
                planting compositions. We plan for longevity from day one, then we
                maintain the property with the same care that shaped the design.
              </p>
            </article>

            <article className="rounded-3xl bg-cream p-8">
              <p className="text-xs uppercase tracking-[0.12em] text-textMuted">
                Client voices
              </p>
              {featuredTestimonial ? (
                <>
                  <p className="mt-4 font-display text-2xl italic leading-relaxed text-textPrimary">
                    “{featuredTestimonial.quote}”
                  </p>
                  <p className="mt-4 text-sm text-textMuted">
                    {featuredTestimonial.name}, {featuredTestimonial.neighborhood}
                  </p>
                </>
              ) : (
                <p className="mt-4 text-sm text-textMuted">
                  Client stories are being curated for this page.
                </p>
              )}
            </article>
          </div>
        </section>

        <StatStrip stats={stats} />

        <section className="bg-background py-16 md:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-4xl tracking-tight text-textPrimary md:text-5xl">
              How we operate
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {values.map((value) => (
                <article key={value.name} className="rounded-3xl bg-cream p-7">
                  <h3 className="font-display text-3xl tracking-tight text-textPrimary">
                    {value.name}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-textMuted">
                    {value.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
