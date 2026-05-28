import Link from "next/link";
import { Container } from "@/components/ui/container";

export function AreaTemplate({ areaName }: { areaName: string }) {
  return (
    <>
      <section className="border-b border-white/8 py-20 md:py-28">
        <Container className="content-grid">
          <div>
            <p className="eyebrow">Service Area</p>
            <h1 className="display-title mt-4 text-obs-fog">Mobile detailing in {areaName}</h1>
            <p className="copy-muted mt-6">
              Professional interior, exterior, correction, and protection services delivered to
              homes, offices, condo parking, and approved sites in {areaName}.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-obs-sand/80">Why this page exists</p>
            <p className="mt-4 text-sm leading-7 text-obs-fog/72">
              The shell supports local SEO pages without copying thin content across cities. Each
              area page can be expanded with reviews, gallery sets, and booking availability later.
            </p>
            <Link href="/book" className="button-primary mt-6">
              Check availability
            </Link>
          </div>
        </Container>
      </section>
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              "Interior detailing",
              "Full detail packages",
              "Ceramic services",
              "Paint correction"
            ].map((item) => (
              <div key={item} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <h2 className="text-xl font-semibold text-obs-fog">{item}</h2>
                <p className="mt-3 text-sm leading-7 text-obs-fog/72">
                  Structured package content for {areaName} can slot into this template without
                  changing the overall routing or component system.
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
