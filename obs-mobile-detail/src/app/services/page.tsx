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
        title="A premium mobile auto services catalog with detailing still doing the trust-heavy lifting."
        body="OBS now needs to present detailing, oil changes, tire services, and extras in one coherent structure. This page is the reset point for that architecture."
      />
      <ServiceGridSection />
    </>
  );
}
