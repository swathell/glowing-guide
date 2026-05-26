import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceGridSection } from "@/components/sections/service-grid";

export const metadata: Metadata = {
  title: "Services",
  description: "Interior, full detail, ceramic, paint correction, and specialty vehicle services across the GTA."
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="A clear service catalog built for growth, not confusion."
        body="The shell supports broad service depth while keeping each category organized for content, booking logic, and local SEO."
      />
      <ServiceGridSection />
    </>
  );
}
