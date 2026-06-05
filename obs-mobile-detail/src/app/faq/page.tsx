import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { FaqListSection } from "@/components/sections/faq-list";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Searchable answers about booking, pricing, service areas, deposits, and what to expect from mobile detailing."
};

export default function FaqPage() {
  return (
    <>
      <section className="border-b border-white/8 py-20 md:py-28">
        <Container>
          <div className="max-w-3xl">
            <p className="eyebrow">Frequently Asked Questions</p>
            <h1 className="display-title mt-4 text-obs-fog">Have Questions?</h1>
            <p className="copy-muted mt-6 max-w-2xl">
              Get quick answers about pricing, service areas, booking, and what to expect
              before your appointment.
            </p>
          </div>
        </Container>
      </section>
      <section className="py-16 md:py-24">
        <Container>
          <FaqListSection />
        </Container>
      </section>
    </>
  );
}
