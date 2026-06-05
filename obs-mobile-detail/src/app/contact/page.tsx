import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";
import { TrackedAnchor } from "@/components/ui/tracked-anchor";
import { ContactInquiryForm } from "@/components/contact/contact-inquiry-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Call, text, or message OBS Mobile Detailing and confirm availability across the GTA."
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get a Quote or Book Mobile Detailing"
        body="Call, text, or send an inquiry. We typically respond within 30 minutes during business hours."
        actions={
          <>
            <TrackedAnchor
              href={`tel:${siteConfig.phone}`}
              className="button-primary"
              eventName="phone_clicked"
              metadata={{ placement: "contact_hero" }}
            >
              {siteConfig.phone}
            </TrackedAnchor>
            <Link href="/book" className="button-secondary">
              Book Your Mobile Detail
            </Link>
          </>
        }
      />
      <section className="py-20 md:py-28">
        <Container className="content-grid">
          <div className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-obs-sand/80">Tell Us About Your Vehicle</p>
              <p className="mt-4 text-lg text-obs-fog">Fast answers, clear next steps, and mobile service across the GTA.</p>
            </div>
            <div className="space-y-4 text-lg text-obs-fog">
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
            </div>
            <div className="rounded-2xl border border-white/8 bg-black/15 p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-obs-sand/80">Serving</p>
              <p className="mt-3 text-sm leading-7 text-obs-fog/74">
                Toronto, Mississauga, Vaughan, Brampton, Markham, Richmond Hill, Oakville, North York, and Scarborough.
              </p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-black/15 p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-obs-sand/80">What happens next</p>
              <p className="mt-3 text-sm leading-7 text-obs-fog/74">
                Send your details, and we’ll confirm availability, pricing, or the best booking path for your vehicle.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-obs-sand/80">Request a Quote</p>
            <p className="mt-4 text-sm leading-7 text-obs-fog/72">
              Use the form for quotes, questions, or availability checks. If you already know the package you want, booking online is even faster.
            </p>
            <div className="mt-6">
              <ContactInquiryForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
