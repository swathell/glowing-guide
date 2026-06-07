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
        className="hero-image scale-[1.2] object-cover object-center opacity-[0.66]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,9,11,0.985)_0%,rgba(7,9,11,0.94)_33%,rgba(7,9,11,0.58)_60%,rgba(7,9,11,0.18)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,11,14,0.36)_0%,rgba(9,11,14,0.14)_24%,rgba(9,11,14,0.34)_58%,rgba(9,11,14,0.94)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_28%,rgba(142,164,189,0.16),transparent_28%),radial-gradient(circle_at_30%_42%,rgba(184,98,47,0.18),transparent_20%),radial-gradient(circle_at_78%_26%,rgba(78,112,145,0.12),transparent_18%)]" />
      <div className="hero-glow hero-glow-copper absolute left-[18%] top-[20%] h-52 w-52 rounded-full blur-3xl" />
      <div className="hero-glow hero-glow-blue absolute right-[8%] top-[12%] h-64 w-64 rounded-full blur-3xl" />
      <div className="hero-vignette absolute inset-0" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/[0.045] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[#0b0d10] via-[#0b0d10]/92 to-transparent" />
      <Container className="relative grid min-h-[calc(100svh-4rem)] items-end py-16 md:py-24 xl:py-28">
        <div className="grid gap-12 xl:grid-cols-[1.08fr_0.92fr] xl:items-end">
          <div className="max-w-3xl pb-2">
            <div className="flex flex-wrap gap-3">
              <span className="obs-tag">Mobile detailing across the GTA</span>
              <span className="obs-tag">Interior • Exterior • Full Reset</span>
            </div>
            <h1 className="mt-6 max-w-5xl font-display text-5xl leading-[0.88] text-obs-fog [text-wrap:balance] md:text-7xl xl:text-[6.4rem]">
              Premium mobile detailing with real transformation built in.
            </h1>
            <p className="copy-muted mt-8 max-w-xl text-[1.03rem] leading-7 md:text-[1.18rem]">
              OBS brings interior resets, exterior restoration, and full-vehicle care directly to
              your home, condo, office, or business across the GTA.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/book" className="button-primary">
                Book Mobile Detailing
              </Link>
              <a href={`tel:${siteConfig.phone}`} className="button-secondary">
                Call or Text
              </a>
            </div>
            <div className="mt-12 max-w-2xl space-y-4 border-t border-white/10 pt-7">
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
            <div className="obs-panel-dark obs-performance-line rounded-[1.4rem] p-5 pt-8 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.22em] text-obs-sand/84">Transformation first</p>
              <p className="mt-4 font-display text-[2rem] leading-tight text-obs-fog">
                Built for dull paint, tired interiors, and vehicles that need to feel sharp again.
              </p>
            </div>
            <div className="obs-panel-dark rounded-[1.4rem] p-5 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.22em] text-obs-sand/84">Mobile service</p>
              <p className="mt-4 text-sm leading-7 text-obs-fog/80">
                We come to your home, condo, office, or business with a service flow built to feel
                quick, professional, and easy to trust.
              </p>
            </div>
            <div className="obs-panel-dark rounded-[1.4rem] p-5 backdrop-blur-md">
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
