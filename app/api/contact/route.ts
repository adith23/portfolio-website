import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { contactSchema } from "@/lib/contact-schema";
import { sendContactEmail } from "@/lib/email";
import { isRateLimited } from "@/lib/rate-limit";
import type { ContactRequest, ContactResponse } from "@/types/contact";

export async function POST(request: Request) {
  const payload = (await request.json()) as ContactRequest;
  const result = contactSchema.safeParse(payload);

  if (!result.success) {
    const response: ContactResponse = {
      success: false,
      message: "Please fix the highlighted fields and try again.",
      fieldErrors: result.error.flatten().fieldErrors,
    };

    return NextResponse.json(response, { status: 400 });
  }

  if (result.data.website) {
    const response: ContactResponse = {
      success: true,
      message: "Message received.",
    };

    return NextResponse.json(response);
  }

  const forwardedFor = (await headers()).get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    const response: ContactResponse = {
      success: false,
      message: "Too many requests from this client. Please try again in a few minutes.",
    };

    return NextResponse.json(response, { status: 429 });
  }

  try {
    await sendContactEmail(result.data);

    const response: ContactResponse = {
      success: true,
      message: "Your message has been sent. I’ll get back to you soon.",
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Contact form delivery failed", error);

    const response: ContactResponse = {
      success: false,
      message: "Unable to send your message right now. Please email directly instead.",
    };

    return NextResponse.json(response, { status: 500 });
  }
}
