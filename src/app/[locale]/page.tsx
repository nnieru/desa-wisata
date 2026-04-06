import { PageShell } from "@/components/layout/page-shell";
import { FeaturedDestinations } from "@/features/home/components/featured-destinations";
import { HeroSection } from "@/features/home/components/hero-section";
import { PopularExperiences } from "@/features/home/components/popular-experiences";
import { WhyChooseUs } from "@/features/home/components/why-choose-us";

export default function HomePage() {
  return (
    <PageShell>
      <div className="space-y-20 pb-20 sm:space-y-24">
        <HeroSection />
        <FeaturedDestinations />
        <PopularExperiences />
        <WhyChooseUs />
      </div>
    </PageShell>
  );
}
