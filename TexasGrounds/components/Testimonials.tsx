type Testimonial = {
  quote: string;
  name: string;
  neighborhood: string;
};

type TestimonialsProps = {
  items: Testimonial[];
};

export default function Testimonials({ items }: TestimonialsProps) {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-background py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="testimonials-heading"
          className="font-display text-4xl tracking-tight text-textPrimary md:text-5xl"
        >
          What Clients Say
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((item) => (
            <figure
              key={item.name}
              className="rounded-3xl border-l-4 border-terracotta bg-cream p-7"
            >
              <blockquote className="font-display text-2xl italic leading-relaxed text-textPrimary">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-5 text-sm text-textMuted">
                <span className="font-semibold text-textPrimary">{item.name}</span>
                {" · "}
                {item.neighborhood}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
