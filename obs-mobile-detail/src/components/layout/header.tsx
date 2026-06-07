import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { TrackedAnchor } from "@/components/ui/tracked-anchor";
import { TrackedLink } from "@/components/ui/tracked-link";

const navItems = [
  { href: "/services", label: "Services & Pricing" },
  { href: "/gallery", label: "Before / After" },
  { href: "/reviews", label: "Reviews" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/contact", label: "Contact" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-obs-copper/35 bg-[#070809]/95 backdrop-blur">
      <div className="section-shell flex min-h-16 items-center justify-between gap-4 py-2">
        <Link href="/" className="flex items-center gap-3 text-obs-fog">
          <Image src="/images/Hero/obslogo.png" alt="OBS" width={38} height={38} className="h-9 w-9 rounded-full" />
          <span className="leading-none">
            <span className="block font-display text-2xl font-black uppercase tracking-wide">OBS</span>
            <span className="hidden text-[10px] font-black uppercase tracking-[0.18em] text-obs-copper sm:block">
              Mobile Detailing
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-5 text-xs font-black uppercase tracking-[0.12em] text-obs-fog/78 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-obs-copper">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <TrackedAnchor
            href={`tel:${siteConfig.phone}`}
            className="hidden rounded-md border border-obs-copper/55 px-4 py-3 text-xs font-black uppercase tracking-[0.1em] text-obs-copper transition hover:bg-obs-copper hover:text-white md:inline-flex"
            eventName="phone_clicked"
            metadata={{ placement: "header" }}
          >
            Call
          </TrackedAnchor>
          <TrackedLink
            href="/book"
            className="button-primary px-4 py-3"
            eventName="booking_started"
            metadata={{ placement: "header" }}
          >
            Book Now
          </TrackedLink>
        </div>
      </div>
    </header>
  );
}
