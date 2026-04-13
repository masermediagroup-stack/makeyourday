import { PageHero } from "@/components/sections/PageHero";

const faqs = [
  "How quickly can I move in?",
  "Are memberships month-to-month?",
  "Can I use multiple Caddo locations?",
  "Do you have conference room credits included?",
  "Can I receive business mail at Caddo?",
];

export default function FAQPage() {
  return (
    <div>
      <PageHero
        title="Frequently asked questions"
        subtitle="Everything you need to know about memberships, pricing, and locations."
        image="https://picsum.photos/seed/faq-hero/1920/1200"
      />
      <section className="section-wrap py-16 md:py-24">
        <div className="space-y-4">
          {faqs.map((question) => (
            <details key={question} className="rounded-2xl border border-[var(--gray-200)] p-5">
              <summary className="cursor-pointer font-medium">{question}</summary>
              <p className="mt-3 text-sm text-[var(--gray-700)]">
                Our team can help you compare plans and location availability in a short call or
                in-person tour.
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
