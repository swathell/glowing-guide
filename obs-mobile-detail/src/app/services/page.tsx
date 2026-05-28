import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceGridSection } from "@/components/sections/service-grid";

export const metadata: Metadata = {
  title: "Services",
  description: "Mobile detailing, oil change services, tire services, and extras across the GTA, presented in a cleaner premium structure."
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Choose the service family fast, then compare packages in a way that actually feels easy."
        body="Detailing leads with proof and visible results. Oil change and tire service stay practical and quick to scan. Extras stay modular, so the catalog feels premium instead of crowded."
      />
      <ServiceGridSection />
    </>
  );
}
