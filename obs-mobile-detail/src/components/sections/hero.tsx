import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/8 bg-[#0b0d10]">
      <Image
        src="/images/gallery/obsmb.jpg"
        alt="OBS mobile detailing hero"
        fill
        priority
        className="scale-[1.18] object-cover object-center opacity-62 transition-transform duration-1000"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,9,11,0.985)_0%,rgba(7,9,11,0.94)_33%,rgba(7,9,11,0.58)_60%,rgba(7,9,11,0.18)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,11,14,0.36)_0%,rgba(9,11,14,0.14)_24%,rgba(9,11,14,0.34)_58%,rgba(9,11,14,0.94)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_28%,rgba(142,164,189,0.16),transparent_28%),radial-gradient(circle_at_30%_42%,rgba(184,98,47,0.18),transparent_20%),radial-gradient(circle_at_78%_26%,rgba(78,112,145,0.12),transparent_18%)]" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/[0.045] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[#0b0d10] via-[#0b0d10]/92 to-transparent" />
      <Container className="relative grid min-h-[calc(100svh-4rem)] items-end py-16 md:py-24 xl:py-28">
        <div className="grid gap-12 xl:grid-cols-[1.08fr_0.92fr] xl:items-end">
          <div className="max-w-3xl pb-2">
            <p className="eyebrow">Mobile detailing across the GTA</p>
            <h1 className="mt-5 max-w-5xl font-display text-5xl leading-[0.92] text-obs-fog md:text-7xl xl:text-[5.8rem]">
              Premium Mobile Car Detailing Across the GTA
            </h1>
            <p className="copy-muted mt-7 max-w-lg text-[1.03rem] leading-7 md:text-xl">
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
            <div className="mt-10 max-w-2xl space-y-4 border-t border-white/10 pt-6">
              <p className="text-sm uppercase tracking-[0.18em] text-obs-fog/82">
                Serving Toronto • Mississauga • Vaughan • Brampton • Markham
              </p>
              <p className="text-sm uppercase tracking-[0.18em] text-obs-fog/82">
                Fully Mobile Service • Same-Day Availability • Professional Interior & Exterior
                Detailing
              </p>
              <p className="text-base text-obs-fog/90">★★★★★ Trusted by drivers across the GTA</p>
            </div>
          </div>

          <div className="grid gap-4 self-end sm:grid-cols-3 xl:grid-cols-1">
            <div className="rounded-[1.4rem] border border-white/12 bg-[linear-gradient(180deg,rgba(0,0,0,0.24),rgba(0,0,0,0.34))] p-5 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.22em] text-obs-sand/84">Mobile service</p>
              <p className="mt-4 font-display text-[2rem] leading-tight text-obs-fog">
                We come to your home, condo, office, or business.
              </p>
            </div>
            <div className="rounded-[1.4rem] border border-white/12 bg-[linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.3))] p-5 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.22em] text-obs-sand/84">Professional results</p>
              <p className="mt-4 text-sm leading-7 text-obs-fog/80">
                Interior and exterior detailing done at your location with professional care and
                clean results.
              </p>
            </div>
            <div className="rounded-[1.4rem] border border-white/12 bg-[linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.3))] p-5 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.22em] text-obs-sand/84">Fast booking</p>
              <div className="mt-4 space-y-3 text-sm text-obs-fog/80">
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
