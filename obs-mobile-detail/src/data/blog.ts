export type BlogSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  summary: string;
  excerpt: string;
  coverImage: string;
  coverAlt: string;
  imagePosition?: string;
  featured?: boolean;
  content: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "mobile-detailing-gta-guide",
    title: "The Complete Guide to Mobile Detailing in the GTA",
    date: "June 5, 2026",
    category: "MOBILE SERVICE",
    readTime: "6 min read",
    summary:
      "Not sure what mobile detailing includes, how long it takes, or whether it works at your home or office? This guide explains what GTA drivers can expect and when mobile service makes the most sense.",
    excerpt:
      "Mobile detailing works best when you want professional results without losing half a day at a shop. Here’s what the service includes, where it works best, and how to choose the right package.",
    coverImage: "/images/blog/mobile-detailing-guide-cropped.png",
    coverAlt: "OBS mobile detailing setup beside a freshly detailed vehicle",
    featured: true,
    content: [
      {
        paragraphs: [
          "Mobile detailing gives you the convenience of professional car care without the wait, the shop trip, or the hassle of rearranging your day.",
          "For many GTA drivers, the biggest benefit is simple: the work happens where the vehicle already is. That could be at home, in a condo parking space, or outside the office while you keep moving through the day."
        ]
      },
      {
        heading: "What mobile detailing usually includes",
        paragraphs: [
          "A proper mobile detail goes well beyond a quick wash. Depending on the package, it can include interior vacuuming, wipe-downs, shampooing, stain treatment, glass cleaning, wheel cleaning, hand washing, tire dressing, and paint-safe finishing work.",
          "Some vehicles only need a maintenance refresh. Others need a deeper reset after winter, road salt, spills, pet hair, or heavy daily use."
        ]
      },
      {
        heading: "When it makes the most sense",
        bullets: [
          "You want your vehicle cleaned without driving to a shop",
          "You have a busy workday and need service at home or the office",
          "Your interior needs deeper attention than a regular wash can provide",
          "You want a seasonal reset before or after winter",
          "You care about maintaining resale value and overall presentation"
        ]
      },
      {
        heading: "How to choose the right package",
        paragraphs: [
          "If the vehicle is in generally good shape, a maintenance-level service is usually enough. If there is embedded dirt, pet hair, stains, salt buildup, or neglected trim, a more complete detail will make a bigger difference.",
          "When in doubt, the best approach is to send photos or ask for a recommendation before booking. That keeps expectations clear and helps match the package to the condition of the vehicle."
        ]
      },
      {
        heading: "Final thought",
        paragraphs: [
          "The right mobile detailing service should save time, improve the condition of your vehicle, and make the whole process feel straightforward. That is what most drivers are really looking for."
        ]
      }
    ]
  },
  {
    slug: "nano-ceramic-coating-guide",
    title: "The Ultimate Guide to Nano Ceramic Coating: Why It’s a Game-Changer",
    date: "December 15, 2024",
    category: "CERAMIC COATING",
    readTime: "7 min read",
    summary:
      "Ceramic coating is one of the most asked-about premium services for a reason. This guide breaks down what it does, who it helps most, and why many drivers choose it for long-term paint protection.",
    excerpt:
      "If you want better gloss, stronger protection, and less day-to-day maintenance, ceramic coating is one of the smartest upgrades you can make to your vehicle’s exterior.",
    coverImage: "/images/gallery/gallery-06.png",
    coverAlt: "Glossy black vehicle reflecting light after detailing protection service",
    content: [
      {
        paragraphs: [
          "In the world of automotive care, innovations like nano ceramic coatings have revolutionized how we protect and maintain our vehicles. If you’re looking for the ultimate way to preserve your car’s paint, enhance its appearance, and reduce maintenance, nano ceramic coating is the answer. Let’s dive into what makes this technology so special and why it’s worth considering for your vehicle."
        ]
      },
      {
        heading: "What Is Nano Ceramic Coating?",
        paragraphs: [
          "Nano ceramic coating is a liquid polymer applied to a vehicle’s exterior. The coating chemically bonds with the factory paint, creating a semi-permanent layer of protection. Unlike traditional waxes or sealants, ceramic coatings are engineered using nanotechnology to fill in microscopic imperfections, forming a hydrophobic and ultra-durable surface."
        ]
      },
      {
        heading: "Key Benefits of Nano Ceramic Coating",
        bullets: [
          "Unmatched Protection: Nano ceramic coatings provide superior protection against environmental contaminants such as UV rays, acid rain, bird droppings, tree sap, and road salt. This protective barrier shields your car’s paint from damage and deterioration.",
          "Hydrophobic Properties: The hydrophobic nature of ceramic coatings causes water, dirt, and grime to bead up and roll off the surface effortlessly. This means fewer washes and easier cleaning for you.",
          "Enhanced Gloss and Shine: A ceramic coating gives your vehicle a stunning, mirror-like finish that enhances its color and depth. It’s like having a showroom-quality shine every day.",
          "Long-Lasting Durability: While traditional waxes last only a few months, nano ceramic coatings can last years with proper care. This long-term durability saves you time and money in the long run.",
          "Resists Minor Scratches and Swirl Marks: Ceramic coatings create a harder surface that can resist minor scratches and swirl marks caused by washing or environmental debris."
        ]
      },
      {
        heading: "Is Nano Ceramic Coating Right for You?",
        paragraphs: ["If you’re serious about maintaining your car’s appearance and protecting your investment, ceramic coating is a worthwhile consideration. It’s especially beneficial for:"],
        bullets: [
          "Luxury and high-performance cars",
          "Vehicles exposed to harsh weather conditions",
          "Drivers looking to reduce cleaning and maintenance time"
        ]
      },
      {
        heading: "What to Expect During the Application Process",
        bullets: [
          "Preparation: The car is thoroughly washed and decontaminated to remove dirt, tar, and other residues. Paint correction may also be performed to eliminate scratches or imperfections.",
          "Application: The coating is carefully applied in sections and allowed to cure. This process ensures a strong bond with the paint.",
          "Curing Time: After application, the coating needs time to fully cure, which can range from 24 to 48 hours depending on the product and conditions."
        ]
      },
      {
        heading: "Common Myths About Ceramic Coatings",
        bullets: [
          "It’s Scratch-Proof: While ceramic coatings are highly resistant to scratches, they’re not completely scratch-proof. Proper care is still essential.",
          "It’s Maintenance-Free: A ceramic-coated car requires less maintenance, but regular washing with appropriate products is still necessary to keep it looking its best.",
          "It’s a One-Time Application: Ceramic coatings last for years but are not permanent. Reapplication may be needed after a few years, depending on usage and exposure."
        ]
      },
      {
        heading: "Final Thoughts",
        paragraphs: [
          "Nano ceramic coating is more than just a protective layer; it’s an investment in your vehicle’s longevity and beauty. With its superior protection, hydrophobic properties, and stunning finish, it’s no wonder ceramic coatings have become a popular choice for car enthusiasts and everyday drivers alike.",
          "Ready to elevate your car care game? Contact us today to learn more about our professional nano ceramic coating services and give your vehicle the protection it deserves!"
        ]
      }
    ]
  },
  {
    slug: "winter-interior-detailing-toronto",
    title: "Why Interior Detailing Matters More During Toronto Winters",
    date: "January 18, 2026",
    category: "WINTER MAINTENANCE",
    readTime: "5 min read",
    summary:
      "Winter driving leaves behind salt, moisture, slush, and grime that build up faster than most people realize. This guide explains why cold-weather interior care matters and when to book it.",
    excerpt:
      "Toronto winters are rough on interiors. Salt, wet mats, and trapped moisture can make a clean vehicle feel worn down fast if you leave it too long.",
    coverImage: "/images/gallery/gallery-10.png",
    coverAlt: "Vehicle interior cleaned and restored after heavy seasonal use",
    content: [
      {
        paragraphs: [
          "Toronto winters are hard on vehicle interiors. Salt, slush, wet shoes, and damp floor mats build up quickly, and even a newer car can start looking neglected if it goes too long without a proper reset."
        ]
      },
      {
        heading: "What winter leaves behind",
        bullets: [
          "White salt residue on mats and carpets",
          "Moisture trapped under liners and seats",
          "Cloudy interior glass",
          "Extra wear on leather, vinyl, and trim",
          "Lingering odors from wet conditions"
        ]
      },
      {
        heading: "When to book",
        paragraphs: [
          "A mid-winter cleanup helps control buildup before it gets deeply embedded. A second detail near the end of winter is often the best way to reset the interior and stop salt from hanging around into spring."
        ]
      }
    ]
  },
  {
    slug: "difference-between-car-wash-and-full-detail",
    title: "What Is the Difference Between a Car Wash and a Full Detail?",
    date: "February 8, 2026",
    category: "VEHICLE CARE",
    readTime: "4 min read",
    summary:
      "A wash and a detail are not the same thing. If you’re deciding how much service your vehicle really needs, this guide breaks down the difference in a practical way.",
    excerpt:
      "A quick wash helps with surface dirt. A full detail is about restoring, protecting, and cleaning the parts of the vehicle that everyday washing leaves behind.",
    coverImage: "/images/gallery/gallery-03.png",
    coverAlt: "Freshly washed exterior with detailed finish and clean wheels",
    content: [
      {
        paragraphs: [
          "A standard car wash is mainly about removing surface dirt. A full detail goes much deeper. It focuses on the areas people live with every day, from carpets and trim to wheels, paint finish, glass, and hard-to-reach buildup."
        ]
      },
      {
        heading: "What a wash usually handles",
        bullets: [
          "Basic exterior dirt",
          "Quick rinse and soap application",
          "A short-term cleaner appearance"
        ]
      },
      {
        heading: "What a full detail adds",
        bullets: [
          "Deep interior cleaning",
          "Targeted stain and residue removal",
          "Wheel, trim, and glass attention",
          "Paint-safe hand work and protection steps",
          "A more complete reset overall"
        ]
      }
    ]
  },
  {
    slug: "five-signs-you-need-professional-interior-cleaning",
    title: "5 Signs Your Vehicle Needs Professional Interior Cleaning",
    date: "March 2, 2026",
    category: "INTERIOR CARE",
    readTime: "4 min read",
    summary:
      "A vehicle does not have to look destroyed to need real interior work. Here are five signs it is time to go beyond a quick vacuum and wipe-down.",
    excerpt:
      "If odors keep coming back, stains are setting in, or the interior never quite feels clean, that is usually the moment a deeper service starts making sense.",
    coverImage: "/images/gallery/gallery-12.png",
    coverAlt: "Cleaned vehicle seats and center console after interior detailing",
    content: [
      {
        heading: "Common signs",
        bullets: [
          "Odors return quickly after surface cleaning",
          "Pet hair or sand is stuck deep in the fabric",
          "Spills have left stains or sticky residue",
          "Interior glass clouds up faster than usual",
          "The vehicle still feels dusty after you clean it"
        ]
      },
      {
        paragraphs: [
          "When buildup gets embedded, at-home cleaning usually handles the surface but not the source. That is where a proper interior detail makes the biggest difference."
        ]
      }
    ]
  },
  {
    slug: "best-time-to-detail-your-vehicle",
    title: "When Is the Best Time to Detail Your Vehicle?",
    date: "April 14, 2026",
    category: "PAINT PROTECTION",
    readTime: "3 min read",
    summary:
      "The best time to book is usually tied to season, condition, and how you use the vehicle. This short guide helps drivers plan details at the right time instead of waiting too long.",
    excerpt:
      "Most vehicles benefit from a detail before winter, after winter, and anytime the interior or paint starts slipping past what regular upkeep can recover.",
    coverImage: "/images/gallery/gallery-08.png",
    coverAlt: "Vehicle paint reflecting light after a fresh exterior detail",
    content: [
      {
        paragraphs: [
          "For most drivers, the smartest times to book are before winter, after winter, and before big seasonal stretches of travel or daily heavy use."
        ]
      },
      {
        heading: "Good times to book",
        bullets: [
          "Before winter road salt starts building up",
          "After winter when the vehicle needs a reset",
          "Before selling or trading in the vehicle",
          "After a long road-trip or family-use season"
        ]
      }
    ]
  }
];

export const featuredBlogPost =
  blogPosts.find((post) => post.featured) ?? blogPosts[0];

export const latestBlogPosts = blogPosts.filter(
  (post) => post.slug !== featuredBlogPost.slug
);

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
