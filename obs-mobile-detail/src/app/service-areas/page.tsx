import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { serviceAreas } from "@/data/areas";

export const metadata: Metadata = {
  title: "Service Areas",
  description: "Service area pages and local SEO coverage for key GTA locations."
};

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Service Areas"
        title="Regional positioning first, city pages where they actually help."
        body="The site shell supports a GTA-wide homepage plus dedicated area pages for the markets that matter most."
      />
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {serviceAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/service-areas/${area.slug}`}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-6 transition hover:bg-white/[0.05]"
              >
                <h2 className="font-display text-3xl text-obs-fog">{area.name}</h2>
                <p className="mt-3 text-sm leading-7 text-obs-fog/72">
                  Structured local page for {area.name} with room for location-specific proof and FAQ.
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
