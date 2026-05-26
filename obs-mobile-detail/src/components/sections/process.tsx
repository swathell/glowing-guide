import { Container } from "@/components/ui/container";

const steps = [
  {
    title: "Choose the service",
    body: "Pick a standard package or move into a quote path for specialty jobs."
  },
  {
    title: "Tell us about the vehicle",
    body: "Vehicle type, condition, location, and any flags that affect time or scope."
  },
  {
    title: "Book or request review",
    body: "Standard jobs go to the calendar. Higher-complexity work stays controlled."
  },
  {
    title: "We come to you",
    body: "Home, office, condo parking, or business location across the GTA."
  }
];

export function ProcessSection() {
  return (
    <section className="border-y border-white/8 bg-black/15 py-20 md:py-28">
      <Container>
        <div className="max-w-2xl">
          <p className="eyebrow">How It Works</p>
          <h2 className="section-title mt-4">Booking stays simple where it should, structured where it must.</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="surface-border rounded-xl bg-white/[0.03] p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-obs-sand/80">0{index + 1}</p>
              <h3 className="mt-5 text-xl font-semibold text-obs-fog">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-obs-fog/72">{step.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
