import { NextResponse } from "next/server";

/**
 * Contact endpoint. Validates on the server as well as in the browser, because
 * client validation is a convenience and never a control.
 *
 * The delivery step is intentionally a seam: wire `deliver()` to the CRM or
 * transactional mail provider this site will actually use.
 *
 * With CONTACT_WEBHOOK_URL unset, production refuses the submission rather
 * than accepting an enquiry it cannot deliver. Preview and local builds log it
 * and report success instead, so a review deployment demonstrates the whole
 * form without anyone having to wire up a CRM first.
 */

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  interest?: string;
  message?: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(payload: Payload) {
  const errors: Record<string, string> = {};
  if (!payload.name?.trim()) errors.name = "Name is required.";
  if (!payload.email?.trim() || !EMAIL.test(payload.email.trim())) {
    errors.email = "A valid work email is required.";
  }
  if (!payload.company?.trim()) errors.company = "Company is required.";
  if ((payload.message?.trim().length ?? 0) < 20) {
    errors.message = "Message is too short.";
  }
  return errors;
}

async function deliver(payload: Required<Payload>) {
  const endpoint = process.env.CONTACT_WEBHOOK_URL;

  if (!endpoint) {
    if (process.env.VERCEL_ENV === "production") {
      throw new Error(
        "CONTACT_WEBHOOK_URL is not configured. Point it at the CRM intake or mail provider before going live.",
      );
    }
    console.warn(
      "[contact] CONTACT_WEBHOOK_URL is not set. Enquiry accepted but NOT delivered:",
      { company: payload.company, interest: payload.interest },
    );
    return;
  }
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Delivery failed with status ${response.status}`);
  }
}

export async function POST(request: Request) {
  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Malformed request body." }, { status: 400 });
  }

  const errors = validate(payload);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  try {
    await deliver(payload as Required<Payload>);
  } catch (error) {
    console.error("[contact] delivery failed", error);
    return NextResponse.json(
      { error: "Could not deliver the message." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
