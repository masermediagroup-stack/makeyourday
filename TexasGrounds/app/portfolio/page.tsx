import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Portfolio from "@/components/Portfolio";
import { navLinks, projects } from "@/lib/site-data";

export default function PortfolioPage() {
  return (
    <>
      <Navbar links={navLinks} />
      <main>
        <PageHero
          eyebrow="Portfolio"
          title="Landscapes designed and maintained across DFW."
          description="A selection of residential grounds where structure, planting, and long-term care come together."
          imageSrc="/photos/naoki-suzuki-ZuaCKSnNlFI-unsplash.jpg"
          imageAlt="Completed luxury landscape project in the DFW area"
        />

        <Portfolio projects={projects} />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
