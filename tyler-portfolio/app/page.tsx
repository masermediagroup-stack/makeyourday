import { FeaturedGrid } from "@/components/sections/FeaturedGrid";
import { HomeHero } from "@/components/sections/HomeHero";
import { HomeFooter } from "@/components/sections/HomeFooter";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <FeaturedGrid />
      <HomeFooter />
    </>
  );
}
