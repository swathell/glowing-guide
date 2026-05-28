import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/8 bg-[#0f1214]">
      <Image
        src="/images/gallery/hero-detailing.png"
        alt="OBS mobile detailing hero"
        fill
        priority
        className="object-cover object-center opacity-45"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,12,14,0.96)_0%,rgba(9,12,14,0.88)_42%,rgba(9,12,14,0.34)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(184,98,47,0.18),transparent_34%)]" />
      <Container className="relative grid min-h-[calc(100svh-4rem)] items-end py-14 md:py-20">
        <div className="grid gap-10 xl:grid-cols-[1.15fr_0.85fr] xl:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow">Mobile detailing across the GTA</p>
            <h1 className="display-title mt-5 max-w-4xl text-obs-fog">
              Premium Mobile Car Detailing Across the GTA
            </h1>
            <p className="copy-muted mt-6 max-w-xl">
              Professional interior and exterior detailing delivered directly to your home, condo,
              or office.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/book" className="button-primary">
                Book Mobile Detailing
              </Link>
              <a href={`tel:${siteConfig.phone}`} className="button-secondary">
                Call or Text
              </a>
            </div>
            <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
              <p className="text-sm uppercase tracking-[0.18em] text-obs-fog/78">
                Serving Toronto • Mississauga • Vaughan • Brampton • Markham
              </p>
              <p className="text-sm uppercase tracking-[0.18em] text-obs-fog/78">
                Fully Mobile Service • Same-Day Availability • Professional Interior & Exterior
                Detailing
              </p>
              <p className="text-base text-obs-fog/88">★★★★★ Trusted by drivers across the GTA</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            <div className="rounded-2xl border border-white/12 bg-black/30 p-5 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.22em] text-obs-sand/80">Mobile service</p>
              <p className="mt-4 font-display text-3xl text-obs-fog">We come to your home, condo, office, or business.</p>
            </div>
            <div className="rounded-2xl border border-white/12 bg-black/22 p-5 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.22em] text-obs-sand/80">Professional results</p>
              <p className="mt-4 text-sm leading-7 text-obs-fog/78">
                Interior and exterior detailing done at your location with professional care and
                clean results.
              </p>
            </div>
            <div className="rounded-2xl border border-white/12 bg-black/22 p-5 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.22em] text-obs-sand/80">Fast booking</p>
              <div className="mt-4 space-y-3 text-sm text-obs-fog/78">
                <p>Choose your package.</p>
                <p>Pick a time that works.</p>
                <p>We come to you.</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
