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
            <p className="eyebrow">Premium mobile auto care across the GTA</p>
            <h1 className="display-title mt-5 max-w-4xl text-obs-fog">
              Detailing that looks premium, maintenance that feels effortless.
            </h1>
            <p className="copy-muted mt-6 max-w-2xl">
              Book mobile detailing, oil changes, tire services, and high-value add-ons without
              giving up your driveway, your office parking spot, or half your day.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/book" className="button-primary">
                Book Online
              </Link>
              <a href={`tel:${siteConfig.phone}`} className="button-secondary">
                Call or Text
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-obs-fog/74">
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-2">
                Mobile detailing
              </span>
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-2">
                Oil changes
              </span>
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-2">
                Tire services
              </span>
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-2">
                GTA-wide
              </span>
            </div>
            <p className="mt-6 max-w-2xl text-sm text-obs-fog/66">
              Serving {siteConfig.areas.join(", ")} with direct-book detailing, practical
              maintenance support, and controlled review paths for larger jobs.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            <div className="rounded-2xl border border-white/12 bg-black/30 p-5 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.22em] text-obs-sand/80">Why people book</p>
              <p className="mt-4 font-display text-3xl text-obs-fog">At-home convenience without a shop-day detour.</p>
            </div>
            <div className="rounded-2xl border border-white/12 bg-black/22 p-5 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.22em] text-obs-sand/80">Proof first</p>
              <p className="mt-4 text-sm leading-7 text-obs-fog/78">
                Real detailing images, clear package starting points, and a booking flow that
                separates routine jobs from work that needs a second look.
              </p>
            </div>
            <div className="rounded-2xl border border-white/12 bg-black/22 p-5 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.22em] text-obs-sand/80">Fast action paths</p>
              <div className="mt-4 space-y-3 text-sm text-obs-fog/78">
                <p>Book standard detailing online.</p>
                <p>Call for maintenance scheduling.</p>
                <p>Send specialty work into guided review.</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
