export type Testimonial = {
  name: string;
  service: string;
  quote: string;
  date: string;
  vehicle?: string;
  location?: string;
  featured?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    name: "Sophia L",
    service: "Mobile Detail",
    quote:
      "From the moment they arrived, I knew I was in good hands. They were friendly, professional, and left my car spotless. The convenience of mobile service can't be beat.",
    date: "August 26, 2024",
    vehicle: "Sedan",
    location: "Toronto",
    featured: true
  },
  {
    name: "Jessica T",
    service: "Full Detail",
    quote:
      "OBS Car Detailing is simply amazing! They came right to my house and made my car look brand new. The attention to detail was incredible, and I couldn't be happier with the results. Highly recommend!",
    date: "August 26, 2024",
    vehicle: "Daily Driver",
    location: "Mississauga"
  },
  {
    name: "Ryan M",
    service: "Premium Package",
    quote:
      "I booked the premium package, and it was worth every penny. My car hasn't looked this good in years. The crew was professional, and the convenience of them coming to me was a game-changer.",
    date: "August 26, 2024",
    vehicle: "SUV",
    location: "Vaughan"
  },
  {
    name: "Ahmed S",
    service: "Ceramic Coating",
    quote:
      "If you care about your car, OBS Car Detailing is the only choice. They treated my car with such care and precision. The ceramic coating they applied has my car shining like never before!",
    date: "August 26, 2024",
    vehicle: "Coupe",
    location: "Markham"
  },
  {
    name: "Sophia L",
    service: "Interior Reset",
    quote:
      "They were on time, easy to deal with, and the final result felt genuinely professional. My vehicle looked fresh again and the whole process was simple from start to finish.",
    date: "August 26, 2024",
    vehicle: "Compact SUV",
    location: "North York"
  },
  {
    name: "Jessica T",
    service: "Interior + Exterior Detail",
    quote:
      "The mobile setup was smooth, communication was clear, and they paid attention to the details that usually get missed. It felt like a proper premium service, not a rushed wash.",
    date: "August 26, 2024",
    vehicle: "Sedan",
    location: "Brampton"
  }
];
