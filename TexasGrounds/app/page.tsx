import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import StatStrip from "@/components/StatStrip";
import Testimonials from "@/components/Testimonials";
import { navLinks, projects, services, stats, testimonials } from "@/lib/site-data";

export default function Home() {
  return (
    <>
      <Navbar links={navLinks} />
      <main>
        <Hero imageSrc="/photos/michael-smith-bsld7GjQwjI-unsplash.jpg" />
        <Services services={services} />
        <StatStrip stats={stats} />
        <Portfolio projects={projects.slice(0, 3)} />
        <Testimonials items={testimonials} />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
