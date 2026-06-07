import Link from "next/link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

const proofStats = [
  { value: "100+", label: "vehicles detailed" },
  { value: "5-star", label: "customer feedback" },
  { value: "9", label: "core GTA service areas" },
  { value: "Mobile", label: "home, condo, office" }
];

export function OperationalProofSection() {
  return (
    <section className="border-b border-white/8 bg-black/20 py-8">
      <Container>
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {proofStats.map((stat) => (
              <div key={stat.label} className="border-l-2 border-obs-copper bg-white/[0.025] px-4 py-3">
                <p className="font-display text-2xl text-obs-fog">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-obs-sand/78">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4 lg:items-end">
            <p className="text-sm leading-7 text-obs-fog/72 lg:max-w-lg lg:text-right">
              Serving {siteConfig.areas.slice(0, 6).join(", ")} and nearby GTA communities.
            </p>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/service-areas" className="button-secondary">
                Check Service Areas
              </Link>
              <Link href="/reviews" className="button-secondary">
                Read Reviews
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
