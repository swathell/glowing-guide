import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/8">
      <Image
        src="/images/gallery/hero-detailing.png"
        alt="OBS mobile detailing hero"
        fill
        priority
        className="object-cover object-center opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f1214] via-[#0f1214]/85 to-[#0f1214]/30" />
      <Container className="relative grid min-h-[calc(100svh-4rem)] items-end py-16 md:py-20">
        <div className="max-w-3xl">
          <p className="eyebrow">Professional mobile detailing across the GTA</p>
          <h1 className="display-title mt-5 max-w-4xl text-obs-fog">
            Premium car care delivered to your home, condo, office, or business.
          </h1>
          <p className="copy-muted mt-6 max-w-2xl">
            Interior detailing, full details, ceramic protection, paint correction, and specialty
            vehicle service with clear booking paths and real proof of work.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/book" className="button-primary">
              Book Online
            </Link>
            <a href={`tel:${siteConfig.phone}`} className="button-secondary">
              Call or Text
            </a>
          </div>
          <p className="mt-6 text-sm text-obs-fog/66">
            Serving {siteConfig.areas.join(", ")} and nearby areas.
          </p>
        </div>
      </Container>
    </section>
  );
}
