import { CtaBanner } from "@/components/sections/cta-banner";
import { GalleryStripSection } from "@/components/sections/gallery-strip";
import { HeroSection } from "@/components/sections/hero";
import { OperationalProofSection } from "@/components/sections/operational-proof";
import { ProcessSection } from "@/components/sections/process";
import { ServiceGridSection } from "@/components/sections/service-grid";
import { TestimonialsSection } from "@/components/sections/testimonials";

export default function Home() {
  return (
    <>
      <HeroSection />
      <OperationalProofSection />
      <ServiceGridSection />
      <GalleryStripSection />
      <TestimonialsSection />
      <ProcessSection />
      <CtaBanner />
    </>
  );
}
