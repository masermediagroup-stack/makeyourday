import Image from "next/image";

export function PageHero({
  title,
  subtitle,
  image,
  accent = "var(--blue-deep)",
}: {
  title: string;
  subtitle: string;
  image: string;
  accent?: string;
}) {
  return (
    <section className="relative min-h-[55dvh] overflow-hidden text-white">
      <Image src={image} alt={title} fill className="object-cover" />
      <div className="absolute inset-0" style={{ background: `linear-gradient(120deg, ${accent}dd, #00000066)` }} />
      <div className="section-wrap relative py-24 md:py-32">
        <h1 className="max-w-4xl font-[family-name:var(--font-playfair)] text-4xl md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-base text-white/90 md:text-xl">{subtitle}</p>
      </div>
    </section>
  );
}
