export type ServiceCategory = {
  slug: string;
  name: string;
  intro: string;
  hero: string;
  serviceType: "direct-book" | "deposit" | "manual-review";
  packages: {
    name: string;
    price: string;
    duration: string;
    summary: string;
  }[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "interior-detailing",
    name: "Interior Detailing",
    hero: "Interior detailing at your location across the GTA",
    intro:
      "Routine refreshes and deeper cabin resets built around real vehicle condition, not one-size-fits-all promises.",
    serviceType: "direct-book",
    packages: [
      {
        name: "Basic Interior Detail",
        price: "C$150",
        duration: "1.5 hrs",
        summary: "Vacuum, surfaces, windows, seats, crevices, and a clean everyday reset."
      },
      {
        name: "Premium Interior Detail",
        price: "C$200",
        duration: "2.5 hrs",
        summary: "Adds shampoo, stain extraction, steam cleaning, and deeper crevice work."
      }
    ]
  },
  {
    slug: "full-detail",
    name: "Full Detail",
    hero: "Complete interior and exterior detailing done at your convenience",
    intro:
      "A full-vehicle reset for drivers who want the most visible improvement in one appointment.",
    serviceType: "direct-book",
    packages: [
      {
        name: "Basic Full Detail",
        price: "C$200",
        duration: "3 hrs",
        summary: "Interior refresh paired with a careful exterior wash, wheel clean, and finish work."
      },
      {
        name: "Premium Full Detail",
        price: "C$250",
        duration: "4 hrs",
        summary: "Adds deeper interior treatment and exterior decontamination for a more complete reset."
      }
    ]
  },
  {
    slug: "ceramic-protection",
    name: "Ceramic & Protection",
    hero: "Protection that keeps your vehicle looking sharper for longer",
    intro:
      "Coating services for drivers who want easier upkeep, stronger gloss, and better surface protection.",
    serviceType: "deposit",
    packages: [
      {
        name: "Exterior Ceramic Coating",
        price: "C$275",
        duration: "2.5 hrs",
        summary: "Ceramic protection without paint correction for vehicles already in strong condition."
      },
      {
        name: "Correction + Ceramic Coating",
        price: "C$525",
        duration: "5-6 hrs",
        summary: "Paint improvement plus durable protection for a stronger finish overall."
      },
      {
        name: "Wheel & Tire Coating",
        price: "C$100",
        duration: "1 hr",
        summary: "Targeted wheel and tire protection for easier cleaning and a cleaner finish."
      },
      {
        name: "Windshield Coating",
        price: "C$100",
        duration: "1 hr",
        summary: "Improves surface behavior and visibility in rough weather."
      }
    ]
  },
  {
    slug: "paint-correction",
    name: "Paint Correction",
    hero: "Restore gloss, clarity, and fewer visible defects",
    intro:
      "Multi-stage paint correction packages based on finish goals, defect level, and available time.",
    serviceType: "deposit",
    packages: [
      {
        name: "1-Step Correction",
        price: "C$250",
        duration: "3-4 hrs",
        summary: "A practical improvement pass for everyday swirl and haze reduction."
      },
      {
        name: "2-Step Correction",
        price: "C$350",
        duration: "5-6 hrs",
        summary: "Deeper improvement with stronger clarity and more visible defect removal."
      },
      {
        name: "3-Step Correction",
        price: "C$450",
        duration: "7-8 hrs",
        summary: "Highest correction tier for customers chasing the cleanest achievable finish."
      }
    ]
  },
  {
    slug: "specialty-vehicles",
    name: "Specialty Vehicles",
    hero: "Boat, RV, and food truck detailing with proper review before booking",
    intro:
      "Larger, commercial, and specialty vehicles stay in the catalog, but move through a more careful review path.",
    serviceType: "manual-review",
    packages: [
      {
        name: "Boat Detailing",
        price: "From C$275",
        duration: "2-3 hrs",
        summary: "Mobile detailing for boats with pricing finalized after scope review."
      },
      {
        name: "RV Detailing",
        price: "From C$425",
        duration: "4-5 hrs",
        summary: "Larger vehicle detailing with access, size, and condition confirmed first."
      },
      {
        name: "Food Truck Detailing",
        price: "From C$525",
        duration: "4.5-6 hrs",
        summary: "Request-quote flow for mobile kitchens and other commercial units."
      }
    ]
  }
];

export const addOns = [
  {
    name: "Headlight Restoration",
    price: "C$60",
    duration: "1 hr"
  },
  {
    name: "Engine Bay Cleaning",
    price: "C$50",
    duration: "1 hr"
  }
];
