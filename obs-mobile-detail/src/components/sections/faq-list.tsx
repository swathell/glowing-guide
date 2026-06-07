"use client";

import { useState } from "react";
import Link from "next/link";
import { faqCategories, faqStats, mostAskedQuestionIds, serviceAreaChips } from "@/data/faq";
import { siteConfig } from "@/lib/site";

function CategoryIcon({ kind }: { kind: "booking" | "service" | "area" | "vehicle" }) {
  const shared = "h-5 w-5 text-obs-sand/82";

  switch (kind) {
    case "booking":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={shared}>
          <rect x="3.5" y="5.5" width="17" height="15" rx="2.5" />
          <path d="M7 3.5v4M17 3.5v4M3.5 10.5h17" />
        </svg>
      );
    case "service":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={shared}>
          <path d="M4 13.5c2.6-5.5 13.4-5.5 16 0" />
          <path d="M6 13.5c0 3.4 2.7 6 6 6s6-2.6 6-6" />
          <path d="M9.5 10.5l1.7-2.2M14.5 10.5l-1.7-2.2" />
        </svg>
      );
    case "area":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={shared}>
          <path d="M12 20s6-5.1 6-10a6 6 0 1 0-12 0c0 4.9 6 10 6 10Z" />
          <circle cx="12" cy="10" r="2.3" />
        </svg>
      );
    case "vehicle":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={shared}>
          <path d="M5 14.5l1.8-4.6A2 2 0 0 1 8.7 8.5h6.6a2 2 0 0 1 1.9 1.4l1.8 4.6" />
          <path d="M4 14.5h16v3a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5v-3Z" />
          <circle cx="7.5" cy="17" r="1" fill="currentColor" stroke="none" />
          <circle cx="16.5" cy="17" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
  }
}

function FaqAccordionItem({
  question,
  answer,
  related,
  open,
  onToggle,
  forceOpen = false
}: {
  question: string;
  answer: string;
  related?: string[];
  open: boolean;
  onToggle: () => void;
  forceOpen?: boolean;
}) {
  const expanded = forceOpen || open;

  return (
    <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] transition hover:border-white/18">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left md:px-6"
        aria-expanded={expanded}
      >
        <span className="pr-4 text-base font-semibold leading-7 text-obs-fog md:text-lg">
          {question}
        </span>
        <span
          className={`mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-lg text-obs-sand transition ${
            expanded ? "rotate-45 border-obs-sand/40 bg-obs-sand/10" : ""
          }`}
        >
          +
        </span>
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-300 ease-out ${
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-70"
        }`}
      >
        <div className="min-h-0">
          <div className="border-t border-white/8 px-5 pb-5 pt-4 md:px-6">
            <p className="text-sm leading-7 text-obs-fog/74 md:text-[15px]">{answer}</p>
            {related && related.length > 0 ? (
              <div className="mt-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-obs-sand/72">
                  Related
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {related.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/8 px-3 py-1 text-xs text-obs-fog/62"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FaqListSection() {
  const [query, setQuery] = useState("");
  const [openItems, setOpenItems] = useState<string[]>(mostAskedQuestionIds.slice(0, 1));

  const normalizedQuery = query.trim().toLowerCase();

  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      items: category.items.filter((item) => {
        if (!normalizedQuery) {
          return true;
        }

        const haystack = `${item.question} ${item.answer} ${category.title}`.toLowerCase();
        return haystack.includes(normalizedQuery);
      })
    }))
    .filter((category) => category.items.length > 0);

  const popularItems = faqCategories
    .flatMap((category) =>
      category.items
        .filter((item) => mostAskedQuestionIds.includes(item.id))
        .map((item) => ({ ...item, categoryTitle: category.title }))
    )
    .sort(
      (a, b) => mostAskedQuestionIds.indexOf(a.id) - mostAskedQuestionIds.indexOf(b.id)
    );

  const toggleItem = (id: string) => {
    setOpenItems((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  return (
    <div className="space-y-12">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <div className="max-w-3xl">
          <p className="eyebrow">Have Questions?</p>
          <h2 className="section-title mt-4">Get quick answers about pricing, service areas, booking, and what to expect.</h2>
          <p className="copy-muted mt-5">
            Answers to common questions about booking, service areas, pricing, and mobile detailing.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <label className="block">
            <span className="sr-only">Search FAQs</span>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/15 px-4 py-4">
              <span className="text-obs-sand/80">Search</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search FAQs..."
                className="w-full bg-transparent text-sm text-obs-fog outline-none placeholder:text-obs-fog/36"
              />
            </div>
          </label>

          <div className="flex flex-wrap gap-3">
            <a href={`tel:${siteConfig.phone}`} className="button-secondary">
              {siteConfig.phone}
            </a>
            <Link href="/book" className="button-primary">
              Book Mobile Detailing
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {faqStats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/8 bg-black/15 p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-obs-sand/78">{stat.label}</p>
              <p className="mt-3 text-lg text-obs-fog">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {!normalizedQuery ? (
        <section className="space-y-5">
          <div>
            <p className="eyebrow">Most Asked Questions</p>
            <h2 className="section-title mt-4">The answers most people want before they book.</h2>
          </div>
          <div className="grid gap-4">
            {popularItems.map((item) => (
              <FaqAccordionItem
                key={item.id}
                question={item.question}
                answer={item.answer}
                related={[item.categoryTitle]}
                open={openItems.includes(item.id)}
                onToggle={() => toggleItem(item.id)}
              />
            ))}
          </div>
        </section>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-obs-sand/78">Categories</p>
            <div className="mt-4 space-y-2">
              {faqCategories.map((category) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-obs-fog/72 transition hover:bg-white/[0.04] hover:text-white"
                >
                  <CategoryIcon kind={category.icon} />
                  <span>{category.title}</span>
                </a>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-white/8 bg-black/15 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-obs-sand/72">Service Areas</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {serviceAreaChips.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-white/8 px-3 py-1 text-xs text-obs-fog/62"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="space-y-8">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <section key={category.id} id={category.id} className="scroll-mt-24">
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 md:p-7">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/15">
                      <CategoryIcon kind={category.icon} />
                    </div>
                    <div>
                      <p className="eyebrow">{category.title}</p>
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-obs-fog/68">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4">
                    {category.items.map((item) => (
                      <FaqAccordionItem
                        key={item.id}
                        question={item.question}
                        answer={item.answer}
                        open={openItems.includes(item.id)}
                        onToggle={() => toggleItem(item.id)}
                        forceOpen={Boolean(normalizedQuery)}
                      />
                    ))}
                  </div>
                </div>
              </section>
            ))
          ) : (
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-8">
              <p className="text-sm uppercase tracking-[0.18em] text-obs-sand/80">No matches</p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-obs-fog/72">
                We couldn&apos;t find a question matching that search. Try words like
                deposit, rain, truck, booking, or ceramic.
              </p>
            </div>
          )}
        </div>
      </div>

      <section className="border-t border-white/8 pt-6">
        <div className="flex flex-col gap-5 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-7 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Still Need Help?</p>
            <h2 className="mt-4 font-display text-3xl text-obs-fog md:text-4xl">
              Didn&apos;t find your answer?
            </h2>
            <p className="mt-4 text-sm leading-7 text-obs-fog/72">
              Call or text us and we&apos;ll help with booking, service selection, or availability.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href={`tel:${siteConfig.phone}`} className="button-secondary">
              {siteConfig.phone}
            </a>
            <Link href="/book" className="button-primary">
              Book Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
