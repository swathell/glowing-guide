import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ServiceCategory, ServicePackage } from "@/data/services";

function getAvailabilityLabel(category: ServiceCategory) {
  if (category.availability === "book-online") {
    return "Direct online booking";
  }

  if (category.availability === "call-to-schedule") {
    return "Call or contact to schedule";
  }

  return "Best added to a main service";
}

function getPrimaryCta(category: ServiceCategory) {
  if (category.availability === "book-online") {
    return { href: "/book", label: "Book this service" };
  }

  return { href: "/contact", label: "Contact to schedule" };
}

function PackageHighlights({ pkg }: { pkg: ServicePackage }) {
  if (!pkg.includes?.length) {
    return null;
  }

  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {pkg.includes.map((item) => (
        <span
          key={item}
          className="rounded-full border border-white/8 bg-black/15 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-obs-fog/76"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function FlagshipPackages({ category }: { category: ServiceCategory }) {
  const packages = category.groups.flatMap((group) => group.packages);
  const featuredPackage = packages[0];
  const remainingPackages = packages.slice(1);

  return (
    <div className="grid gap-5 xl:grid-cols-[1.06fr_0.94fr]">
      <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
        <p className="text-xs uppercase tracking-[0.18em] text-obs-sand/78">Featured package</p>
        <div className="mt-4 flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-xl">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-display text-4xl text-obs-fog">{featuredPackage.name}</h3>
              {featuredPackage.badge ? (
                <span className="rounded-full border border-obs-sand/30 bg-obs-sand/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-obs-sand">
                  {featuredPackage.badge}
                </span>
              ) : null}
            </div>
            <p className="mt-4 text-sm leading-7 text-obs-fog/74">{featuredPackage.summary}</p>
            <PackageHighlights pkg={featuredPackage} />
          </div>
          <div className="text-left sm:text-right">
            <p className="text-3xl font-semibold text-obs-sand">{featuredPackage.price}</p>
            {featuredPackage.duration ? (
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-obs-fog/55">
                {featuredPackage.duration}
              </p>
            ) : null}
          </div>
        </div>
        <div className="mt-8 grid gap-4 border-t border-white/8 pt-6 sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-obs-sand/76">Best for</p>
            <p className="mt-2 text-sm leading-6 text-obs-fog/72">
              Owners who want the clearest visual jump without having to compare every detail first.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-obs-sand/76">Booking style</p>
            <p className="mt-2 text-sm leading-6 text-obs-fog/72">Fast online booking with the strongest proof support.</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-obs-sand/76">Expectation</p>
            <p className="mt-2 text-sm leading-6 text-obs-fog/72">Designed to feel like a premium result, not just a routine clean.</p>
          </div>
        </div>
      </article>

      <div className="grid gap-5">
        {remainingPackages.map((pkg) => (
          <article key={pkg.name} className="rounded-3xl border border-white/10 bg-black/15 p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-lg">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-3xl text-obs-fog">{pkg.name}</h3>
                  {pkg.badge ? (
                    <span className="rounded-full border border-obs-sand/30 bg-obs-sand/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-obs-sand">
                      {pkg.badge}
                    </span>
                  ) : null}
                </div>
                <p className="mt-4 text-sm leading-7 text-obs-fog/74">{pkg.summary}</p>
                <PackageHighlights pkg={pkg} />
              </div>
              <p className="text-2xl font-semibold text-obs-sand">{pkg.price}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function MaintenancePackages({ category }: { category: ServiceCategory }) {
  return (
    <div className="space-y-10">
      {category.groups.map((group) => (
        <div key={group.title}>
          <div className="max-w-3xl">
            <p className="eyebrow">{group.title}</p>
            <h2 className="section-title mt-4">{group.intro}</h2>
          </div>
          <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
            {group.packages.map((pkg, index) => (
              <article
                key={pkg.name}
                className={`grid gap-5 p-6 lg:grid-cols-[0.95fr_0.55fr_0.5fr] lg:items-start ${
                  index > 0 ? "border-t border-white/8" : ""
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-semibold text-obs-fog">{pkg.name}</h3>
                    {pkg.badge ? (
                      <span className="rounded-full border border-obs-sand/30 bg-obs-sand/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-obs-sand">
                        {pkg.badge}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-obs-fog/74">{pkg.summary}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-obs-sand/76">Includes</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(pkg.includes ?? [pkg.summary]).map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/8 bg-black/15 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-obs-fog/76"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="lg:text-right">
                  <p className="text-3xl font-semibold text-obs-sand">{pkg.price}</p>
                  {pkg.duration ? (
                    <p className="mt-2 text-xs uppercase tracking-[0.16em] text-obs-fog/55">
                      {pkg.duration}
                    </p>
                  ) : null}
                  <p className="mt-4 text-sm leading-6 text-obs-fog/64">
                    Built to stay easy to compare and quick to schedule.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function SupportPackages({ category }: { category: ServiceCategory }) {
  return (
    <div className="space-y-10">
      {category.groups.map((group) => (
        <div key={group.title}>
          <div className="max-w-3xl">
            <p className="eyebrow">{group.title}</p>
            <h2 className="section-title mt-4">{group.intro}</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {group.packages.map((pkg) => (
              <article key={pkg.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold text-obs-fog">{pkg.name}</h3>
                  <p className="whitespace-nowrap text-lg font-semibold text-obs-sand">{pkg.price}</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-obs-fog/74">{pkg.summary}</p>
              </article>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ServiceTemplate({ category }: { category: ServiceCategory }) {
  const primaryCta = getPrimaryCta(category);
  const totalPackages = category.groups.reduce((sum, group) => sum + group.packages.length, 0);

  return (
    <>
      <section className="border-b border-white/8 py-20 md:py-28">
        <Container className="content-grid">
          <div>
            <p className="eyebrow">{category.eyebrow}</p>
            <h1 className="display-title mt-4 text-obs-fog">{category.hero}</h1>
            <p className="copy-muted mt-6">{category.intro}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-obs-sand/80">Availability</p>
                <p className="mt-3 text-sm leading-6 text-obs-fog/78">
                  {getAvailabilityLabel(category)}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-obs-sand/80">Pricing</p>
                <p className="mt-3 text-sm leading-6 text-obs-fog/78">From {category.priceFrom}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-obs-sand/80">Packages</p>
                <p className="mt-3 text-sm leading-6 text-obs-fog/78">{totalPackages} options across {category.groups.length} service groups</p>
              </div>
            </div>
          </div>
          <aside className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-obs-sand/80">How this category should convert</p>
            <p className="mt-4 text-sm leading-7 text-obs-fog/72">
              {category.availability === "book-online" &&
                "This category should move quickly into the booking flow, with proof and package clarity doing most of the conversion work."}
              {category.availability === "call-to-schedule" &&
                "This category is better framed as fast to understand and easy to schedule, with trust and convenience carrying more weight than a dramatic booking experience."}
              {category.availability === "add-on-first" &&
                "These services should feel like relevant enhancements. Surface them near their parent services first, and let this page act as the cleaner reference library."}
            </p>
            <Link href={primaryCta.href} className="button-primary mt-6">
              {primaryCta.label}
            </Link>
            <div className="mt-6 border-t border-white/8 pt-5">
              <p className="text-xs uppercase tracking-[0.18em] text-obs-sand/80">Ideal for</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-obs-fog/76">
                {category.idealFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </aside>
        </Container>
      </section>
      <section className="py-20 md:py-28">
        <Container>
          <div className="max-w-2xl">
            <p className="eyebrow">Packages</p>
            <h2 className="section-title mt-4">Pricing should help people choose, not make them decode a wall of options.</h2>
            <p className="copy-muted mt-5">
              This category now uses a layout style that matches how customers think about the job:
              flagship packages lead with outcome, maintenance stays comparison-friendly, and extras
              stay modular.
            </p>
          </div>

          <div className="mt-12">
            {category.serviceType === "flagship" ? <FlagshipPackages category={category} /> : null}
            {category.serviceType === "maintenance" ? <MaintenancePackages category={category} /> : null}
            {category.serviceType === "support" ? <SupportPackages category={category} /> : null}
          </div>

          <div className="mt-14 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-obs-sand/80">Proof strategy for this category</p>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-obs-fog/76">{category.proofNote}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/gallery" className="button-secondary">
                View gallery
              </Link>
              <Link href="/reviews" className="button-secondary">
                Read reviews
              </Link>
              <Link href={primaryCta.href} className="button-primary">
                {primaryCta.label}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
