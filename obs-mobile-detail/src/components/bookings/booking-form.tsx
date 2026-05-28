"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { bookingPackages } from "@/lib/booking/config";
import { BookingClassification, BookingMode } from "@/lib/booking/types";
import { formatCurrency } from "@/lib/booking/helpers";
import { ApiFailure, ApiSuccess, safeJson } from "@/lib/http";
import { trackEvent } from "@/lib/client-analytics";
import { cn } from "@/lib/utils";

type UploadResult = {
  path: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  photoKind: string;
};

function getApiErrorMessage(payload: ApiFailure | { ok: true } | null, fallback: string) {
  if (payload && payload.ok === false) {
    return payload.error;
  }

  return fallback;
}

type FormState = {
  servicePackageId: string;
  vehicle: {
    vehicleType: string;
    vehicleMake: string;
    vehicleModel: string;
    vehicleYear: string;
  };
  conditions: {
    petHair: boolean;
    heavyStains: boolean;
    odor: boolean;
    moldOrBiohazard: boolean;
    heavySaltBuildup: boolean;
    heavyExteriorContamination: boolean;
    customScopeRequested: boolean;
    interiorConditionLevel: "standard" | "moderate" | "heavy";
    exteriorConditionLevel: "standard" | "moderate" | "heavy";
  };
  location: {
    city: string;
    postalCode: string;
    address: string;
    locationType: "home" | "condo" | "office" | "commercial" | "other";
    accessNotes: string;
  };
  schedule: {
    preferredDate: string;
    preferredTimeSlot: string;
    requestedDateRangeStart: string;
    requestedDateRangeEnd: string;
  };
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    preferredContactMethod: "phone" | "text" | "email" | "whatsapp";
  };
  notesCustomer: string;
};

const timeSlots = ["9:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"];

const initialState: FormState = {
  servicePackageId: bookingPackages[0].id,
  vehicle: {
    vehicleType: "sedan",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: ""
  },
  conditions: {
    petHair: false,
    heavyStains: false,
    odor: false,
    moldOrBiohazard: false,
    heavySaltBuildup: false,
    heavyExteriorContamination: false,
    customScopeRequested: false,
    interiorConditionLevel: "standard",
    exteriorConditionLevel: "standard"
  },
  location: {
    city: "",
    postalCode: "",
    address: "",
    locationType: "home",
    accessNotes: ""
  },
  schedule: {
    preferredDate: "",
    preferredTimeSlot: "",
    requestedDateRangeStart: "",
    requestedDateRangeEnd: ""
  },
  customer: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    preferredContactMethod: "text"
  },
  notesCustomer: ""
};

function FieldLabel({ children }: { children: string }) {
  return <label className="mb-2 block text-sm font-medium text-obs-fog/84">{children}</label>;
}

function FieldInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-obs-fog outline-none transition focus:border-obs-copper",
        props.className
      )}
    />
  );
}

function FieldTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "min-h-28 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-obs-fog outline-none transition focus:border-obs-copper",
        props.className
      )}
    />
  );
}

function FieldSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-obs-fog outline-none transition focus:border-obs-copper",
        props.className
      )}
    />
  );
}

