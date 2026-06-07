import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const socialLinks = Array.isArray((siteConfig as { socials?: unknown }).socials)
    ? ((siteConfig as { socials?: { label: string; href: string }[] }).socials ?? [])
    : [];

  const serviceLinks = [
    "Mobile Detailing",
    "Ceramic Coating",
    "Paint Correction",
    "Interior Detail",
    "Headlight Restore",
    "Oil Changes",
    "Tire Services"
  ];

  return (
    <footer className="border-t border-obs-copper/40 bg-[#050607]">
      <div className="section-shell py-10">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.75fr_0.85fr_0.85fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/images/Hero/obslogo.png" alt="OBS Mobile Detailing" width={46} height={46} className="h-11 w-11 rounded-full" />
              <div>
                <p className="font-display text-3xl font-black uppercase text-white">OBS</p>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-obs-copper">Mobile Detailing</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-obs-fog/72">
              Premium automotive service operation across the GTA: detailing, coating, paint
              correction, interiors, maintenance, add-ons, and mobile convenience.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link href="/book" className="button-primary">Book Now</Link>
              <a href={`tel:${siteConfig.phone}`} className="button-secondary">Call Now</a>
            </div>
          </div>

          <div>
            <p className="owner-kicker">Services</p>
            <div className="mt-4 grid gap-2">
              {serviceLinks.map((service) => (
                <Link key={service} href="/services" className="text-sm font-semibold text-obs-fog/74 transition hover:text-obs-copper">
                  {service}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="owner-kicker">Contact</p>
            <div className="mt-4 space-y-3 text-sm font-semibold text-obs-fog/74">
              <p>{siteConfig.phone}</p>
              <p>{siteConfig.email}</p>
              <p>Fast mobile service across the GTA.</p>
            </div>
            {socialLinks.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md border border-obs-copper/35 bg-obs-copper/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-obs-fog/76 transition hover:bg-obs-copper hover:text-white"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <div>
            <p className="owner-kicker">Service Areas</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {siteConfig.areas.map((area) => (
                <span key={area} className="rounded-md border border-obs-copper/30 px-3 py-2 text-[10px] font-black uppercase tracking-[0.1em] text-obs-fog/68">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
