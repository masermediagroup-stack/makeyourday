"use client";

import { useState } from "react";
import type { ServiceItem } from "@/lib/site-data";

type ContactFormProps = {
  services: ServiceItem[];
};

export default function ContactForm({ services }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      service: String(formData.get("service") ?? ""),
      message: String(formData.get("message") ?? ""),
      specialRequests: String(formData.get("specialRequests") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const parsed = (await response.json()) as { error?: string };
        throw new Error(parsed.error ?? "Unable to submit your request right now.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to submit your request right now.",
      );
    }
  }

  return (
    <article className="rounded-3xl bg-cream p-8 md:p-10">
      <h2 className="font-display text-4xl tracking-tight text-textPrimary md:text-5xl">
        Request a consultation
      </h2>
      <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-textMuted">
        Complete the form and our team will contact you with scheduling options
        and a service recommendation.
      </p>

      <form className="mt-8 grid grid-cols-1 gap-6" aria-label="Contact request form" onSubmit={onSubmit}>
        <label className="grid gap-2 text-sm font-medium text-textPrimary">
          Email
          <input
            type="email"
            name="email"
            required
            placeholder="name@domain.com"
            className="w-full rounded-2xl border border-textPrimary/15 bg-white px-4 py-3 text-sm text-textPrimary placeholder:text-textMuted/80 outline-none transition focus:border-primaryGreen"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-textPrimary">
          Phone number
          <input
            type="tel"
            name="phone"
            required
            placeholder="+1 (312) 847-1928"
            className="w-full rounded-2xl border border-textPrimary/15 bg-white px-4 py-3 text-sm text-textPrimary placeholder:text-textMuted/80 outline-none transition focus:border-primaryGreen"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-textPrimary">
          Select a service
          <select
            name="service"
            defaultValue=""
            required
            className="w-full rounded-2xl border border-textPrimary/15 bg-white px-4 py-3 text-sm text-textPrimary outline-none transition focus:border-primaryGreen"
          >
            <option value="" disabled>
              Choose a service
            </option>
            {services.map((service) => (
              <option key={service.title} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-textPrimary">
          Message
          <textarea
            name="message"
            required
            rows={4}
            placeholder="Tell us about your property, goals, and desired timeline."
            className="w-full rounded-2xl border border-textPrimary/15 bg-white px-4 py-3 text-sm text-textPrimary placeholder:text-textMuted/80 outline-none transition focus:border-primaryGreen"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-textPrimary">
          Special requests
          <textarea
            name="specialRequests"
            rows={3}
            placeholder="Gate codes, HOA requirements, preferred contact windows, or other details."
            className="w-full rounded-2xl border border-textPrimary/15 bg-white px-4 py-3 text-sm text-textPrimary placeholder:text-textMuted/80 outline-none transition focus:border-primaryGreen"
          />
        </label>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex w-fit rounded-full bg-terracotta px-7 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:translate-y-[-1px] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "submitting" ? "Submitting..." : "Submit request"}
          </button>
          {status === "success" ? (
            <p className="text-sm text-primaryGreen">Request sent. We will contact you soon.</p>
          ) : null}
          {status === "error" ? (
            <p className="text-sm text-terracotta">{errorMessage}</p>
          ) : null}
        </div>
      </form>
    </article>
  );
}
