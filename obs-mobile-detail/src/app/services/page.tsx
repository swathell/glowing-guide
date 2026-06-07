import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { serviceCategories } from "@/data/services";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description: "Mobile detailing, ceramic coating, paint correction, interior detailing, add-ons, oil changes, and tire services across the GTA."
};

const catalogServices = [
  { name: "Mobile Detailing", price: "$99", image: "/images/owner-reference/service-hero.png", body: "Interior, exterior, and full vehicle packages brought to your location." },
  { name: "Ceramic Coating", price: "$499", image: "/images/owner-reference/service-work-02.png", body: "Long-term paint protection, gloss, and hydrophobic finish support." },
  { name: "Paint Correction", price: "$299", image: "/images/gallery/gallery-09.png", body: "Swirl reduction and gloss recovery for paint that needs sharper reflection." },
  { name: "Interior Detail", price: "$99", image: "/images/gallery/gallery-01.png", body: "Vacuum, shampoo, stain removal, trim, glass, and cabin reset work." },
  { name: "Exterior Detail", price: "$149", image: "/images/gallery/gallery-10.png", body: "Foam wash, wheels, tires, paint-safe finish, and curb appeal reset." },
  { name: "Window Tinting", price: "$199", image: "/images/owner-reference/mobile-work.png", body: "Automotive tinting path for customers who want privacy and heat control." },
  { name: "Headlight Restore", price: "$40", image: "/images/gallery/gallery-03.png", body: "Clear cloudy headlights and sharpen the front-end look." },
  { name: "Engine Bay Cleaning", price: "$50", image: "/images/gallery/gallery-08.png", body: "Degrease and clean the bay for better presentation." },
  { name: "Pet Hair Removal", price: "$30", image: "/images/gallery/gallery-12.png", body: "Extra extraction for hair-heavy interiors." },
  { name: "Oil Changes", price: "$79", image: "/images/owner-reference/service-work-01.png", body: "Mobile maintenance for drivers who want to skip the shop visit." },
  { name: "Tire Services", price: "$39", image: "/images/gallery/gallery-10.png", body: "Seasonal tire support, pressure checks, and mobile convenience." },
  { name: "Odor Removal", price: "$50", image: "/images/gallery/gallery-05.png", body: "Smoke, food, pet, and stale cabin odor treatment." }
];

const primaryPackages = [
  {
    name: "Basic Detail",
    price: "$99",
    badge: "Starter",
    features: ["Interior vacuum", "Surface wipe down", "Glass cleaning", "Light cabin reset"]
  },
  {
    name: "Premium Detail",
    price: "$249",
    badge: "Most Popular",
    hot: true,
    features: ["Interior + exterior", "Foam wash", "Wheels and tire dressing", "Deep cabin clean", "Paint-safe finish"]
  },
  {
    name: "Ultimate Detail",
    price: "$299",
    badge: "Best Value",
    features: ["Full detail", "Wax protection", "Odor removal", "Premium interior reset", "Complete visual refresh"]
  }
];

const addOns = [
  ["Pet Hair Removal", "$30"],
  ["Heavy Stain Treatment", "$40"],
  ["Engine Bay Clean", "$50"],
  ["Headlight Restoration", "$40"],
  ["Odor Removal", "$50"],
  ["Clay Bar", "$60"],
  ["Wax Add-On", "$40"],
  ["Cabin Filter", "$25"],
  ["Brake Check", "$25"],
  ["Tire Rotation", "$25"],
  ["Wheel Cleaning", "$30"],
  ["Battery Test", "$15"]
];

const comparisons = [
  { title: "Who Needs Interior Detailing?", body: "Drivers with stains, salt, pet hair, odors, dust, or a cabin that never feels clean after a quick vacuum." },
  { title: "Why Choose Ceramic Coating?", body: "Better gloss, easier washing, stronger protection, and a finish that stays sharper longer." },
  { title: "When Is Maintenance Enough?", body: "If the vehicle is already in good shape, a lighter package keeps it clean without overbuying." },
  { title: "When To Upgrade Packages?", body: "If the vehicle has heavy buildup, odor, exterior dullness, or you are preparing it for sale." }
];

