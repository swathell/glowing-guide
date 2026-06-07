export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  related?: string[];
};

export type FaqCategory = {
  id: string;
  title: string;
  description: string;
  icon: "booking" | "service" | "area" | "vehicle";
  items: FaqItem[];
};

export const faqCategories: FaqCategory[] = [
  {
    id: "booking-scheduling",
    title: "Booking & Scheduling",
    description: "Answers about booking, deposits, rescheduling, and appointment timing.",
    icon: "booking",
    items: [
      {
        id: "how-do-i-book",
        question: "How do I book?",
        answer:
          "The fastest option is to book online through our booking page. If you are not sure which package fits your vehicle, you can also call, text, or send a quote request and we will help you choose the right service."
      },
      {
        id: "can-i-reschedule",
        question: "Can I reschedule?",
        answer:
          "Yes. If something changes, reach out as early as possible and we will help move your appointment to the next available time that works."
      },
      {
        id: "do-i-need-a-deposit",
        question: "Do I need to pay a deposit?",
        answer:
          "Most standard detailing appointments can be booked without a deposit. Higher-value services such as ceramic coating or correction work may require one before the appointment is locked in."
      },
      {
        id: "how-long-does-detail-take",
        question: "How long does detailing take?",
        answer:
          "Most vehicles take between 2 and 5 hours depending on size, condition, and the package selected. We will give you a clearer time estimate before your appointment when we know what the vehicle needs."
      }
    ]
  },
  {
    id: "services",
    title: "Services",
    description: "What is included, what can be booked online, and how to choose the right service.",
    icon: "service",
    items: [
      {
        id: "what-services-do-you-offer",
        question: "What services do you offer?",
        answer:
          "We offer mobile interior and exterior detailing, full details, maintenance details, selected add-ons, ceramic coating, paint correction, oil changes, tire services, and some specialty vehicle work depending on condition and scope."
      },
      {
        id: "can-i-book-everything-online",
        question: "Can I book everything online?",
        answer:
          "Most standard detailing services can be booked online right away. Larger vehicles, specialty jobs, and some premium correction or coating work may go through a short review process first so pricing and timing stay accurate."
      },
      {
        id: "do-you-offer-ceramic-coating",
        question: "Do you offer ceramic coating?",
        answer:
          "Yes. We offer ceramic coating and related paint protection services. Because preparation and condition matter so much, we may confirm the vehicle condition or request photos before finalizing the appointment."
      },
      {
        id: "whats-included-in-full-detail",
        question: "What’s included in a full detail?",
        answer:
          "A full detail usually includes a much deeper interior and exterior reset than a basic wash. The exact scope depends on the package, but it can include vacuuming, wipe-downs, stain treatment, glass cleaning, wheel cleaning, hand washing, trim attention, and protective finishing steps."
      }
    ]
  },
  {
    id: "service-areas",
    title: "Service Areas",
    description: "Where we go, how far we travel, and what to expect for location-based service.",
    icon: "area",
    items: [
      {
        id: "what-areas-do-you-service",
        question: "What areas do you service?",
        answer:
          "We provide mobile service across Toronto, Mississauga, Vaughan, Brampton, Markham, Richmond Hill, Oakville, North York, Scarborough, and nearby GTA areas depending on availability."
      },
      {
        id: "do-you-travel-outside-gta",
        question: "Do you travel outside the GTA?",
        answer:
          "In some cases, yes. If you are outside our normal coverage zone, send us your location and we will confirm whether we can accommodate it and whether any travel fee applies."
      },
      {
        id: "do-i-need-water-power",
        question: "Do I need access to water or power?",
        answer:
          "That depends on the service and the setup at your location. In many cases we can work with a straightforward mobile setup, but if a service needs something specific we will tell you before the appointment."
      },
      {
        id: "what-if-it-rains",
        question: "What happens if it rains on my appointment day?",
        answer:
          "If the weather affects the quality of the service, especially for exterior work, we will reach out and reschedule for the next suitable time. We want the result to be worth the appointment, not rushed through bad conditions."
      }
    ]
  },
  {
    id: "vehicle-types",
    title: "Vehicle Types",
    description: "Questions about larger vehicles, specialty jobs, and condition-based pricing.",
    icon: "vehicle",
    items: [
      {
        id: "do-you-work-on-trucks-vans",
        question: "Do you work on trucks and vans?",
        answer:
          "Yes. Larger vehicles can require extra time and labor, so pricing may be adjusted depending on size, condition, and service scope."
      },
      {
        id: "do-you-detail-boats-rvs",
        question: "Do you detail boats or RVs?",
        answer:
          "Yes, but those usually go through a review path first. We may ask for a few details or photos so we can quote the work properly."
      },
      {
        id: "what-if-my-vehicle-is-heavily-soiled",
        question: "What if my vehicle is heavily soiled?",
        answer:
          "That is exactly the kind of situation where photos or a quick review help. Heavy pet hair, deep staining, salt buildup, mold concerns, or major exterior contamination can change the time and pricing needed to do the job properly."
      }
    ]
  }
];

export const mostAskedQuestionIds = [
  "how-do-i-book",
  "how-long-does-detail-take",
  "what-areas-do-you-service",
  "do-i-need-water-power"
];

export const faqStats = [
  { label: "Common Questions", value: "15+" },
  { label: "Service Area", value: "Across the GTA" },
  { label: "Typical Reply", value: "Within 30 Minutes" }
];

export const serviceAreaChips = [
  "Toronto",
  "Mississauga",
  "Vaughan",
  "Brampton",
  "Markham",
  "Richmond Hill"
];

export const allFaqItems = faqCategories.flatMap((category) =>
  category.items.map((item) => ({
    ...item,
    categoryId: category.id,
    categoryTitle: category.title
  }))
);
