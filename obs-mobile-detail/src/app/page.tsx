import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

const services = [
  { icon: "✦", name: "Mobile Detailing", price: "From $99", body: "Interior, exterior, and full vehicle detailing at your location." },
  { icon: "◆", name: "Ceramic Coating", price: "From $499", body: "Gloss, hydrophobic protection, and long-term paint defense." },
  { icon: "◈", name: "Paint Correction", price: "From $299", body: "Swirl reduction, gloss recovery, and paint finish improvement." },
  { icon: "▣", name: "Interior Detailing", price: "From $99", body: "Vacuuming, shampoo, stain treatment, glass, trim, and odor help." },
  { icon: "●", name: "Headlight Restore", price: "From $40", body: "Restore cloudy headlights and improve front-end appearance." },
  { icon: "▲", name: "Engine Bay Clean", price: "From $50", body: "Degrease and clean the engine bay for a sharper presentation." },
  { icon: "■", name: "Pet Hair Removal", price: "From $30", body: "Deep extraction for hair-heavy interiors and family vehicles." },
  { icon: "⬢", name: "Oil & Tire Services", price: "From $39", body: "Mobile maintenance options for drivers who want convenience." }
];

const packages = [
  {
    name: "Basic",
    price: "$99",
    label: "Entry Detail",
    features: ["Interior vacuum", "Wipe down surfaces", "Glass cleaning", "Quick cabin reset"],
    hot: false
  },
  {
    name: "Premium",
    price: "$249",
    label: "Most Popular",
    features: ["Interior + exterior", "Foam wash", "Wheels and tires", "Deep cabin clean", "Paint-safe finish"],
    hot: true
  },
  {
    name: "Ultimate",
    price: "$299",
    label: "Best Value",
    features: ["Full detail", "Wax protection", "Odor removal", "Premium finish", "Vehicle reset"],
    hot: false
  }
];

const benefits = [
  { icon: "☎", title: "Fast Response", body: "Call, text, or book online with clear next steps." },
  { icon: "⌂", title: "Fully Mobile", body: "Home, office, condo, or business location across the GTA." },
  { icon: "$", title: "Visible Pricing", body: "Starting prices are shown before customers commit." },
  { icon: "★", title: "Trusted Results", body: "Real reviews, real vehicles, and visible transformation proof." },
  { icon: "✓", title: "Service Range", body: "Detailing, coating, correction, interiors, add-ons, oil, and tires." },
  { icon: "⚙", title: "Operational Process", body: "Choose the service, confirm the vehicle, and OBS comes to you." }
];

