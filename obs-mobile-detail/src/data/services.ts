export type ServiceAvailability = "book-online" | "call-to-schedule" | "add-on-first";

export type ServicePackage = {
  name: string;
  price: string;
  duration?: string;
  summary: string;
  includes?: string[];
  badge?: string;
};

export type ServiceGroup = {
  title: string;
  intro: string;
  packages: ServicePackage[];
};

export type ServiceCategory = {
  slug: string;
  name: string;
  eyebrow: string;
  hero: string;
  intro: string;
  serviceType: "flagship" | "maintenance" | "support";
  availability: ServiceAvailability;
  priceFrom: string;
  highlight: string;
  proofNote: string;
  idealFor: string[];
  groups: ServiceGroup[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "detailing",
    name: "Mobile Detailing",
    eyebrow: "Flagship Service",
    hero: "Premium mobile detailing built to do the visual heavy lifting for the whole brand.",
    intro:
      "Detailing stays at the center of the site because it carries the strongest proof, the richest results, and the clearest emotional payoff. The packages below are the most image-led, trust-led part of the catalog.",
    serviceType: "flagship",
    availability: "book-online",
    priceFrom: "$99.99",
    highlight: "The strongest proof-led category with the clearest before-and-after payoff.",
    proofNote:
      "This is where gallery, reviews, and premium visuals should do the most conversion work.",
    idealFor: [
      "Drivers who want a routine refresh without leaving home",
      "Families who need a deeper interior reset",
      "Vehicles that need a full visual upgrade before sale or trade-in"
    ],
    groups: [
      {
        title: "Interior Packages",
        intro: "Built for fast maintenance cleans and deeper interior rescue work.",
        packages: [
          {
            name: "Basic Interior Clean",
            price: "$99.99",
            summary: "Vacuum, wipe down, and window clean for a clean everyday cabin.",
            includes: ["Vacuum", "Wipe down", "Windows"],
            badge: "Most approachable"
          },
          {
            name: "Full Interior Detail",
            price: "$179.99",
            summary: "Deep clean with shampoo and stain treatment for higher-condition interiors.",
            includes: ["Deep clean", "Shampoo", "Stain removal"],
            badge: "Best for neglected cabins"
          }
        ]
      },
      {
        title: "Exterior and Full Vehicle Packages",
        intro: "For customers who want the whole vehicle to look noticeably sharper.",
        packages: [
          {
            name: "Full Exterior Detail",
            price: "$149.99",
            summary: "Foam wash, wheels, and tire finish for a cleaner, glossier curb presence.",
            includes: ["Foam wash", "Wheels", "Tire shine"]
          },
          {
            name: "Complete Detail",
            price: "$249.99",
            summary: "Interior and exterior service paired together for the clearest overall transformation.",
            includes: ["Interior + exterior"]
          },
          {
            name: "Premium Detail",
            price: "$299.99",
            summary: "Full detail plus wax and odor removal for the highest standard routine package.",
            includes: ["Full detail", "Wax", "Odor removal"],
            badge: "Top-tier package"
          }
        ]
      }
    ]
  },
  {
    slug: "oil-change",
    name: "Oil Change Services",
    eyebrow: "Maintenance Service",
    hero: "Mobile oil change services positioned for clarity, speed, and professional trust.",
    intro:
      "Oil changes need a calmer, more utility-driven interface than detailing. The goal is fast scanning, clear inclusions, and confidence that the service is simple to schedule.",
    serviceType: "maintenance",
    availability: "call-to-schedule",
    priceFrom: "$79.99",
    highlight: "Operational, fast to compare, and designed for repeat maintenance customers.",
    proofNote:
      "This category should emphasize convenience, dependability, and professional handling rather than dramatic visuals.",
    idealFor: [
      "Routine maintenance without a shop visit",
      "Busy drivers who want mobile convenience",
      "Customers who want an inspection-forward option"
    ],
    groups: [
      {
        title: "Oil Change Packages",
        intro: "A short comparison set built to be understood in seconds.",
        packages: [
          {
            name: "Conventional",
            price: "$79.99",
            summary: "Straightforward oil and filter service for standard maintenance needs.",
            includes: ["Oil", "Filter"]
          },
          {
            name: "Synthetic Blend",
            price: "$99.99",
            summary: "Oil, filter, and inspection for customers who want slightly broader coverage.",
            includes: ["Oil", "Filter", "Inspection"]
          },
          {
            name: "Full Synthetic",
            price: "$119.99",
            summary: "Premium oil and filter service for higher-performance or longer-interval needs.",
            includes: ["Premium oil", "Filter"]
          },
          {
            name: "Oil + Inspection",
            price: "$139.99",
            summary: "Full check service for customers who want maintenance plus a clearer vehicle status read.",
            includes: ["Oil", "Full inspection"],
            badge: "Best for cautious owners"
          }
        ]
      }
    ]
  },
  {
    slug: "tire-services",
    name: "Tire Services",
    eyebrow: "Mobile Utility",
    hero: "At-home tire services that should feel seasonal, practical, and easy to act on.",
    intro:
      "Tire services are a utility-first category. The interface should sell convenience and competence, especially for seasonal swaps and quick at-home service.",
    serviceType: "maintenance",
    availability: "call-to-schedule",
    priceFrom: "$39.99",
    highlight: "Strong seasonal-use category with a clear convenience story.",
    proofNote:
      "Use this category to emphasize time saved and the ease of mobile service rather than luxury language.",
    idealFor: [
      "Seasonal tire swap customers",
      "SUV and truck owners with larger wheels",
      "Drivers who want quick at-home maintenance support"
    ],
    groups: [
      {
        title: "Core Tire Services",
        intro: "Compact, easy-to-compare options that work well in a utility-style layout.",
        packages: [
          {
            name: "Car Tire Swap",
            price: "$69.99",
            summary: "On-rim swap for standard cars.",
            includes: ["On-rim swap"]
          },
          {
            name: "SUV/Truck Swap",
            price: "$89.99",
            summary: "On-rim swap priced for larger vehicles.",
            includes: ["On-rim swap for larger vehicles"]
          },
          {
            name: "Mobile Tire Service",
            price: "$109.99",
            summary: "At-home tire service where convenience is the main draw.",
            includes: ["At-home service"]
          },
          {
            name: "Pressure Check",
            price: "$39.99",
            summary: "Quick pressure adjustment and check for routine upkeep.",
            includes: ["Pressure adjustment"]
          }
        ]
      }
    ]
  },
  {
    slug: "extras",
    name: "Extras & Add-Ons",
    eyebrow: "Support Layer",
    hero: "Add-ons should feel like useful finishers and maintenance enhancers, not a cluttered junk drawer.",
    intro:
      "Extras are best presented as targeted enhancements. Some pair naturally with detailing, while others belong beside oil change or tire services. The structure should make those pairings obvious.",
    serviceType: "support",
    availability: "add-on-first",
    priceFrom: "$15",
    highlight: "High-clarity add-ons that improve the average ticket without confusing the core offer.",
    proofNote:
      "The best extras are surfaced both here and contextually on their parent category pages.",
    idealFor: [
      "Customers adding finishing touches to a main service",
      "Vehicle owners who need one small targeted fix",
      "Upsells that feel relevant rather than forced"
    ],
    groups: [
      {
        title: "Detailing Extras",
        intro: "Enhancements that naturally pair with cabin, exterior, and full-detail packages.",
        packages: [
          { name: "Pet Hair Removal", price: "$30", summary: "Deep extraction for hair-heavy interiors." },
          { name: "Heavy Stains", price: "$40", summary: "Extra shampoo treatment for stubborn spots." },
          { name: "Engine Bay Clean", price: "$50", summary: "Degrease and wash for cleaner presentation." },
          { name: "Headlight Restore", price: "$40", summary: "Restore clarity and improve appearance." },
          { name: "Odor Removal", price: "$50", summary: "Smoke and odor treatment for a fresher cabin." },
          { name: "Clay Bar", price: "$60", summary: "Paint prep before protection work." },
          { name: "Wax Add-On", price: "$40", summary: "Additional protection and finish boost." }
        ]
      },
      {
        title: "Maintenance Extras",
        intro: "Quick add-ons that increase value around oil and tire service visits.",
        packages: [
          { name: "Cabin Filter", price: "$25", summary: "Replace cabin air filter." },
          { name: "Engine Filter", price: "$30", summary: "Replace engine air filter." },
          { name: "Fluid Top-Up", price: "$20", summary: "Top up service fluids." },
          { name: "Brake Check", price: "$25", summary: "Basic brake inspection." },
          { name: "Battery Test", price: "$15", summary: "Quick electrical battery test." },
          { name: "Inspection Report", price: "$40", summary: "Full written service report." },
          { name: "Tire Rotation", price: "$25", summary: "Rotate wheels during service." },
          { name: "Wheel Cleaning", price: "$30", summary: "Deeper clean for wheels." },
          { name: "Brake Dust Clean", price: "$25", summary: "Remove built-up brake dust." },
          { name: "Tire Shine", price: "$20", summary: "Finish tires with a cleaner dressed look." }
        ]
      }
    ]
  }
];
