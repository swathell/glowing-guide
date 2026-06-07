import type { Metadata } from "next";
import Link from "next/link";
import { ServiceGridSection } from "@/components/sections/service-grid";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description: "Mobile detailing packages, starting prices, oil change services, tire services, and detailing add-ons across the GTA."
};

const serviceSignals = [
  "Mobile Detailing",
  "Interior Detailing",
  "Exterior Detailing",
  "Paint Protection",
  "Oil Changes",
  "Tire Services",
  "Pet Hair Removal",
  "Odor Removal"
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/8 py-20 md:py-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_top_left,rgba(184,98,47,0.18),transparent_55%)]" />
        <Container>
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-3">
              <span className="obs-tag">Services & Pricing</span>
              <span className="obs-tag">Starting prices visible upfront</span>
            </div>
            <h1 className="display-title mt-6 text-obs-fog">
              Clear packages for the work your vehicle actually needs.
            </h1>
            <p className="copy-muted mt-6 max-w-3xl">
              Compare detailing packages, maintenance services, and targeted add-ons without
              hunting through the site. Start with the right service, then book or call for the
              details that depend on condition.
            </p>
            <div className="mt-7 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {serviceSignals.map((service) => (
                <Link key={service} href="/services" className="obs-service-chip text-sm">
                  <span>{service}</span>
                </Link>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/book" className="button-primary">
                Book A Service
              </Link>
              <a href={`tel:${siteConfig.phone}`} className="button-secondary">
                Call {siteConfig.phone}
              </a>
            </div>
          </div>
        </Container>
      </section>
      <ServiceGridSection />
    </>
  );
}
