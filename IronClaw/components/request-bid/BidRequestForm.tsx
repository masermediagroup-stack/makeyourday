"use client";

import { FormEvent, useState } from "react";

type FormState = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  details: string;
};

const initialState: FormState = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  projectType: "",
  budget: "",
  timeline: "",
  details: "",
};

export function BidRequestForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.companyName.trim()) nextErrors.companyName = "Company name is required.";
    if (!form.contactName.trim()) nextErrors.contactName = "Primary contact is required.";
    if (!form.email.trim()) nextErrors.email = "Email is required.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!form.projectType) nextErrors.projectType = "Select a project type.";
    if (!form.details.trim()) nextErrors.details = "Project scope details are required.";
    return nextErrors;
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("success");
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
        Demo intake form. Submitted data is not stored.
      </p>
      <div className="grid gap-2">
        <label htmlFor="companyName" className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
          Company name
        </label>
        <input
          id="companyName"
          value={form.companyName}
          onChange={(event) => updateField("companyName", event.target.value)}
          aria-invalid={Boolean(errors.companyName)}
          aria-describedby={errors.companyName ? "companyName-error" : undefined}
          className="border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--fg)] outline-none transition-colors focus:border-[var(--accent)]"
        />
        {errors.companyName && <p id="companyName-error" className="text-xs text-[var(--accent)]">{errors.companyName}</p>}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="contactName" className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
            Primary contact
          </label>
          <input
            id="contactName"
            value={form.contactName}
            onChange={(event) => updateField("contactName", event.target.value)}
            aria-invalid={Boolean(errors.contactName)}
            aria-describedby={errors.contactName ? "contactName-error" : undefined}
            className="border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--fg)] outline-none transition-colors focus:border-[var(--accent)]"
          />
          {errors.contactName && <p id="contactName-error" className="text-xs text-[var(--accent)]">{errors.contactName}</p>}
        </div>
        <div className="grid gap-2">
          <label htmlFor="email" className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--fg)] outline-none transition-colors focus:border-[var(--accent)]"
          />
          {errors.email && <p id="email-error" className="text-xs text-[var(--accent)]">{errors.email}</p>}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="phone" className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
            Phone
          </label>
          <input
            id="phone"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            className="border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--fg)] outline-none transition-colors focus:border-[var(--accent)]"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="projectType" className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
            Project type
          </label>
          <select
            id="projectType"
            value={form.projectType}
            onChange={(event) => updateField("projectType", event.target.value)}
            aria-invalid={Boolean(errors.projectType)}
            aria-describedby={errors.projectType ? "projectType-error" : undefined}
            className="border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--fg)] outline-none transition-colors focus:border-[var(--accent)]"
          >
            <option value="">Select type</option>
            <option value="commercial-shell">Commercial shell build</option>
            <option value="demolition-rebuild">Demolition and rebuild</option>
            <option value="concrete-structure">Concrete structure package</option>
            <option value="tenant-improvement">Tenant improvement</option>
          </select>
          {errors.projectType && <p id="projectType-error" className="text-xs text-[var(--accent)]">{errors.projectType}</p>}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="budget" className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
            Estimated budget
          </label>
          <input
            id="budget"
            value={form.budget}
            onChange={(event) => updateField("budget", event.target.value)}
            placeholder="$850,000 - $1,350,000"
            className="border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--fg)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="timeline" className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
            Target start
          </label>
          <input
            id="timeline"
            value={form.timeline}
            onChange={(event) => updateField("timeline", event.target.value)}
            placeholder="Q3 2026"
            className="border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--fg)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <label htmlFor="details" className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
          Project scope details
        </label>
        <textarea
          id="details"
          rows={5}
          value={form.details}
          onChange={(event) => updateField("details", event.target.value)}
          aria-invalid={Boolean(errors.details)}
          aria-describedby={errors.details ? "details-error" : undefined}
          className="border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--fg)] outline-none transition-colors focus:border-[var(--accent)]"
        />
        {errors.details && <p id="details-error" className="text-xs text-[var(--accent)]">{errors.details}</p>}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="border border-[var(--accent)] bg-[var(--accent)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--bg)] transition-transform duration-300 disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.98]"
        >
          {status === "submitting" ? "Submitting..." : "Submit request"}
        </button>
        {status === "success" && (
          <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
            Request received. Estimating team will contact you in 1 business day.
          </p>
        )}
        {status === "error" && Object.keys(errors).length > 0 && (
          <p className="text-xs uppercase tracking-[0.12em] text-[var(--accent)]">
            Please fix the highlighted fields.
          </p>
        )}
      </div>
    </form>
  );
}
