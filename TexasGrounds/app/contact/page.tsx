import CTABanner from "@/components/CTABanner";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import { navLinks, services } from "@/lib/site-data";

export default function ContactPage() {
  return (
    <>
      <Navbar links={navLinks} />
      <main>
        <PageHero
          eyebrow="Contact"
          title="Tell us about your property and project goals."
          description="Share the scope, preferred services, and timing. We will respond with a tailored quote and next steps."
          imageSrc="/photos/joan-gammie-43VbqujuQC8-unsplash.jpg"
          imageAlt="Landscaping team reviewing plans near a premium lawn and garden"
        />

        <section className="bg-background py-16 md:py-24">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[1.35fr_1fr] lg:px-8">
            <ContactForm services={services} />

            <aside className="rounded-3xl border border-textPrimary/10 bg-background p-8">
              <p className="text-xs uppercase tracking-[0.12em] text-textMuted">
                Inquiry dashboard
              </p>
              <h3 className="mt-4 font-display text-3xl tracking-tight text-textPrimary">
                Request snapshot
              </h3>
              <div className="mt-6 space-y-4 text-sm">
                <div className="rounded-2xl bg-cream p-4">
                  <p className="text-textMuted">Response window</p>
                  <p className="mt-1 font-semibold text-textPrimary">Within 1 business day</p>
                </div>
                <div className="rounded-2xl bg-cream p-4">
                  <p className="text-textMuted">Service area</p>
                  <p className="mt-1 font-semibold text-textPrimary">
                    Dallas, Fort Worth, Frisco, Allen, Southlake
                  </p>
                </div>
                <div className="rounded-2xl bg-cream p-4">
                  <p className="text-textMuted">Phone</p>
                  <a href="tel:+13128471928" className="mt-1 block font-semibold text-textPrimary">
                    +1 (312) 847-1928
                  </a>
                </div>
                <div className="rounded-2xl bg-cream p-4">
                  <p className="text-textMuted">Email</p>
                  <a
                    href="mailto:hello@texasgrounds.com"
                    className="mt-1 block font-semibold text-textPrimary"
                  >
                    hello@texasgrounds.com
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
