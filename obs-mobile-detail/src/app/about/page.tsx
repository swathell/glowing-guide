import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "About",
  description: "Brand and operational story for OBS Mobile Detailing across the GTA."
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A tighter story, grounded in service quality and how the business actually operates."
        body="This shell leaves room for the final founder story, operating standards, and trust signals without turning the page into generic mission language."
      />
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {["Our standard", "Why mobile", "What customers can expect", "How the work scales"].map((item) => (
              <div key={item} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <h2 className="font-display text-3xl text-obs-fog">{item}</h2>
                <p className="mt-3 text-sm leading-7 text-obs-fog/72">
                  Placeholder content block for the final copy pass, kept inside the production page
                  structure now so content can drop in without a layout rewrite later.
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
