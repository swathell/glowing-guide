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
        <Container className="grid gap-4 md:grid-cols-3 md:items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-obs-sand/80">GTA-wide mobile service</p>
            <p className="mt-2 text-sm leading-6 text-obs-fog/72">
              Home driveway, condo parking, office lot, or business address across {siteConfig.areas.slice(0, 4).join(", ")} and nearby areas.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-obs-sand/80">Clear booking lanes</p>
            <p className="mt-2 text-sm leading-6 text-obs-fog/72">
              Standard jobs move fast. Deposit-required and specialty work stay organized instead of feeling blocked.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-obs-sand/80">Proof-led trust</p>
            <p className="mt-2 text-sm leading-6 text-obs-fog/72">
              Real gallery images, service-specific reviews, and short educational reads do more convincing than generic promises.
            </p>
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
