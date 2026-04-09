import { Resend } from "resend";

import type { ContactRequest } from "@/types/contact";

const resendApiKey = process.env.RESEND_API_KEY;
const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";
const to = process.env.CONTACT_TO_EMAIL;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendContactEmail(payload: ContactRequest) {
  if (!to) {
    console.warn("CONTACT_TO_EMAIL is not configured. Skipping email delivery.");
    return;
  }

  if (!resend) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Email provider is not configured.");
    }

    console.warn("RESEND_API_KEY is not configured. Skipping email delivery in non-production.");
    return;
  }

  await resend.emails.send({
    from,
    to,
    replyTo: payload.email,
    subject: `Portfolio contact from ${payload.name}`,
    text: `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`,
  });
}
