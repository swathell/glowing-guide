import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { FaqListSection } from "@/components/sections/faq-list";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers around service areas, booking, deposits, vehicle size rules, and weather scheduling."
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Clear answers around booking, size rules, deposits, and service expectations."
        body="The page is structured for grouped FAQ content now and schema expansion later."
      />
      <section className="py-20 md:py-28">
        <Container>
          <FaqListSection />
        </Container>
      </section>
    </>
  );
}
