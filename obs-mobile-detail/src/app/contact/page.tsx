import type { Metadata } from "next";
import Link from "next/link";
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
      <section className="relative overflow-hidden border-b border-white/8 py-20 md:py-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_top_left,rgba(184,98,47,0.18),transparent_54%)]" />
        <Container>
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-3">
              <span className="obs-tag">Contact</span>
              <span className="obs-tag">Fast mobile service across the GTA</span>
            </div>
            <h1 className="display-title mt-6 text-obs-fog">Get a quote, check availability, or book your detail.</h1>
            <p className="copy-muted mt-6 max-w-3xl">
              Call, text, or send your details through the form. We typically respond within 30
              minutes during business hours and help you choose the right service for the vehicle.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
            </div>
          </div>
        </Container>
      </section>
      <section className="py-20 md:py-28">
        <Container className="content-grid">
          <div className="space-y-6 rounded-[1.9rem] border border-white/10 bg-white/[0.03] p-6 md:p-7">
            <div>
              <div className="flex flex-wrap gap-3">
                <span className="obs-tag">Tell us about your vehicle</span>
              </div>
              <p className="mt-5 text-lg text-obs-fog">Fast answers, clear next steps, and mobile service across the GTA.</p>
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
            <div className="obs-panel rounded-2xl p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-obs-sand/80">Serving</p>
              <p className="mt-3 text-sm leading-7 text-obs-fog/74">
                Toronto, Mississauga, Vaughan, Brampton, Markham, Richmond Hill, Oakville, North York, and Scarborough.
              </p>
            </div>
            <div className="obs-panel rounded-2xl p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-obs-sand/80">What happens next</p>
              <p className="mt-3 text-sm leading-7 text-obs-fog/74">
                Send your details, and we’ll confirm availability, pricing, or the best booking path for your vehicle.
              </p>
            </div>
          </div>
          <div className="obs-panel obs-performance-line rounded-[1.9rem] p-6 pt-8 md:p-7 md:pt-9">
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