export function BookingForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [stepIndex, setStepIndex] = useState(0);
  const [classification, setClassification] = useState<BookingClassification | null>(null);
  const [classificationPackageName, setClassificationPackageName] = useState("");
  const [classificationError, setClassificationError] = useState("");
  const [pending, startTransition] = useTransition();
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [submissionError, setSubmissionError] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadResult[]>([]);
  const [hasTrackedStart, setHasTrackedStart] = useState(false);

  const selectedPackage = useMemo(
    () => bookingPackages.find((entry) => entry.id === form.servicePackageId) || bookingPackages[0],
    [form.servicePackageId]
  );

  useEffect(() => {
    setClassification(null);
    setClassificationPackageName("");
  }, [
    form.servicePackageId,
    form.vehicle.vehicleType,
    form.vehicle.vehicleMake,
    form.vehicle.vehicleModel,
    form.vehicle.vehicleYear,
    form.conditions.petHair,
    form.conditions.heavyStains,
    form.conditions.odor,
    form.conditions.moldOrBiohazard,
    form.conditions.heavySaltBuildup,
    form.conditions.heavyExteriorContamination,
    form.conditions.customScopeRequested,
    form.conditions.interiorConditionLevel,
    form.conditions.exteriorConditionLevel,
    form.location.city,
    form.location.postalCode,
    form.location.address,
    form.location.locationType,
    form.location.accessNotes
  ]);

  useEffect(() => {
    if (hasTrackedStart) {
      return;
    }

    setHasTrackedStart(true);
    void trackEvent({
      eventName: "booking_started",
      pagePath: "/book",
      metadata: {
        source: "booking_form"
      }
    });
  }, [hasTrackedStart]);

  const bookingMode: BookingMode | null = classification?.finalMode || null;
  const isManualReview = bookingMode === "manual_review";
  const requiresDeposit = bookingMode === "deposit_required";
  const steps = useMemo(() => {
    if (!classification) {
      return ["service", "vehicle", "condition", "location", "contact", "review"];
    }

    return ["service", "vehicle", "condition", "location", "schedule", "contact", "review"];
  }, [classification]);

  const currentStep = steps[stepIndex];

  function canAdvance() {
    switch (currentStep) {
      case "service":
        return Boolean(form.servicePackageId);
      case "vehicle":
        return Boolean(form.vehicle.vehicleType && form.vehicle.vehicleMake && form.vehicle.vehicleModel && form.vehicle.vehicleYear);
      case "condition":
        return true;
      case "location":
        return Boolean(form.location.city && form.location.postalCode && form.location.address);
      case "schedule":
        return isManualReview
          ? Boolean(form.schedule.requestedDateRangeStart && form.schedule.requestedDateRangeEnd)
          : Boolean(form.schedule.preferredDate && form.schedule.preferredTimeSlot);
      case "contact":
        return Boolean(form.customer.firstName && form.customer.lastName && form.customer.email && form.customer.phone);
      case "review":
        return true;
      default:
        return true;
    }
  }

  async function runClassification() {
    const response = await fetch("/api/bookings/classify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        servicePackageId: form.servicePackageId,
        vehicle: form.vehicle,
        conditions: form.conditions,
        location: form.location
      })
    });

    const payload = await safeJson<
      ApiSuccess<{
        classification: BookingClassification;
        servicePackage: { name: string };
      }> | ApiFailure
    >(response);
    if (!response.ok || !payload || !payload.ok) {
      throw new Error(getApiErrorMessage(payload, "Unable to classify booking right now. Please try again."));
    }

    setClassification(payload.data.classification);
    setClassificationPackageName(payload.data.servicePackage.name);
  }

  async function handleFiles(files: FileList | null) {
    setUploadError("");
    if (!files?.length) {
      return;
    }

    const uploadForm = new FormData();
    uploadForm.append("bookingId", "draft");
    uploadForm.append("photoKind", isManualReview ? "specialty" : "other");
    Array.from(files).forEach((file) => uploadForm.append("files", file));

    const response = await fetch("/api/bookings/upload", {
      method: "POST",
      body: uploadForm
    });

    const payload = await safeJson<ApiSuccess<{ uploaded: UploadResult[] }> | ApiFailure>(response);
    if (!response.ok || !payload || !payload.ok) {
      throw new Error(getApiErrorMessage(payload, "Photo upload failed. Please try again."));
    }

    setUploadedPhotos((current) => [...current, ...payload.data.uploaded]);
  }

  function handleNext() {
    setClassificationError("");
    if (!canAdvance()) {
      setClassificationError("Please complete the required fields before continuing.");
      return;
    }

    startTransition(async () => {
      try {
        if (currentStep === "location") {
          await runClassification();
          setStepIndex((current) => current + 1);
          return;
        }

        setStepIndex((current) => Math.min(current + 1, steps.length - 1));
      } catch (error) {
        setClassificationError(error instanceof Error ? error.message : "Unable to continue");
      }
    });
  }

  async function handleSubmit() {
    setSubmissionError("");
    setSubmissionMessage("");

    startTransition(async () => {
      try {
        if (!classification) {
          await runClassification();
        }

        const schedulePayload = isManualReview
          ? {
              preferredDate: "",
              preferredTimeSlot: "",
              requestedDateRangeStart: form.schedule.requestedDateRangeStart,
              requestedDateRangeEnd: form.schedule.requestedDateRangeEnd
            }
          : {
              preferredDate: form.schedule.preferredDate,
              preferredTimeSlot: form.schedule.preferredTimeSlot,
              requestedDateRangeStart: "",
              requestedDateRangeEnd: ""
            };

        const response = await fetch("/api/bookings/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            servicePackageId: form.servicePackageId,
            vehicle: form.vehicle,
            conditions: form.conditions,
            location: form.location,
            schedule: schedulePayload,
            customer: form.customer,
            notesCustomer: form.notesCustomer,
            uploadedPhotos
          })
        });

        const payload = await safeJson<
          ApiSuccess<{
            booking: { id: string; publicReference: string };
            classification: BookingClassification;
          }> | ApiFailure
        >(response);
        if (!response.ok || !payload || !payload.ok) {
          throw new Error(
            getApiErrorMessage(payload, "Unable to submit booking right now. Please try again.")
          );
        }

        if (payload.data.classification.finalMode === "deposit_required") {
          void trackEvent({
            eventName: "deposit_checkout_started",
            pagePath: "/book",
            metadata: {
              packageId: form.servicePackageId
            }
          });
          const checkoutResponse = await fetch("/api/payments/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              bookingId: payload.data.booking.id
            })
          });

          const checkoutPayload = await safeJson<ApiSuccess<{ url: string }> | ApiFailure>(
            checkoutResponse
          );
          if (!checkoutResponse.ok || !checkoutPayload || !checkoutPayload.ok) {
            throw new Error(
              getApiErrorMessage(
                checkoutPayload,
                "Unable to start deposit checkout right now. Please try again."
              )
            );
          }

          window.location.href = checkoutPayload.data.url;
          return;
        }

        void trackEvent({
          eventName:
            payload.data.classification.finalMode === "manual_review"
              ? "manual_review_submitted"
              : "booking_submitted",
          pagePath: "/book",
          metadata: {
            packageId: form.servicePackageId,
            mode: payload.data.classification.finalMode
          }
        });

        setSubmissionMessage(
          payload.data.classification.finalMode === "manual_review"
            ? `Request submitted. Reference: ${payload.data.booking.publicReference}. The team will review and follow up.`
            : `Booking confirmed. Reference: ${payload.data.booking.publicReference}.`
        );
      } catch (error) {
        setSubmissionError(error instanceof Error ? error.message : "Unable to submit booking");
      }
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          {steps.map((step, index) => (
            <div
              key={step}
              className={cn(
                "flex items-center gap-2 rounded-full border px-3 py-2 text-xs uppercase tracking-[0.18em]",
                index === stepIndex
                  ? "border-obs-copper bg-obs-copper/10 text-obs-fog"
                  : "border-white/10 text-obs-fog/45"
              )}
            >
              <span>{index + 1}</span>
              <span>{step.replace("_", " ")}</span>
            </div>
          ))}
        </div>

        {currentStep === "service" && (
          <div className="space-y-4">
            <div>
              <FieldLabel>Select package</FieldLabel>
              <FieldSelect
                value={form.servicePackageId}
                onChange={(event) => setForm((current) => ({ ...current, servicePackageId: event.target.value }))}
              >
                {bookingPackages.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name} · {formatCurrency(pkg.basePriceCents)}
                  </option>
                ))}
              </FieldSelect>
            </div>
            <p className="text-sm leading-7 text-obs-fog/66">
              Standard packages stay easy. Ceramic, correction, and specialty jobs switch into deposit or review flows automatically.
            </p>
          </div>
        )}

        {currentStep === "vehicle" && (
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <FieldLabel>Vehicle type</FieldLabel>
              <FieldSelect
                value={form.vehicle.vehicleType}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    vehicle: { ...current.vehicle, vehicleType: event.target.value }
                  }))
                }
              >
                {[
                  ["sedan", "Sedan"],
                  ["coupe", "Coupe"],
                  ["small_suv", "Small SUV"],
                  ["mid_suv", "Mid-Size SUV"],
                  ["large_suv", "Large SUV"],
                  ["pickup_truck", "Pickup Truck"],
                  ["van", "Van"],
                  ["boat", "Boat"],
                  ["rv", "RV"],
                  ["food_truck", "Food Truck"],
                  ["other", "Other"]
                ].map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </FieldSelect>
            </div>
            <div>
              <FieldLabel>Year</FieldLabel>
              <FieldInput
                value={form.vehicle.vehicleYear}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    vehicle: { ...current.vehicle, vehicleYear: event.target.value }
                  }))
                }
                placeholder="2021"
              />
            </div>
            <div>
              <FieldLabel>Make</FieldLabel>
              <FieldInput
                value={form.vehicle.vehicleMake}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    vehicle: { ...current.vehicle, vehicleMake: event.target.value }
                  }))
                }
                placeholder="Toyota"
              />
            </div>
            <div>
              <FieldLabel>Model</FieldLabel>
              <FieldInput
                value={form.vehicle.vehicleModel}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    vehicle: { ...current.vehicle, vehicleModel: event.target.value }
                  }))
                }
                placeholder="RAV4"
              />
            </div>
          </div>
        )}

        {currentStep === "condition" && (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["petHair", "Pet hair"],
                ["heavyStains", "Heavy stains"],
                ["odor", "Strong odor"],
                ["moldOrBiohazard", "Mold or biohazard concern"],
                ["heavySaltBuildup", "Heavy salt buildup"],
                ["heavyExteriorContamination", "Heavy exterior contamination"],
                ["customScopeRequested", "Custom scope requested"]
              ].map(([key, label]) => (
                <label key={key} className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/10 p-4 text-sm text-obs-fog/78">
                  <input
                    type="checkbox"
                    checked={Boolean(form.conditions[key as keyof FormState["conditions"]])}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        conditions: {
                          ...current.conditions,
                          [key]: event.target.checked
                        }
                      }))
                    }
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <FieldLabel>Interior condition</FieldLabel>
                <FieldSelect
                  value={form.conditions.interiorConditionLevel}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      conditions: {
                        ...current.conditions,
                        interiorConditionLevel: event.target.value as "standard" | "moderate" | "heavy"
                      }
                    }))
                  }
                >
                  <option value="standard">Standard</option>
                  <option value="moderate">Moderate</option>
                  <option value="heavy">Heavy</option>
                </FieldSelect>
              </div>
              <div>
                <FieldLabel>Exterior condition</FieldLabel>
                <FieldSelect
                  value={form.conditions.exteriorConditionLevel}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      conditions: {
                        ...current.conditions,
                        exteriorConditionLevel: event.target.value as "standard" | "moderate" | "heavy"
                      }
                    }))
                  }
                >
                  <option value="standard">Standard</option>
                  <option value="moderate">Moderate</option>
                  <option value="heavy">Heavy</option>
                </FieldSelect>
              </div>
            </div>
          </div>
        )}

        {currentStep === "location" && (
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <FieldLabel>City</FieldLabel>
              <FieldInput
                value={form.location.city}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    location: { ...current.location, city: event.target.value }
                  }))
                }
                placeholder="Toronto"
              />
            </div>
            <div>
              <FieldLabel>Postal code</FieldLabel>
              <FieldInput
                value={form.location.postalCode}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    location: { ...current.location, postalCode: event.target.value }
                  }))
                }
                placeholder="M5V 2T6"
              />
            </div>
            <div className="md:col-span-2">
              <FieldLabel>Service address</FieldLabel>
              <FieldInput
                value={form.location.address}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    location: { ...current.location, address: event.target.value }
                  }))
                }
                placeholder="123 Example Street"
              />
            </div>
            <div>
              <FieldLabel>Location type</FieldLabel>
              <FieldSelect
                value={form.location.locationType}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    location: {
                      ...current.location,
                      locationType: event.target.value as FormState["location"]["locationType"]
                    }
                  }))
                }
              >
                <option value="home">Home driveway</option>
                <option value="condo">Condo parking</option>
                <option value="office">Office parking</option>
                <option value="commercial">Commercial site</option>
                <option value="other">Other</option>
              </FieldSelect>
            </div>
            <div className="md:col-span-2">
              <FieldLabel>Access notes</FieldLabel>
              <FieldTextarea
                value={form.location.accessNotes}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    location: { ...current.location, accessNotes: event.target.value }
                  }))
                }
                placeholder="Condo rules, gate codes, power/water notes, or access limits."
              />
            </div>
          </div>
        )}

        {currentStep === "schedule" && !isManualReview && (
          <div className="space-y-4">
            <div>
              <FieldLabel>Preferred date</FieldLabel>
              <FieldInput
                type="date"
                value={form.schedule.preferredDate}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    schedule: { ...current.schedule, preferredDate: event.target.value }
                  }))
                }
              />
            </div>
            <div>
              <FieldLabel>Preferred time</FieldLabel>
              <div className="grid gap-3 md:grid-cols-4">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() =>
                      setForm((current) => ({
                        ...current,
                        schedule: { ...current.schedule, preferredTimeSlot: slot }
                      }))
                    }
                    className={cn(
                      "rounded-xl border px-4 py-3 text-sm transition",
                      form.schedule.preferredTimeSlot === slot
                        ? "border-obs-copper bg-obs-copper/10 text-obs-fog"
                        : "border-white/10 bg-black/10 text-obs-fog/68"
                    )}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentStep === "schedule" && isManualReview && (
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <FieldLabel>Preferred start date</FieldLabel>
              <FieldInput
                type="date"
                value={form.schedule.requestedDateRangeStart}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    schedule: { ...current.schedule, requestedDateRangeStart: event.target.value }
                  }))
                }
              />
            </div>
            <div>
              <FieldLabel>Preferred end date</FieldLabel>
              <FieldInput
                type="date"
                value={form.schedule.requestedDateRangeEnd}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    schedule: { ...current.schedule, requestedDateRangeEnd: event.target.value }
                  }))
                }
              />
            </div>
            <div className="md:col-span-2">
              <p className="text-sm leading-7 text-obs-fog/66">
                Review-led jobs do not lock a live slot yet. Choose a workable date window and the team will confirm timing after review.
              </p>
            </div>
          </div>
        )}

        {currentStep === "contact" && (
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <FieldLabel>First name</FieldLabel>
              <FieldInput
                value={form.customer.firstName}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    customer: { ...current.customer, firstName: event.target.value }
                  }))
                }
              />
            </div>
            <div>
              <FieldLabel>Last name</FieldLabel>
              <FieldInput
                value={form.customer.lastName}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    customer: { ...current.customer, lastName: event.target.value }
                  }))
                }
              />
            </div>
            <div>
              <FieldLabel>Email</FieldLabel>
              <FieldInput
                type="email"
                value={form.customer.email}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    customer: { ...current.customer, email: event.target.value }
                  }))
                }
              />
            </div>
            <div>
              <FieldLabel>Phone</FieldLabel>
              <FieldInput
                value={form.customer.phone}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    customer: { ...current.customer, phone: event.target.value }
                  }))
                }
              />
            </div>
            <div>
              <FieldLabel>Preferred contact method</FieldLabel>
              <FieldSelect
                value={form.customer.preferredContactMethod}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    customer: {
                      ...current.customer,
                      preferredContactMethod: event.target.value as FormState["customer"]["preferredContactMethod"]
                    }
                  }))
                }
              >
                <option value="text">Text</option>
                <option value="phone">Phone</option>
                <option value="email">Email</option>
                <option value="whatsapp">WhatsApp</option>
              </FieldSelect>
            </div>
            <div className="md:col-span-2">
              <FieldLabel>Anything else we should know?</FieldLabel>
              <FieldTextarea
                value={form.notesCustomer}
                onChange={(event) => setForm((current) => ({ ...current, notesCustomer: event.target.value }))}
                placeholder="Apartment access, timing notes, or anything that would help the team."
              />
            </div>
            {(classification?.photosRequired || isManualReview) && (
              <div className="md:col-span-2">
                <FieldLabel>Upload photos</FieldLabel>
                <FieldInput
                  type="file"
                  multiple
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(event) => {
                    void handleFiles(event.target.files).catch((error) => {
                      setUploadError(error instanceof Error ? error.message : "Photo upload failed.");
                    });
                  }}
                />
                {uploadedPhotos.length > 0 ? (
                  <p className="mt-3 text-sm text-obs-fog/62">{uploadedPhotos.length} photo(s) uploaded</p>
                ) : null}
                {uploadError ? <p className="mt-3 text-sm text-red-300">{uploadError}</p> : null}
              </div>
            )}
          </div>
        )}

        {currentStep === "review" && classification && (
          <div className="space-y-6">
            <div className="rounded-xl border border-white/10 bg-black/10 p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-obs-sand/80">Booking outcome</p>
              <h3 className="mt-4 text-2xl font-semibold text-obs-fog">
                {classification.finalMode === "manual_review"
                  ? "Manual review required"
                  : classification.finalMode === "deposit_required"
                    ? "Deposit required"
                    : "Direct booking"}
              </h3>
              <p className="mt-3 text-sm leading-7 text-obs-fog/68">
                {classification.finalMode === "manual_review"
                  ? "This job needs review before it can be fully confirmed."
                  : classification.finalMode === "deposit_required"
                    ? "This booking can move forward now, but the slot is only confirmed after the deposit is paid."
                    : "This booking can move straight into confirmation."}
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-black/10 p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-obs-sand/80">Selected package</p>
                <p className="mt-4 text-lg text-obs-fog">{classificationPackageName || selectedPackage.name}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/10 p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-obs-sand/80">Estimated total</p>
                <p className="mt-4 text-lg text-obs-fog">
                  {formatCurrency(selectedPackage.basePriceCents + (classification.surchargeCents || 0))}
                </p>
                {classification.surchargeCents > 0 ? (
                  <p className="mt-2 text-sm text-obs-fog/62">
                    Includes vehicle surcharge of {formatCurrency(classification.surchargeCents)}
                  </p>
                ) : null}
              </div>
            </div>
            {classification.reviewReasons.length ? (
              <div className="rounded-xl border border-white/10 bg-black/10 p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-obs-sand/80">Routing notes</p>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-obs-fog/68">
                  {classification.reviewReasons.map((reason) => (
                    <li key={reason}>{reason.replaceAll("_", " ")}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        )}

        {classificationError ? <p className="mt-6 text-sm text-red-300">{classificationError}</p> : null}
        {submissionError ? <p className="mt-6 text-sm text-red-300">{submissionError}</p> : null}
        {submissionMessage ? <p className="mt-6 text-sm text-emerald-300">{submissionMessage}</p> : null}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={() => setStepIndex((current) => Math.max(current - 1, 0))}
            className="button-secondary"
            disabled={stepIndex === 0 || pending}
          >
            Back
          </button>

          {currentStep === "review" ? (
            <button type="button" onClick={() => void handleSubmit()} className="button-primary" disabled={pending}>
              {pending
                ? "Working..."
                : requiresDeposit
                  ? "Continue to deposit"
                  : isManualReview
                    ? "Submit request"
                    : "Confirm booking"}
            </button>
          ) : (
            <button type="button" onClick={handleNext} className="button-primary" disabled={pending}>
              {pending ? "Working..." : "Continue"}
            </button>
          )}
        </div>
      </section>

      <aside className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <p className="text-sm uppercase tracking-[0.18em] text-obs-sand/80">Summary</p>
        <div className="mt-6 space-y-4 text-sm text-obs-fog/74">
          <div className="flex items-start justify-between gap-4 border-t border-white/8 pt-4 first:border-t-0 first:pt-0">
            <span>Package</span>
            <span className="text-right">{selectedPackage.name}</span>
          </div>
          <div className="flex items-start justify-between gap-4 border-t border-white/8 pt-4">
            <span>Base price</span>
            <span>{formatCurrency(selectedPackage.basePriceCents)}</span>
          </div>
          <div className="flex items-start justify-between gap-4 border-t border-white/8 pt-4">
            <span>Vehicle</span>
            <span className="text-right">
              {form.vehicle.vehicleYear || "Year"} {form.vehicle.vehicleMake || "Make"} {form.vehicle.vehicleModel || "Model"}
            </span>
          </div>
          <div className="flex items-start justify-between gap-4 border-t border-white/8 pt-4">
            <span>Location</span>
            <span className="text-right">{form.location.city || "Not set yet"}</span>
          </div>
          {classification ? (
            <>
              <div className="flex items-start justify-between gap-4 border-t border-white/8 pt-4">
                <span>Mode</span>
                <span>
                  {classification.finalMode === "manual_review"
                    ? "Manual review"
                    : classification.finalMode === "deposit_required"
                      ? "Deposit required"
                      : "Direct booking"}
                </span>
              </div>
              {classification.surchargeCents > 0 ? (
                <div className="flex items-start justify-between gap-4 border-t border-white/8 pt-4">
                  <span>Surcharge</span>
                  <span>{formatCurrency(classification.surchargeCents)}</span>
                </div>
              ) : null}
              {classification.depositRequiredCents > 0 ? (
                <div className="flex items-start justify-between gap-4 border-t border-white/8 pt-4">
                  <span>Deposit</span>
                  <span>{formatCurrency(classification.depositRequiredCents)}</span>
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
