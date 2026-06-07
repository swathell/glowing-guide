import Link from "next/link";
import { serviceCategories } from "@/data/services";
import { Container } from "@/components/ui/container";

export function ServiceGridSection() {
  const detailing = serviceCategories.find((category) => category.slug === "detailing");
  const supportCategories = serviceCategories.filter((category) => category.slug !== "detailing");
  const featuredPackages = detailing?.groups.flatMap((group) => group.packages).slice(0, 5) ?? [];
  const visibleServices = [
    "Mobile Detailing",
    "Interior Detail",
    "Exterior Detail",
    "Paint Protection",
    "Oil Change",
    "Tire Service",
    "Pet Hair Removal",
    "Headlight Restore",
    "Engine Bay Clean",
    "Odor Removal"
  ];

  if (!detailing) {
    return null;
  }

  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-3">
              <span className="obs-tag">Services you can actually book</span>
              <span className="obs-tag">From maintenance to full restoration</span>
            </div>
            <h2 className="section-title mt-6">Everything a driver needs to understand the service fast.</h2>
            <p className="copy-muted mt-5">
              Packages, starting prices, add-ons, and mobile convenience are brought forward so
              OBS feels like a real operation first and a premium brand right behind it.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {visibleServices.map((service) => (
              <Link key={service} href="/services" className="obs-service-chip text-sm">
                <span>{service}</span>
                <span className="text-xs uppercase tracking-[0.16em] text-obs-copper">Service</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-12 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <article className="obs-panel obs-performance-line overflow-hidden rounded-3xl pt-3">
            <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="obs-angle-grid border-b border-white/8 bg-black/15 p-8 lg:border-b-0 lg:border-r">
                <p className="text-sm uppercase tracking-[0.2em] text-obs-sand/80">{detailing.eyebrow}</p>
                <h3 className="mt-4 font-display text-4xl text-obs-fog sm:text-5xl">{detailing.name}</h3>
                <p className="obs-price mt-4 text-sm font-semibold uppercase tracking-[0.16em]">
                  From {detailing.priceFrom}
                </p>
                <p className="mt-5 text-sm leading-7 text-obs-fog/74">
                  The flagship service path for customers who want a cleaner cabin, sharper paint,
                  and visible before-and-after value without driving to a shop.
                </p>
                <p className="mt-6 border-l-2 border-obs-copper pl-4 text-sm leading-7 text-obs-fog/88">
                  Clear package choices: basic interior, full interior, exterior, complete detail,
                  and premium detail.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                  <Link href="/book" className="button-primary">
                    Book detailing
                  </Link>
                  <Link href={`/services/${detailing.slug}`} className="button-secondary">
                    View packages
                  </Link>
                </div>
              </div>
              <div className="grid gap-0 divide-y divide-white/8">
                {featuredPackages.map((pkg) => (
                  <div key={pkg.name} className="grid gap-2 px-8 py-5 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-6">
                    <div>
                      <p className="text-lg font-semibold text-obs-fog">
                        {pkg.name}
                        {pkg.badge ? (
                          <span className="ml-3 align-middle text-[10px] uppercase tracking-[0.16em] text-obs-copper">
                            {pkg.badge}
                          </span>
                        ) : null}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-obs-fog/72">{pkg.summary}</p>
                    </div>
                    <p className="obs-price whitespace-nowrap text-sm font-semibold uppercase tracking-[0.16em]">
                      {pkg.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <div className="grid gap-5">
            {supportCategories.map((category) => (
              <article
                key={category.slug}
                className="obs-panel rounded-3xl p-7 transition hover:-translate-y-1 hover:bg-white/[0.045]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-obs-sand/80">
                      {category.eyebrow}
                    </p>
                    <h3 className="mt-4 font-display text-3xl text-obs-fog">{category.name}</h3>
                  </div>
                  <p className="obs-price text-sm font-semibold uppercase tracking-[0.16em]">
                    From {category.priceFrom}
                  </p>
                </div>
                <p className="mt-5 border-l-2 border-obs-copper pl-4 text-sm leading-7 text-obs-fog/74">
                  {category.highlight}
                </p>
                <ul className="mt-6 space-y-3 text-sm text-obs-fog/82">
                  {category.groups[0].packages.slice(0, 3).map((pkg) => (
                    <li key={pkg.name} className="flex items-start justify-between gap-4 border-t border-white/8 pt-3">
                      <span>{pkg.name}</span>
                      <span className="whitespace-nowrap text-obs-sand">{pkg.price}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/8 pt-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-obs-copper">
                    {category.availability === "call-to-schedule"
                      ? "Call to schedule"
                      : "Best added to a main service"}
                  </p>
                  <Link href={`/services/${category.slug}`} className="inline-flex text-sm font-semibold text-obs-sand">
                    Explore service
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="obs-panel obs-performance-line-right rounded-2xl p-5 text-sm leading-7 text-obs-fog/72">
            <p className="text-xs uppercase tracking-[0.18em] text-obs-copper">Good</p>
            <p className="mt-3 text-lg font-semibold text-obs-fog">Basic Interior Clean</p>
            <p className="mt-2">A simple entry point for everyday cabins that need vacuuming, wipe-down, and glass.</p>
          </div>
          <div className="obs-panel obs-performance-line-right rounded-2xl p-5 text-sm leading-7 text-obs-fog/72">
            <p className="text-xs uppercase tracking-[0.18em] text-obs-copper">Better</p>
            <p className="mt-3 text-lg font-semibold text-obs-fog">Complete Detail</p>
            <p className="mt-2">Interior and exterior work together for the clearest whole-vehicle improvement.</p>
          </div>
          <div className="obs-panel obs-performance-line-right rounded-2xl p-5 text-sm leading-7 text-obs-fog/72">
            <p className="text-xs uppercase tracking-[0.18em] text-obs-copper">Best</p>
            <p className="mt-3 text-lg font-semibold text-obs-fog">Premium Detail</p>
            <p className="mt-2">Full detail plus wax and odor removal for the highest routine service standard.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
