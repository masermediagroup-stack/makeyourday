import Image from "next/image";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export default function PageHero({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
}: PageHeroProps) {
  return (
    <section className="relative min-h-[62dvh] overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(44,44,42,0.66),rgba(44,44,42,0.22),rgba(250,247,242,0.28))]" />
      <div className="relative mx-auto flex min-h-[62dvh] w-full max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.12em] text-white/80">{eyebrow}</p>
          <h1 className="mt-4 font-display text-5xl leading-none tracking-tight text-white md:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-white/90">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
