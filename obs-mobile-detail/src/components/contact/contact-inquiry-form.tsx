"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "@/lib/site";

const vehicleOptions = [
  "Sedan",
  "Coupe",
  "SUV",
  "Pickup Truck",
  "Van",
  "Boat / RV / Specialty"
];

const serviceOptions = [
  "Mobile Detailing",
  "Interior Detail",
  "Full Detail",
  "Paint Correction",
  "Ceramic Coating",
  "Oil Change",
  "Tire Service",
  "Custom Quote"
];

export function ContactInquiryForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [vehicleType, setVehicleType] = useState(vehicleOptions[0]);
  const [serviceNeeded, setServiceNeeded] = useState(serviceOptions[0]);
  const [details, setDetails] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const subject = encodeURIComponent(`OBS inquiry: ${serviceNeeded}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Vehicle Type: ${vehicleType}`,
        `Service Needed: ${serviceNeeded}`,
        "",
        "Vehicle details / questions:",
        details || "No extra details provided."
      ].join("\n")
    );

    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-obs-fog/78">
          <span>Name</span>
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-obs-fog outline-none transition focus:border-obs-sand/60"
          />
        </label>
        <label className="space-y-2 text-sm text-obs-fog/78">
          <span>Phone</span>
          <input
            required
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-obs-fog outline-none transition focus:border-obs-sand/60"
          />
        </label>
      </div>
      <label className="space-y-2 text-sm text-obs-fog/78">
        <span>Email</span>
        <input
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-obs-fog outline-none transition focus:border-obs-sand/60"
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-obs-fog/78">
          <span>Vehicle Type</span>
          <select
            value={vehicleType}
            onChange={(event) => setVehicleType(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-obs-fog outline-none transition focus:border-obs-sand/60"
          >
            {vehicleOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2 text-sm text-obs-fog/78">
          <span>Service Needed</span>
          <select
            value={serviceNeeded}
            onChange={(event) => setServiceNeeded(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-obs-fog outline-none transition focus:border-obs-sand/60"
          >
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="space-y-2 text-sm text-obs-fog/78">
        <span>Tell us about your vehicle</span>
        <textarea
          rows={5}
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-obs-fog outline-none transition focus:border-obs-sand/60"
          placeholder="Vehicle condition, preferred timing, condo parking details, or the service you want quoted."
        />
      </label>
      <button type="submit" className="button-primary w-full sm:w-auto">
        Send Inquiry
      </button>
    </form>
  );
}
