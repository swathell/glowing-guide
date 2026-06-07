import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ContactInquiryForm } from "@/components/contact/contact-inquiry-form";
import { TrackedAnchor } from "@/components/ui/tracked-anchor";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Call, text, book, or request a quote from OBS Mobile Detailing across the GTA."
};

const methods = [
  { label: "Call Now", value: siteConfig.phone, href: `tel:${siteConfig.phone}`, event: "phone_clicked" },
  { label: "Text / WhatsApp", value: "Message OBS", href: siteConfig.whatsappUrl, event: "whatsapp_clicked" },
  { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}`, event: "email_clicked" }
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-obs-copper/35 bg-[#070809] py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,103,24,0.32),transparent_32%)]" />
        <Container className="relative">
          <div className="max-w-5xl">
            <div className="flex flex-wrap gap-2">
              <span className="obs-tag">Call</span>
              <span className="obs-tag">Text</span>
              <span className="obs-tag">Book Online</span>
              <span className="obs-tag">Request Quote</span>
            </div>
            <h1 className="display-title mt-6 text-obs-fog">
              Contact OBS For Mobile Detailing Across The GTA
            </h1>
            <p className="copy-muted mt-6 max-w-3xl">
              Get pricing, confirm availability, ask about condition flags, or book your mobile
              detail. Response-time expectation: fast replies during business hours.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-5">
              {methods.map((method) => (
                <TrackedAnchor
                  key={method.label}
                  href={method.href}
                  className="owner-card flex items-center justify-between rounded-xl p-5"
                  eventName={method.event}
                  metadata={{ placement: "contact_methods" }}
                >
                  <span>
                    <span className="owner-kicker">{method.label}</span>
                    <span className="mt-2 block text-2xl font-black uppercase text-white">{method.value}</span>
                  </span>
                  <span className="owner-icon">→</span>
                </TrackedAnchor>
              ))}
              <Link href="/book" className="button-primary w-full py-4">
                Book Online Now
              </Link>
              <div className="owner-card rounded-xl p-5">
                <p className="owner-kicker">Service Areas</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[...siteConfig.areas, "Etobicoke", "Milton", "Burlington"].map((area) => (
                    <span key={area} className="rounded-md border border-obs-copper/40 bg-obs-copper/10 px-3 py-2 text-xs font-black uppercase tracking-[0.1em]">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
              <div className="owner-card-hot rounded-xl p-5">
                <p className="owner-kicker">What Happens Next</p>
                <ol className="mt-4 space-y-3 text-sm font-semibold text-obs-fog/82">
                  <li>1. Tell us the service and vehicle condition.</li>
                  <li>2. OBS confirms pricing, time, and location.</li>
                  <li>3. We arrive mobile and complete the service.</li>
                </ol>
              </div>
            </div>
            <div className="owner-card-hot rounded-xl p-6">
              <p className="owner-kicker">Request A Quote</p>
              <h2 className="mt-3 text-3xl font-black uppercase text-white">Tell Us About The Vehicle</h2>
              <p className="mt-3 text-sm leading-7 text-obs-fog/72">
                Use the form for quotes, photos, service selection, or availability questions.
                If you already know what you want, booking online is faster.
              </p>
              <div className="mt-6">
                <ContactInquiryForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
