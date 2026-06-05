import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { Container } from "@/components/ui/container";

const navItems = [
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" }
];

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-obs-line bg-obs-ink/84 backdrop-blur-xl">
        <Container className="flex h-20 items-center justify-between gap-5">
          <Link href="/" className="flex items-center gap-3" aria-label="OBS Mobile Detail home">
            <span className="relative grid h-12 w-12 place-items-center bg-obs-fog">
              <Image src="/images/obs-logo.png" alt="" width={38} height={38} className="object-contain" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-xl text-obs-fog">OBS</span>
              <span className="text-[0.66rem] font-semibold uppercase text-obs-sand">Mobile Detail</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-obs-sand md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-obs-fog">
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/book"
            className="border border-obs-copper bg-obs-copper px-4 py-2 text-sm font-bold uppercase text-obs-fog transition hover:bg-transparent"
          >
            Book
          </Link>
        </Container>
      </header>
      <main>{children}</main>
      <footer className="border-t border-obs-line py-10">
        <Container className="flex flex-col justify-between gap-4 text-sm text-obs-sand md:flex-row">
          <p>OBS Mobile Detail. Premium mobile detailing with a practical service-first edge.</p>
          <p>Interior, exterior, protection, and transformation work across local driveways and fleets.</p>
        </Container>
      </footer>
    </div>
  );
}
