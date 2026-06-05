import type { Metadata } from "next";
import Link from "next/link";
import { ServiceGridSection } from "@/components/sections/service-grid";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Mobile detailing, oil change services, tire services, and extras across the GTA, presented in a cleaner premium structure."
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/8 py-20 md:py-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_top_left,rgba(184,98,47,0.18),transparent_55%)]" />
        <Container>
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-3">
              <span className="obs-tag">Services</span>
              <span className="obs-tag">Mobile care built around condition</span>
            </div>
            <h1 className="display-title mt-6 text-obs-fog">
              From fast maintenance to full vehicle transformation.
            </h1>
            <p className="copy-muted mt-6 max-w-3xl">
              OBS is built around the work most drivers actually need: deep interior detailing,
              sharper exterior presentation, practical maintenance, and targeted add-ons that
              finish the job properly.
            </p>
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
