import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-black/20 py-12">
      <div className="section-shell grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl text-obs-fog">OBS Mobile Detailing</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-obs-fog/68">
            Mobile detailing across the GTA with clear packages, real proof, and a cleaner booking flow.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-obs-sand/80">
            Explore
          </p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-obs-fog/72">
            <Link href="/services">Services</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/service-areas">Service Areas</Link>
            <Link href="/faq">FAQ</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-obs-sand/80">
            Contact
          </p>
          <div className="mt-4 space-y-2 text-sm text-obs-fog/72">
            <p>{siteConfig.phone}</p>
            <p>{siteConfig.email}</p>
            <p>Serving {siteConfig.areas.join(", ")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
