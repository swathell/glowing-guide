import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-shell";
import { Container } from "@/components/ui/container";

const questions = [
  {
    group: "Booking",
    items: [
      {
        question: "Do I need to bring my vehicle anywhere?",
        answer:
          "No. OBS is mobile. We come to your driveway, workplace, condo visitor area, or approved fleet location as long as there is safe access around the vehicle."
      },
      {
        question: "How much space do you need?",
        answer:
          "A clear parking space with room to open doors fully is ideal. For exterior work, access to water and power may be confirmed during booking depending on the package."
      },
      {
        question: "Can I book if I am not sure which package fits?",
        answer:
          "Yes. Start with the closest package and note the vehicle condition. OBS can confirm the right scope before the appointment if photos or added inspection are needed."
      }
    ]
  },
  {
    group: "Condition",
    items: [
      {
        question: "What changes the price?",
        answer:
          "Heavy pet hair, salt buildup, staining, odor, mold concerns, oversized vehicles, or unusually heavy exterior contamination can change the final quote."
      },
      {
        question: "Can every stain or scratch be removed?",
        answer:
          "Some marks are permanent or require paint correction beyond a standard detail. OBS will be clear about what can be improved, what can be reduced, and what should not be over-promised."
      },
      {
        question: "Do you detail work trucks and family vehicles?",
        answer:
          "Yes. The work is premium, but practical. Daily drivers, family SUVs, vans, trucks, and business vehicles can all be scoped around real use."
      }
    ]
  },
  {
    group: "Aftercare",
    items: [
      {
        question: "How long should the vehicle stay dry after protection?",
        answer:
          "That depends on the protection product and weather. OBS will give aftercare guidance with the completed job so the finish has the best chance to cure properly."
      },
      {
        question: "How often should I rebook?",
        answer:
          "For a clean daily driver, seasonal details are a strong rhythm. Vehicles carrying kids, pets, tools, or winter salt may benefit from shorter maintenance intervals."
      }
    ]
  }
];

const signals = ["Access", "Condition", "Package", "Aftercare"];

export default function FaqPage() {
  return (
    <SiteShell>
      <section className="relative overflow-hidden border-b border-obs-line">
        <div className="absolute inset-0">
          <Image
            src="/images/obs-hand-wipe.png"
            alt=""
            fill
            priority
            className="object-cover opacity-[0.34]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-obs-ink via-obs-ink/82 to-obs-ink/36" />
        </div>
        <Container className="relative grid min-h-[calc(100svh-5rem)] items-center py-16 md:grid-cols-[0.9fr_1.1fr]">
          <div className="max-w-2xl">
            <p className="mb-5 inline-flex border-l-4 border-obs-copper pl-4 text-sm font-bold uppercase text-obs-sand">
              Service advisor
            </p>
            <h1 className="font-display text-5xl leading-[0.98] text-obs-fog md:text-7xl">
              Clear answers before the detail starts.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-obs-sand">
              Know what OBS needs before arrival, what can change a quote, and how to keep the finish looking right
              after the appointment.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              {signals.map((signal) => (
                <span key={signal} className="border border-obs-line bg-obs-ink/60 px-4 py-2 text-sm text-obs-fog">
                  {signal}
                </span>
              ))}
            </div>
          </div>
          <div className="hidden justify-end md:flex">
            <div className="obs-panel obs-rivet w-full max-w-sm p-8 pt-14">
              <p className="text-sm uppercase text-obs-copper">Pre-service check</p>
              <div className="mt-8 space-y-5">
                {signals.map((signal, index) => (
                  <div key={signal} className="flex items-center gap-4 border-b border-obs-line pb-5 last:border-0">
                    <span className="grid h-10 w-10 place-items-center border border-obs-copper text-sm text-obs-copper">
                      {index + 1}
                    </span>
                    <span className="font-display text-2xl text-obs-fog">{signal}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.35fr_0.65fr]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-sm uppercase text-obs-copper">Before we arrive</p>
              <h2 className="mt-4 font-display text-4xl text-obs-fog">A cleaner booking starts with clear details.</h2>
              <p className="mt-5 leading-7 text-obs-sand">
                These answers cover access, condition, package fit, and aftercare so the job can be scoped honestly
                before the van pulls up.
              </p>
              <Link
                href="/book"
                className="mt-8 inline-block border border-obs-copper px-5 py-3 text-sm font-bold uppercase text-obs-fog transition hover:bg-obs-copper"
              >
                Start booking
              </Link>
            </aside>

            <div className="space-y-10">
              {questions.map((section) => (
                <div key={section.group}>
                  <div className="mb-4 flex items-center gap-4">
                    <span className="h-px flex-1 bg-obs-line" />
                    <h3 className="font-display text-3xl text-obs-fog">{section.group}</h3>
                  </div>
                  <div className="divide-y divide-obs-line border-y border-obs-line">
                    {section.items.map((item) => (
                      <details key={item.question} className="group">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left font-display text-2xl text-obs-fog">
                          {item.question}
                          <span className="grid h-9 w-9 shrink-0 place-items-center border border-obs-copper text-obs-copper transition group-open:rotate-45">
                            +
                          </span>
                        </summary>
                        <p className="max-w-3xl pb-6 leading-8 text-obs-sand">{item.answer}</p>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
