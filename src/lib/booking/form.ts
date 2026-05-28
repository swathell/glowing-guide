import { BookingStepDefinition } from "@/lib/booking/types";
import { bookingSteps } from "@/lib/booking/config";

export type StepBranch = "direct_book" | "deposit_required" | "manual_review";

export function getVisibleSteps(branch: StepBranch): BookingStepDefinition[] {
  if (branch === "manual_review") {
    return bookingSteps.filter((step) => !["payment"].includes(step.id));
  }

  if (branch === "direct_book") {
    return bookingSteps.filter((step) => !["payment"].includes(step.id));
  }

  return bookingSteps;
}
