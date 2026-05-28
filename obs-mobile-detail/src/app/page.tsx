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
      <section className="border-b border-white/8 bg-black/25 py-5">
        <Container>
          <div className="flex flex-col gap-3 text-sm uppercase tracking-[0.18em] text-obs-fog/78 md:flex-row md:flex-wrap md:items-center md:justify-between">
            <p>Serving Toronto • Mississauga • Vaughan • Brampton • Markham</p>
            <p>Fully Mobile Service • Fast Booking • Professional Results</p>
          </div>
        </Container>
      </section>
      <ServiceGridSection />
      <GalleryStripSection />
      <TestimonialsSection />
      <ProcessSection />
      <CtaBanner />
    </>
  );
}
