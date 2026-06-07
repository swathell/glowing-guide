import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

const heroServices = [
  "Mobile Detailing",
  "Interior Detailing",
  "Paint Correction",
  "Ceramic Coating",
  "Headlight Restore",
  "Odor Removal"
];

const proofItems = [
  { value: "100+", label: "Vehicles serviced" },
  { value: "9", label: "GTA areas covered" },
  { value: "$99", label: "Starting detail" }
];

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
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,9,11,0.99)_0%,rgba(7,9,11,0.95)_36%,rgba(7,9,11,0.63)_66%,rgba(7,9,11,0.22)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,11,14,0.28)_0%,rgba(9,11,14,0.12)_24%,rgba(9,11,14,0.36)_58%,rgba(9,11,14,0.96)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_26%_31%,rgba(184,98,47,0.24),transparent_24%),radial-gradient(circle_at_80%_22%,rgba(184,98,47,0.13),transparent_18%)]" />
      <div className="absolute left-0 top-[23%] h-px w-[62%] rotate-[-8deg] bg-gradient-to-r from-transparent via-obs-copper/70 to-transparent" />
      <div className="hero-glow hero-glow-copper absolute left-[18%] top-[20%] h-52 w-52 rounded-full blur-3xl" />
      <div className="hero-glow hero-glow-blue absolute right-[8%] top-[12%] h-64 w-64 rounded-full blur-3xl" />
      <div className="hero-vignette absolute inset-0" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/[0.045] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[#0b0d10] via-[#0b0d10]/92 to-transparent" />
      <Container className="relative grid min-h-[calc(100svh-4rem)] items-end py-14 md:py-20 xl:py-24">
        <div className="grid gap-10 xl:grid-cols-[1.05fr_0.95fr] xl:items-end">
          <div className="max-w-3xl pb-2">
            <div className="flex flex-wrap gap-3">
              <span className="obs-tag">Mobile detailing across the GTA</span>
              <span className="obs-tag">Packages from $99.99</span>
            </div>
            <h1 className="mt-6 max-w-5xl font-display text-5xl leading-[0.9] text-obs-fog [text-wrap:balance] md:text-7xl xl:text-[6.15rem]">
              Mobile detailing that shows up ready to work.
            </h1>
            <p className="copy-muted mt-8 max-w-xl text-[1.03rem] leading-7 md:text-[1.18rem]">
              Interior resets, exterior detailing, paint care, and add-ons brought directly to
              your home, condo, office, or business across the GTA.
            </p>
            <div className="mt-7 grid max-w-3xl grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {heroServices.map((service) => (
                <Link key={service} href="/services" className="obs-service-chip text-sm">
                  <span>{service}</span>
                  <span className="text-obs-copper">↗</span>
                </Link>
              ))}
            </div>
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
                Fully Mobile Service • Same-Day Availability • Interior & Exterior Detailing
              </p>
            </div>
          </div>

          <div className="grid gap-4 self-end">
            <div className="obs-panel-dark obs-performance-line rounded-[1.4rem] p-5 pt-8 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.22em] text-obs-sand/84">Most booked</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
                <div>
                  <p className="font-display text-3xl text-obs-fog">Basic Interior</p>
                  <p className="obs-price mt-1 text-sm font-semibold uppercase tracking-[0.16em]">From $99.99</p>
                </div>
                <div>
                  <p className="font-display text-3xl text-obs-fog">Complete Detail</p>
                  <p className="obs-price mt-1 text-sm font-semibold uppercase tracking-[0.16em]">From $249.99</p>
                </div>
                <div>
                  <p className="font-display text-3xl text-obs-fog">Premium Detail</p>
                  <p className="obs-price mt-1 text-sm font-semibold uppercase tracking-[0.16em]">From $299.99</p>
                </div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {proofItems.map((item) => (
                <div key={item.label} className="obs-panel-dark rounded-[1.4rem] p-5 backdrop-blur-md">
                  <p className="font-display text-4xl text-obs-fog">{item.value}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-obs-sand/80">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="obs-panel-dark rounded-[1.4rem] p-5 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.22em] text-obs-sand/84">Service flow</p>
              <div className="mt-4 grid gap-3 text-sm text-obs-fog/80 sm:grid-cols-3">
                <p>Choose the package</p>
                <p>Confirm the vehicle</p>
                <p>OBS comes to you</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
