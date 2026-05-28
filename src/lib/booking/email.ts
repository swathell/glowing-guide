import { env } from "@/lib/env";
import { siteConfig } from "@/lib/site";

type EmailPayload = {
  to: string | string[];
  subject: string;
  html: string;
};

async function sendEmail(payload: EmailPayload) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: `${siteConfig.name} <noreply@updates.obsmobiledetail.ca>`,
      to: payload.to,
      subject: payload.subject,
      html: payload.html
    })
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Failed to send email: ${body}`);
  }
}

export async function sendCustomerSubmissionEmail(params: {
  email: string;
  firstName: string;
  bookingReference: string;
  finalMode: "direct_book" | "deposit_required" | "manual_review";
}) {
  const body =
    params.finalMode === "manual_review"
      ? `<p>Hi ${params.firstName},</p><p>Your request ${params.bookingReference} has been received and is pending review. We will follow up with next steps shortly.</p>`
      : `<p>Hi ${params.firstName},</p><p>Your booking ${params.bookingReference} has been received. We will follow up if anything needs clarification.</p>`;

  await sendEmail({
    to: params.email,
    subject:
      params.finalMode === "manual_review"
        ? "OBS booking request received"
        : "OBS booking received",
    html: body
  });
}

export async function sendOwnerAlertEmail(params: {
  bookingReference: string;
  customerName: string;
  serviceName: string;
  finalMode: "direct_book" | "deposit_required" | "manual_review";
}) {
  const modeLabel =
    params.finalMode === "manual_review"
      ? "Manual review required"
      : params.finalMode === "deposit_required"
        ? "Deposit required"
        : "Direct booking";

  await sendEmail({
    to: env.bookingAlertEmail,
    subject: `New OBS booking: ${params.bookingReference}`,
    html: `<p><strong>${modeLabel}</strong></p><p>${params.customerName}</p><p>${params.serviceName}</p><p>Reference: ${params.bookingReference}</p>`
  });
}

export async function sendDepositConfirmedEmail(params: {
  email: string;
  firstName: string;
  bookingReference: string;
}) {
  await sendEmail({
    to: params.email,
    subject: "OBS deposit confirmed",
    html: `<p>Hi ${params.firstName},</p><p>Your deposit for ${params.bookingReference} has been received and your booking is confirmed.</p>`
  });
}
