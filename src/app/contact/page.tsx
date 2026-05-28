import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";
import { TrackedAnchor } from "@/components/ui/tracked-anchor";

export const metadata: Metadata = {
  title: "Contact",
  description: "Call, text, or message OBS Mobile Detailing and confirm availability across the GTA."
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="A cleaner direct-contact surface for customers who want a fast answer."
        body="Call, text, or send an inquiry. The page stays intentionally short so booking and availability checks feel immediate."
      />
      <section className="py-20 md:py-28">
        <Container className="content-grid">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-obs-sand/80">Reach OBS</p>
            <div className="mt-6 space-y-4 text-lg text-obs-fog">
              <TrackedAnchor
                href={`tel:${siteConfig.phone}`}
                className="block"
                eventName="phone_clicked"
                metadata={{ placement: "contact_page" }}
              >
                {siteConfig.phone}
              </TrackedAnchor>
              <TrackedAnchor
                href={siteConfig.whatsappUrl}
                className="block"
                eventName="whatsapp_clicked"
                metadata={{ placement: "contact_page" }}
              >
                WhatsApp Us
              </TrackedAnchor>
              <p>{siteConfig.email}</p>
              <p>Serving {siteConfig.areas.join(", ")}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-obs-sand/80">Inquiry Form Placeholder</p>
            <p className="mt-4 text-sm leading-7 text-obs-fog/72">
              The shell intentionally leaves the simple contact form and the multi-step booking flow
              as separate experiences. That keeps support questions from becoming fake bookings.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
