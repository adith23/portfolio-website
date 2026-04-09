"use client";

import { useState } from "react";

import { FormMessage } from "@/components/form-message";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
import type { ContactResponse } from "@/types/contact";

type FieldErrors = ContactResponse["fieldErrors"];

const initialState = {
  name: "",
  email: "",
  message: "",
  website: "",
};

export function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<FieldErrors>();
  const [status, setStatus] = useState<ContactResponse | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setErrors(undefined);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = (await response.json()) as ContactResponse;
      setStatus(result);
      setErrors(result.fieldErrors);

      if (result.success) {
        setForm(initialState);
      }
    } catch {
      setStatus({
        success: false,
        message: "Something went wrong while sending your message. Please try again later.",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium">Name</span>
          <Input
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            aria-invalid={Boolean(errors?.name?.length)}
            aria-describedby={errors?.name?.length ? "contact-name-error" : undefined}
            name="name"
            autoComplete="name"
            placeholder="Your name"
          />
          {errors?.name?.length ? (
            <p id="contact-name-error" className="text-sm text-[var(--danger)]">
              {errors.name[0]}
            </p>
          ) : null}
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Email</span>
          <Input
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            aria-invalid={Boolean(errors?.email?.length)}
            aria-describedby={errors?.email?.length ? "contact-email-error" : undefined}
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
          />
          {errors?.email?.length ? (
            <p id="contact-email-error" className="text-sm text-[var(--danger)]">
              {errors.email[0]}
            </p>
          ) : null}
        </label>
      </div>
      <label className="hidden" aria-hidden="true">
        Website
        <Input
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(event) => setForm((current) => ({ ...current, website: event.target.value }))}
          name="website"
        />
      </label>
      <label className="space-y-2">
        <span className="text-sm font-medium">Message</span>
        <Textarea
          value={form.message}
          onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
          aria-invalid={Boolean(errors?.message?.length)}
          aria-describedby={errors?.message?.length ? "contact-message-error" : undefined}
          name="message"
          placeholder="Tell me about your project, role, or system design challenge."
        />
        {errors?.message?.length ? (
          <p id="contact-message-error" className="text-sm text-[var(--danger)]">
            {errors.message[0]}
          </p>
        ) : null}
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={pending}
          className="focus-ring inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-strong)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? "Sending..." : "Send message"}
        </button>
        <p className="text-sm text-[var(--muted)]">Replies are handled directly over email.</p>
      </div>
      {status ? (
        <FormMessage tone={status.success ? "success" : "error"}>{status.message}</FormMessage>
      ) : null}
    </form>
  );
}
