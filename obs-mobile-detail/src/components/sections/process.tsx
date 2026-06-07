import { Container } from "@/components/ui/container";

const steps = [
  {
    title: "Choose the package",
    body: "Start with Basic, Complete, Premium, or a targeted add-on based on the vehicle condition."
  },
  {
    title: "Confirm the vehicle",
    body: "Share the vehicle type, location, condition, and any stains, odor, pet hair, or salt buildup."
  },
  {
    title: "OBS arrives mobile",
    body: "We come to your home, condo, office, or business with the service plan already clear."
  },
  {
    title: "Final walkthrough",
    body: "You see the finished work, review any notes, and know exactly what was completed."
  }
];

export function ProcessSection() {
  return (
    <section className="border-y border-white/8 bg-black/15 py-20 md:py-28">
      <Container>
        <div className="max-w-2xl">
          <div className="flex flex-wrap gap-3">
            <span className="obs-tag">How it works</span>
            <span className="obs-tag">Fast to book, easy to trust</span>
          </div>
          <h2 className="section-title mt-6">A simple service flow makes the work easier to trust.</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="obs-panel rounded-2xl p-6">
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