const transformations = [
  {
    image: "/images/owner-reference/service-work-01.png",
    vehicle: "SUV Interior Reset",
    service: "Interior Detailing + Pet Hair Removal"
  },
  {
    image: "/images/owner-reference/service-work-02.png",
    vehicle: "Paint Finish Recovery",
    service: "Paint Correction + Ceramic Prep"
  },
  {
    image: "/images/owner-reference/service-work-03.png",
    vehicle: "Mobile Detail Setup",
    service: "Full Exterior + Interior Detail"
  }
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-obs-copper/35 bg-[#070809]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,103,24,0.36),transparent_28%),linear-gradient(115deg,transparent_0_52%,rgba(255,103,24,0.18)_52.1%_52.5%,transparent_52.6%_100%)]" />
        <div className="absolute left-0 top-[18%] h-1 w-[72%] -rotate-6 bg-gradient-to-r from-transparent via-obs-copper to-transparent opacity-80" />
        <Container className="relative grid min-h-[calc(100svh-4rem)] items-center py-10 md:py-14">
          <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr] xl:items-center">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="obs-tag">Mobile Detailing</span>
                <span className="obs-tag">Ceramic Coating</span>
                <span className="obs-tag">Paint Correction</span>
              </div>
              <h1 className="mt-6 font-display text-5xl font-black uppercase leading-[0.86] text-obs-fog md:text-7xl xl:text-[6.4rem]">
                Premium Mobile Detailing Across The GTA
              </h1>
              <p className="copy-muted mt-6 max-w-2xl">
                Professional mobile detailing, ceramic coating, paint correction, interior
                restoration, and maintenance services brought directly to your home or office.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/book" className="button-primary">
                  Book Now
                </Link>
                <a href={`tel:${siteConfig.phone}`} className="button-secondary">
                  Call Now
                </a>
                <Link href="/contact" className="button-secondary">
                  Get Quote
                </Link>
              </div>
              <div className="mt-7 grid gap-2 sm:grid-cols-2">
                {["Fully Mobile", "GTA Coverage", "Same-Day Availability", "Satisfaction Focused"].map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-white/[0.045] px-4 py-3 text-sm font-bold uppercase tracking-[0.08em]">
                    <span className="text-obs-copper">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4">
              <div className="owner-card-hot relative overflow-hidden rounded-xl p-3">
                <div className="relative min-h-[23rem] overflow-hidden rounded-lg md:min-h-[34rem]">
                  <Image
                    src="/images/owner-reference/service-hero.png"
                    alt="OBS automotive service reference"
                    fill
                    priority
                    className="hero-image object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/8 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="owner-kicker">Active Mobile Operation</p>
                    <p className="mt-2 font-display text-4xl font-black uppercase leading-none text-white">
                      We Come To You
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["100+", "Vehicles Detailed"],
                  ["9+", "Service Areas"],
                  ["5★", "Customer Focus"]
                ].map(([value, label]) => (
                  <div key={label} className="owner-card rounded-lg p-4">
                    <p className="owner-price font-display text-4xl font-black">{value}</p>
                    <p className="mt-1 text-xs font-black uppercase tracking-[0.16em] text-obs-fog/72">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Services</p>
              <h2 className="section-title mt-3">Automotive Services You Can Book</h2>
            </div>
            <Link href="/services" className="button-primary">
              View All Services
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <article key={service.name} className="owner-card rounded-xl p-5 transition hover:-translate-y-1 hover:border-obs-copper">
                <span className="owner-icon">{service.icon}</span>
                <h3 className="mt-5 text-xl font-black uppercase text-white">{service.name}</h3>
                <p className="owner-price mt-2 text-sm font-black uppercase tracking-[0.14em]">{service.price}</p>
                <p className="mt-4 text-sm leading-6 text-obs-fog/74">{service.body}</p>
                <Link href="/book" className="mt-5 inline-flex text-sm font-black uppercase tracking-[0.12em] text-obs-copper">
                  Book Service →
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-obs-copper/30 bg-black/28 py-14 md:py-20">
        <Container>
          <div className="text-center">
            <p className="eyebrow">Packages</p>
            <h2 className="section-title mt-3">Basic, Premium & Ultimate Detailing</h2>
            <p className="copy-muted mx-auto mt-4 max-w-3xl">
              Clear starting prices, visible inclusions, and one obvious path to book.
            </p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3 lg:items-center">
            {packages.map((pkg) => (
              <article
                key={pkg.name}
                className={`${pkg.hot ? "owner-card-hot scale-[1.02] rounded-xl p-7 lg:scale-105" : "owner-card rounded-xl p-6"}`}
              >
                <p className="owner-kicker">{pkg.label}</p>
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
                <Link href="/book" className="button-primary mt-7 w-full">
                  Book {pkg.name}
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.74fr_1.26fr] lg:items-start">
            <div>
              <p className="eyebrow">Why Choose OBS</p>
              <h2 className="section-title mt-3">Built Like A Real Service Operation</h2>
              <p className="copy-muted mt-5">
                The point of this branch is visibility: more proof, more services, more booking
                paths, and less guessing for the customer.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {benefits.map((benefit) => (
                <article key={benefit.title} className="owner-card rounded-xl p-5">
                  <span className="owner-icon">{benefit.icon}</span>
                  <h3 className="mt-4 text-lg font-black uppercase text-white">{benefit.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-obs-fog/72">{benefit.body}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-obs-copper/30 bg-[#0a0b0c] py-14 md:py-20">
        <Container>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">GTA Coverage</p>
              <h2 className="section-title mt-3">Mobile Service Areas</h2>
            </div>
            <a href={`tel:${siteConfig.phone}`} className="button-secondary">
              Call {siteConfig.phone}
            </a>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {[...siteConfig.areas, "Etobicoke", "Milton", "Burlington"].map((area) => (
              <div key={area} className="owner-card flex items-center justify-between rounded-lg px-5 py-4">
                <span className="font-black uppercase tracking-[0.08em]">{area}</span>
                <span className="text-obs-copper">●</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <div className="text-center">
            <p className="eyebrow">Before / After Proof</p>
            <h2 className="section-title mt-3">Real Transformations & Recent Jobs</h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {transformations.map((item) => (
              <article key={item.vehicle} className="owner-card-hot overflow-hidden rounded-xl p-3">
                <div className="relative min-h-[21rem] overflow-hidden rounded-lg">
                  <Image src={item.image} alt={item.vehicle} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/12 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="owner-kicker">{item.service}</p>
                    <h3 className="mt-2 text-2xl font-black uppercase text-white">{item.vehicle}</h3>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-obs-copper/40 bg-[linear-gradient(110deg,#ff6718_0%,#b8622f_42%,#111315_42.1%,#050607_100%)] py-12 md:py-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-white/82">Ready To Book?</p>
              <h2 className="mt-3 font-display text-4xl font-black uppercase leading-none text-white md:text-6xl">
                Mobile detailing available across the GTA.
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/book" className="bg-white px-6 py-4 text-center text-sm font-black uppercase tracking-[0.1em] text-black">
                Book Now
              </Link>
              <a href={`tel:${siteConfig.phone}`} className="border border-white/70 px-6 py-4 text-center text-sm font-black uppercase tracking-[0.1em] text-white">
                Call Now
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
