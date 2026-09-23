"use client";

import * as React from "react";
import { CheckCircle, Warning } from "@phosphor-icons/react";

import { brand } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Contact form.
 *
 * Full state cycle: idle, per-field validation errors, submitting, success and
 * a server-error path. Labels sit above inputs, helper text is in the markup
 * from the start, error text sits below the field it belongs to.
 *
 * CONTRAST: inputs use the elevated surface against the canvas section ground,
 * a --control-border boundary at 3:1, --muted labels (6.5:1 / 8.9:1) and
 * the accent focus ring. No placeholder is used as a label.
 */

const interests = [
  "Data platform modernization",
  "Machine learning engineering",
  "Generative AI systems",
  "Data governance and trust",
  "Analytics and decision support",
  "Something else",
];

type Values = {
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
};

type Errors = Partial<Record<keyof Values, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMPTY: Values = {
  name: "",
  email: "",
  company: "",
  interest: interests[0],
  message: "",
};

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your work email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = "That email address does not look complete.";
  }
  if (!values.company.trim()) errors.company = "Please enter your company.";
  if (values.message.trim().length < 20) {
    errors.message = "A sentence or two about the problem helps us route this.";
  }
  return errors;
}

const fieldClass = [
  "w-full rounded-[var(--radius-control)] border bg-surface px-3.5 py-3",
  "text-[0.9375rem] text-ink placeholder:text-muted",
  "transition-colors duration-200",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
].join(" ");

export function Contact() {
  const [values, setValues] = React.useState<Values>(EMPTY);
  const [errors, setErrors] = React.useState<Errors>({});
  const [status, setStatus] = React.useState<Status>("idle");

  const update = (key: keyof Values) => (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setValues((current) => ({ ...current, [key]: event.target.value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const firstKey = Object.keys(found)[0];
      document.getElementById(`contact-${firstKey}`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setStatus("success");
      setValues(EMPTY);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section-y border-b border-line">
      <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 className="max-w-[16ch] text-3xl font-semibold tracking-[-0.03em] text-ink text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
            Tell us what is stuck
          </h2>
          <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-muted">
            A principal engineer reads every message and replies within two
            working days. If we are not the right fit we will tell you who is.
          </p>

          <dl className="mt-10 flex flex-col gap-6 border-t border-line pt-8">
            <div>
              <dt className="text-sm text-muted">Email</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${brand.email}`}
                  className="text-[0.9375rem] font-medium text-ink underline-offset-4 hover:text-accent hover:underline"
                >
                  {brand.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Phone</dt>
              <dd className="mt-1">
                <a
                  href={`tel:${brand.phone.replace(/\s/g, "")}`}
                  className="text-[0.9375rem] font-medium text-ink underline-offset-4 hover:text-accent hover:underline"
                >
                  {brand.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Offices</dt>
              <dd className="mt-1 flex flex-col gap-1">
                {brand.offices.map((office) => (
                  <span key={office.city} className="text-[0.9375rem] text-ink">
                    {office.city}
                    <span className="text-muted"> {office.line}</span>
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-[var(--radius-surface)] border border-line bg-canvas p-6 sm:p-8 lg:p-10">
            {status === "success" ? (
              <div
                role="status"
                className="flex min-h-[22rem] flex-col items-start justify-center gap-4"
              >
                <CheckCircle
                  size={30}
                  weight="regular"
                  className="text-accent"
                  aria-hidden="true"
                />
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-ink">
                  Message received
                </h3>
                <p className="max-w-[42ch] text-[0.9375rem] leading-relaxed text-muted">
                  Thank you. You will hear from one of our principals within two
                  working days, usually sooner.
                </p>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setStatus("idle")}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field
                    id="contact-name"
                    label="Full name"
                    error={errors.name}
                  >
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={values.name}
                      onChange={update("name")}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={
                        errors.name ? "contact-name-error" : undefined
                      }
                      className={cn(
                        fieldClass,
                        errors.name ? "border-accent" : "border-control-border",
                      )}
                    />
                  </Field>

                  <Field
                    id="contact-email"
                    label="Work email"
                    error={errors.email}
                  >
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={update("email")}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={
                        errors.email ? "contact-email-error" : undefined
                      }
                      className={cn(
                        fieldClass,
                        errors.email ? "border-accent" : "border-control-border",
                      )}
                    />
                  </Field>
                </div>

                <Field
                  id="contact-company"
                  label="Company"
                  error={errors.company}
                >
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    value={values.company}
                    onChange={update("company")}
                    aria-invalid={Boolean(errors.company)}
                    aria-describedby={
                      errors.company ? "contact-company-error" : undefined
                    }
                    className={cn(
                      fieldClass,
                      errors.company ? "border-accent" : "border-control-border",
                    )}
                  />
                </Field>

                <Field id="contact-interest" label="What can we help with">
                  <select
                    id="contact-interest"
                    name="interest"
                    value={values.interest}
                    onChange={update("interest")}
                    className={cn(fieldClass, "border-control-border")}
                  >
                    {interests.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  id="contact-message"
                  label="What is the problem"
                  hint="Where the data sits today and what decision it should be supporting."
                  error={errors.message}
                >
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={values.message}
                    onChange={update("message")}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={cn(
                      "contact-message-hint",
                      errors.message && "contact-message-error",
                    )}
                    className={cn(
                      fieldClass,
                      "resize-y",
                      errors.message ? "border-accent" : "border-control-border",
                    )}
                  />
                </Field>

                {status === "error" ? (
                  <p
                    role="alert"
                    className="flex items-start gap-2 rounded-[var(--radius-control)] border border-accent bg-accent-soft px-3.5 py-3 text-[0.9375rem] text-ink"
                  >
                    <Warning
                      size={18}
                      weight="regular"
                      className="mt-0.5 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    We could not send that. Please try again, or email{" "}
                    {brand.email} directly.
                  </p>
                ) : null}

                <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? "Sending" : "Send request"}
                  </Button>
                  <p className="max-w-[34ch] text-sm leading-snug text-muted">
                    We use your details to reply to this enquiry and nothing
                    else.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {hint ? (
        <p id={`${id}-hint`} className="text-sm leading-snug text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-sm font-medium leading-snug text-accent"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
