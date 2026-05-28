const faqs = [
  ["What areas do you service?", "We provide mobile detailing throughout the Greater Toronto Area and confirm availability for nearby locations on request."],
  ["Which services can be booked online right away?", "Standard interior, full detail, and selected add-on services can go directly to the booking path when no review flags are triggered."],
  ["Do ceramic or correction services need a deposit?", "Yes. Higher-value services can require a deposit before the slot is locked in."],
  ["Do you work on vans, trucks, boats, or RVs?", "Yes, but larger and specialty vehicles move through a review path so pricing and timing stay accurate."],
  ["What happens if the weather turns?", "Exterior-facing appointments may be rescheduled for better conditions, with priority rebooking." ]
];

export function FaqListSection() {
  return (
    <div className="grid gap-4">
      {faqs.map(([question, answer]) => (
        <div key={question} className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <h3 className="text-lg font-semibold text-obs-fog">{question}</h3>
          <p className="mt-3 text-sm leading-7 text-obs-fog/72">{answer}</p>
        </div>
      ))}
    </div>
  );
}
