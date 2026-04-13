import { PageHero } from "@/components/sections/PageHero";

async function submitLead() {
  "use server";
}

export default function ContactPage() {
  return (
    <div>
      <PageHero
        title="Let's find your perfect office"
        subtitle="Tell us what you need and we will match you with the right location."
        image="https://picsum.photos/seed/contact-hero/1920/1200"
      />
      <section className="section-wrap py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-lg">214-396-5305</p>
            <p className="text-[var(--gray-700)]">info@caddooffices.com</p>
          </div>
          <form action={submitLead} method="post" className="space-y-4 rounded-2xl border border-[var(--gray-200)] p-6">
            <label htmlFor="name" className="block text-sm">
              Name
            </label>
            <input id="name" name="name" autoComplete="name" className="w-full rounded-xl border border-[var(--gray-200)] p-3" placeholder="Jane Smith" />
            <label htmlFor="email" className="block text-sm">
              Email
            </label>
            <input id="email" name="email" type="email" autoComplete="email" className="w-full rounded-xl border border-[var(--gray-200)] p-3" placeholder="jane@company.com" />
            <label htmlFor="phone" className="block text-sm">
              Phone
            </label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" className="w-full rounded-xl border border-[var(--gray-200)] p-3" placeholder="214-000-0000" />
            <label htmlFor="message" className="block text-sm">
              Message
            </label>
            <textarea id="message" name="message" className="w-full rounded-xl border border-[var(--gray-200)] p-3" rows={4} placeholder="Tell us your office needs" />
            <button type="submit" className="rounded-full bg-[var(--red-accent)] px-6 py-3 text-white">
              Send Info
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
