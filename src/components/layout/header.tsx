import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { TrackedAnchor } from "@/components/ui/tracked-anchor";
import { TrackedLink } from "@/components/ui/tracked-link";

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-obs-ink/90 backdrop-blur">
      <div className="section-shell flex h-16 items-center justify-between gap-6">
        <Link href="/" className="font-display text-2xl tracking-wide text-obs-fog">
          OBS
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-obs-fog/76 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <TrackedAnchor
            href={`tel:${siteConfig.phone}`}
            className="hidden text-sm text-obs-fog/70 sm:inline"
            eventName="phone_clicked"
            metadata={{ placement: "header" }}
          >
            {siteConfig.phone}
          </TrackedAnchor>
          <TrackedLink
            href="/book"
            className="button-primary"
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
