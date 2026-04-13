import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Services from "@/components/Services";
import { navLinks, services } from "@/lib/site-data";

const serviceDetails = [
  {
    title: "Estate lawn care",
    summary:
      "Weekly mowing, edge definition, soil conditioning, and seasonal turf nutrition.",
  },
  {
    title: "Custom landscape architecture",
    summary:
      "Site planning with plant palettes, grading strategy, and material selections.",
  },
  {
    title: "Water-smart irrigation",
    summary:
      "Zone mapping, drip retrofits, and controller programming for Texas weather swings.",
  },
  {
    title: "Lighting and evening ambiance",
    summary:
      "Layered path, uplight, and architectural fixtures with discreet installation.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar links={navLinks} />
      <main>
        <PageHero
          eyebrow="Services"
          title="DFW landscaping services tailored to your property."
          description="We combine editorial-grade planting design with reliable weekly maintenance so your grounds stay composed year-round."
          imageSrc="/photos/naoki-suzuki-uqgYI_730jE-unsplash.jpg"
          imageAlt="TexasGrounds team shaping premium front-yard landscaping"
        />

        <Services services={services} />

        <section className="bg-background py-16 md:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-4xl tracking-tight text-textPrimary md:text-5xl">
              Scope and delivery
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              {serviceDetails.map((item) => (
                <article key={item.title} className="rounded-3xl bg-cream p-7">
                  <h3 className="font-display text-3xl tracking-tight text-textPrimary">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-[58ch] text-base leading-relaxed text-textMuted">
                    {item.summary}
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
