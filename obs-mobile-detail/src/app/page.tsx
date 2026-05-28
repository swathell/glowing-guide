import { CtaBanner } from "@/components/sections/cta-banner";
import { GalleryStripSection } from "@/components/sections/gallery-strip";
import { HeroSection } from "@/components/sections/hero";
import { ProcessSection } from "@/components/sections/process";
import { ServiceGridSection } from "@/components/sections/service-grid";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServiceGridSection />
      <GalleryStripSection />
      <TestimonialsSection />
      <ProcessSection />
      <CtaBanner />
    </>
  );
}