export default function ServicesPage() {
  const serviceLinks = serviceCategories.map((category) => category.slug);

  return (
    <>
      <section className="relative overflow-hidden border-b border-obs-copper/35 bg-[#070809] py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,103,24,0.32),transparent_32%),linear-gradient(115deg,transparent_0_58%,rgba(255,103,24,0.18)_58.1%_58.45%,transparent_58.55%_100%)]" />
        <Container className="relative">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="obs-tag">Services & Pricing</span>
                <span className="obs-tag">Book Online</span>
                <span className="obs-tag">GTA Mobile Service</span>
              </div>
              <h1 className="display-title mt-6 text-obs-fog">
                Mobile Detailing, Ceramic Coating & Paint Correction
              </h1>
              <p className="copy-muted mt-6 max-w-3xl">
                See what OBS offers, where pricing starts, what is included, and which package is
                right for your vehicle before you book.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/book" className="button-primary">Book Now</Link>
                <a href={`tel:${siteConfig.phone}`} className="button-secondary">Call Now</a>
              </div>
            </div>
            <div className="owner-card-hot overflow-hidden rounded-xl p-3">
              <div className="relative min-h-[21rem] overflow-hidden rounded-lg">
                <Image src="/images/owner-reference/service-work-03.png" alt="OBS service catalog" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="owner-kicker">Service Catalog</p>
                  <p className="mt-2 font-display text-4xl font-black uppercase text-white">
                    Clear Options. Clear Prices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Service Grid</p>
              <h2 className="section-title mt-3">Everything OBS Offers</h2>
            </div>
            <div className="text-sm font-black uppercase tracking-[0.16em] text-obs-copper">
              {serviceLinks.length} service categories online
            </div>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {catalogServices.map((service) => (
              <article key={service.name} className="owner-card overflow-hidden rounded-xl">
                <div className="relative min-h-[13rem]">
                  <Image src={service.image} alt={service.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/12 to-transparent" />
                  <div className="absolute left-4 top-4 rounded-md bg-obs-copper px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-white">
                    From {service.price}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-2xl font-black uppercase text-white">{service.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-obs-fog/74">{service.body}</p>
                  <div className="mt-5 flex gap-3">
                    <Link href="/book" className="button-primary px-4 py-2">Book</Link>
                    <Link href="/contact" className="button-secondary px-4 py-2">Quote</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-obs-copper/30 bg-black/28 py-14 md:py-20">
        <Container>
          <div className="text-center">
            <p className="eyebrow">Package Comparison</p>
            <h2 className="section-title mt-3">Choose Basic, Premium Or Ultimate</h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3 lg:items-center">
            {primaryPackages.map((pkg) => (
              <article key={pkg.name} className={pkg.hot ? "owner-card-hot rounded-xl p-7 lg:scale-105" : "owner-card rounded-xl p-6"}>
                <p className="owner-kicker">{pkg.badge}</p>
                <h3 className="mt-3 font-display text-5xl font-black uppercase text-white">{pkg.name}</h3>
                <p className="owner-price mt-4 font-display text-6xl font-black">{pkg.price}</p>
                <p className="mt-1 text-xs font-black uppercase tracking-[0.16em] text-obs-fog/60">Starting at</p>
                <ul className="mt-6 space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm font-semibold text-obs-fog/82">
                      <span className="text-obs-copper">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/book" className="button-primary mt-7 w-full">Book Package</Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div>
              <p className="eyebrow">Add-Ons</p>
              <h2 className="section-title mt-3">Customize The Job</h2>
              <p className="copy-muted mt-5">
                Add-ons make OBS feel like a real operation with options for actual vehicle
                condition, not a one-size-fits-all wash.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {addOns.map(([name, price]) => (
                <div key={name} className="owner-card flex items-center justify-between rounded-lg p-4">
                  <span className="text-sm font-black uppercase tracking-[0.08em]">{name}</span>
                  <span className="owner-price text-sm font-black">From {price}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-obs-copper/30 bg-[#0a0b0c] py-14 md:py-20">
        <Container>
          <div className="text-center">
            <p className="eyebrow">Help Me Choose</p>
            <h2 className="section-title mt-3">Know What To Book</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {comparisons.map((item) => (
              <article key={item.title} className="owner-card rounded-xl p-5">
                <span className="owner-icon">?</span>
                <h3 className="mt-4 text-lg font-black uppercase text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-obs-fog/72">{item.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/book" className="button-primary">Start Booking</Link>
            <a href={`tel:${siteConfig.phone}`} className="button-secondary">Call {siteConfig.phone}</a>
          </div>
        </Container>
      </section>
    </>
  );
}
