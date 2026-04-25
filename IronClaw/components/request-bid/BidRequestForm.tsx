"use client";

import { FormEvent, KeyboardEvent, useMemo, useState } from "react";
import { services } from "@/components/landing/siteData";

type FlowState = {
  serviceSlug: string;
  scope: string;
  size: string;
  timeline: string;
  location: string;
  propertyType: string;
  budget: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  referral: string;
};

const initialState: FlowState = {
  serviceSlug: "",
  scope: "",
  size: "",
  timeline: "",
  location: "",
  propertyType: "",
  budget: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  companyName: "",
  referral: "",
};

const steps = [
  "Service",
  "Scope",
  "Budget",
  "Review",
  "Contact",
];

const sizeOptions = ["Small package", "Mid-size package", "Large package", "Not sure"];
const timelineOptions = ["ASAP", "1-3 months", "3-6 months", "Flexible"];
const propertyOptions = ["Commercial", "Industrial", "Civic", "Mixed-use"];
const budgetOptions = [
  "Under $250k",
  "$250k-$750k",
  "$750k-$2M",
  "$2M+",
  "Not sure yet",
];
const referralOptions = ["Google", "Referral", "Project partner", "Returning client", "Other"];

export function BidRequestForm() {
  const [form, setForm] = useState<FlowState>(initialState);
  const [stepIndex, setStepIndex] = useState(0);
  const [errors, setErrors] = useState<Partial<Record<keyof FlowState, string>>>({});
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const selectedService = useMemo(
    () => services.find((service) => service.slug === form.serviceSlug),
    [form.serviceSlug]
  );

  const progress = Math.round(((stepIndex + 1) / steps.length) * 100);

  const updateField = (field: keyof FlowState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const validateStep = (index: number) => {
    const nextErrors: Partial<Record<keyof FlowState, string>> = {};

    if (index === 0 && !form.serviceSlug) {
      nextErrors.serviceSlug = "Choose the project type that fits best.";
    }

    if (index === 1) {
      if (!form.scope.trim()) nextErrors.scope = "Add a short scope description.";
      if (!form.location.trim()) nextErrors.location = "Add a city or site location.";
    }

    if (index === 2 && !form.budget) {
      nextErrors.budget = "Choose a rough budget range.";
    }

    if (index === 4) {
      if (!form.firstName.trim()) nextErrors.firstName = "First name is required.";
      if (!form.email.trim()) nextErrors.email = "Email is required.";
      if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        nextErrors.email = "Enter a valid email address.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goNext = () => {
    if (!validateStep(stepIndex)) return;
    setStepIndex((current) => Math.min(current + 1, steps.length - 1));
  };

  const goBack = () => {
    setErrors({});
    setStepIndex((current) => Math.max(current - 1, 0));
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validateStep(4)) return;
    setStatus("success");
  };

  const onCardKeyDown = (event: KeyboardEvent<HTMLButtonElement>, action: () => void) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      action();
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-white/10 bg-[var(--bg)] p-6 md:p-8">
          <div className="btn-gradient-accent grid h-14 w-14 place-items-center rounded-full text-xl font-black">
          OK
        </div>
        <h2 className="mt-6 text-4xl font-black uppercase leading-none md:text-5xl">
          Scope received.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--muted)]">
          Estimating will review your scope, site constraints, and budget range before sending the next scheduling step.
        </p>
        <div className="mt-8 grid gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm text-white/78">
          <p>1. We review the service fit and site assumptions.</p>
          <p>2. We flag missing drawings, access details, or risk items.</p>
          <p>3. You receive a bid follow-up or scheduling link within 1 business day.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="overflow-hidden rounded-xl border border-white/10 bg-[var(--bg)] shadow-2xl shadow-black/30">
      <div className="shader-surface border-b border-white/10 p-5 md:p-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-black uppercase tracking-[0.12em] text-[var(--accent)]">
            Step {stepIndex + 1} of {steps.length}
          </p>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/48">
            Under 2 minutes
          </p>
        </div>
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full rounded-full bg-[var(--accent)] transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-4 grid grid-cols-5 gap-2">
          {steps.map((step, index) => (
            <button
              key={step}
              type="button"
              onClick={() => {
                if (index <= stepIndex) setStepIndex(index);
              }}
              className={`h-2 rounded-full transition-colors ${index <= stepIndex ? "bg-[var(--accent)]" : "bg-white/12"}`}
              aria-label={`Go to ${step} step`}
            />
          ))}
        </div>
      </div>

      <div className="p-5 md:p-8">
        {stepIndex === 0 && (
          <section className="grid gap-6">
            <div>
              <h2 className="text-3xl font-black uppercase leading-none md:text-5xl">What can we help you build?</h2>
              <p className="mt-4 text-base leading-7 text-[var(--muted)]">Choose the option that best matches the work package.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {services.map((service) => {
                const selected = form.serviceSlug === service.slug;
                return (
                  <button
                    key={service.slug}
                    type="button"
                    onClick={() => {
                      updateField("serviceSlug", service.slug);
                      setTimeout(() => setStepIndex(1), 120);
                    }}
                    onKeyDown={(event) => onCardKeyDown(event, () => updateField("serviceSlug", service.slug))}
                    className={`min-h-[132px] rounded-lg border p-5 text-left transition duration-300 hover:scale-[1.01] hover:border-[var(--accent)] ${selected ? "border-[var(--accent)] bg-[rgba(242,177,70,0.1)]" : "border-white/10 bg-white/[0.03]"}`}
                    aria-pressed={selected}
                  >
                    <span className={`mb-4 grid h-5 w-5 place-items-center rounded-full border-2 ${selected ? "border-[var(--accent)]" : "border-white/26"}`}>
                      <span className={`h-2 w-2 rounded-full ${selected ? "bg-[var(--accent)]" : "bg-transparent"}`} />
                    </span>
                    <span className="block text-xl font-black uppercase leading-none text-white">{service.title}</span>
                    <span className="mt-3 block text-sm leading-6 text-[var(--muted)]">{service.kicker}</span>
                  </button>
                );
              })}
            </div>
            {errors.serviceSlug && <p className="text-sm font-bold text-[var(--accent)]">{errors.serviceSlug}</p>}
          </section>
        )}

        {stepIndex === 1 && (
          <section className="grid gap-6">
            <div>
              <h2 className="text-3xl font-black uppercase leading-none md:text-5xl">Tell us the site basics.</h2>
              <p className="mt-4 text-base leading-7 text-[var(--muted)]">A few details help estimating understand schedule pressure and field constraints.</p>
            </div>
            <div className="grid gap-2">
              <label htmlFor="scope" className="text-xs font-black uppercase tracking-[0.12em] text-white/58">Scope description</label>
              <textarea
                id="scope"
                rows={5}
                value={form.scope}
                onChange={(event) => updateField("scope", event.target.value)}
                className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(242,177,70,0.18)]"
                placeholder="Briefly describe the project, constraints, or bid package."
                aria-invalid={Boolean(errors.scope)}
                aria-describedby={errors.scope ? "scope-error" : undefined}
              />
              {errors.scope && <p id="scope-error" className="text-sm font-bold text-[var(--accent)]">{errors.scope}</p>}
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <OptionGroup label="Project size" value={form.size} options={sizeOptions} onChange={(value) => updateField("size", value)} />
              <OptionGroup label="Timeline" value={form.timeline} options={timelineOptions} onChange={(value) => updateField("timeline", value)} />
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="grid gap-2">
                <label htmlFor="location" className="text-xs font-black uppercase tracking-[0.12em] text-white/58">Location</label>
                <input
                  id="location"
                  value={form.location}
                  onChange={(event) => updateField("location", event.target.value)}
                  className="h-[52px] rounded-lg border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(242,177,70,0.18)]"
                  placeholder="City or site address"
                  aria-invalid={Boolean(errors.location)}
                  aria-describedby={errors.location ? "location-error" : undefined}
                />
                {errors.location && <p id="location-error" className="text-sm font-bold text-[var(--accent)]">{errors.location}</p>}
              </div>
              <OptionGroup label="Property type" value={form.propertyType} options={propertyOptions} onChange={(value) => updateField("propertyType", value)} />
            </div>
          </section>
        )}

        {stepIndex === 2 && (
          <section className="grid gap-6">
            <div>
              <h2 className="text-3xl font-black uppercase leading-none md:text-5xl">What is the rough budget?</h2>
              <p className="mt-4 text-base leading-7 text-[var(--muted)]">No commitment. This helps route the scope to the right estimating path.</p>
            </div>
            <div className="grid gap-3">
              {budgetOptions.map((option) => {
                const selected = form.budget === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => updateField("budget", option)}
                    className={`flex min-h-[58px] items-center justify-between rounded-lg border px-4 text-left text-sm font-black uppercase tracking-[0.08em] transition hover:scale-[1.01] hover:border-[var(--accent)] ${selected ? "border-[var(--accent)] bg-[rgba(242,177,70,0.1)] text-white" : "border-white/10 bg-white/[0.03] text-white/74"}`}
                    aria-pressed={selected}
                  >
                    <span>{option}</span>
                    <span className={`h-5 w-5 rounded-full border-2 ${selected ? "border-[var(--accent)] bg-[var(--accent)]" : "border-white/24"}`} />
                  </button>
                );
              })}
            </div>
            {errors.budget && <p className="text-sm font-bold text-[var(--accent)]">{errors.budget}</p>}
            <p className="rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-[var(--muted)]">
              No budget locked yet? Choose Not sure yet and we will help frame alternates around scope and schedule.
            </p>
          </section>
        )}

        {stepIndex === 3 && (
          <section className="grid gap-6">
            <div>
              <h2 className="text-3xl font-black uppercase leading-none md:text-5xl">Review the package.</h2>
              <p className="mt-4 text-base leading-7 text-[var(--muted)]">Everything look right? Continue to contact details and we will route it.</p>
            </div>
            <div className="grid gap-3">
              <SummaryRow label="Service" value={selectedService?.title || "Not selected"} onEdit={() => setStepIndex(0)} />
              <SummaryRow label="Scope" value={form.scope || "Not provided"} onEdit={() => setStepIndex(1)} />
              <SummaryRow label="Location" value={form.location || "Not provided"} onEdit={() => setStepIndex(1)} />
              <SummaryRow label="Budget" value={form.budget || "Not selected"} onEdit={() => setStepIndex(2)} />
              <SummaryRow label="Timeline" value={form.timeline || "Not selected"} onEdit={() => setStepIndex(1)} />
            </div>
          </section>
        )}

        {stepIndex === 4 && (
          <section className="grid gap-6">
            <div>
              <h2 className="text-3xl font-black uppercase leading-none md:text-5xl">How do we reach you?</h2>
              <p className="mt-4 text-base leading-7 text-[var(--muted)]">Contact details stay last so the scope comes first.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <FlowInput id="firstName" label="First name" value={form.firstName} onChange={(value) => updateField("firstName", value)} error={errors.firstName} required />
              <FlowInput id="lastName" label="Last name" value={form.lastName} onChange={(value) => updateField("lastName", value)} />
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <FlowInput id="email" label="Email" type="email" inputMode="email" value={form.email} onChange={(value) => updateField("email", value)} error={errors.email} required />
              <FlowInput id="phone" label="Phone" type="tel" inputMode="tel" value={form.phone} onChange={(value) => updateField("phone", value)} />
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <FlowInput id="companyName" label="Company" value={form.companyName} onChange={(value) => updateField("companyName", value)} />
              <div className="grid gap-2">
                <label htmlFor="referral" className="text-xs font-black uppercase tracking-[0.12em] text-white/58">How did you hear about us?</label>
                <select
                  id="referral"
                  value={form.referral}
                  onChange={(event) => updateField("referral", event.target.value)}
                  className="h-[52px] rounded-lg border border-white/10 bg-[var(--bg)] px-4 text-sm text-white outline-none transition focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(242,177,70,0.18)]"
                >
                  <option value="">Select one</option>
                  {referralOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-[var(--muted)]">
              Your info is secure and never shared. We typically respond within 1 business day.
            </div>
          </section>
        )}
      </div>

      <div className="sticky bottom-0 grid gap-3 border-t border-white/10 bg-[rgba(8,10,10,0.92)] p-5 backdrop-blur md:flex md:items-center md:justify-between md:p-6">
        <button
          type="button"
          onClick={goBack}
          disabled={stepIndex === 0}
          className="min-h-[52px] rounded-full px-5 text-sm font-black uppercase tracking-[0.12em] text-white/58 transition disabled:opacity-35 md:min-h-0"
        >
          Back
        </button>
        {stepIndex < steps.length - 1 ? (
          <button
            type="button"
            onClick={goNext}
            className="btn-gradient-accent min-h-[52px] rounded-full border border-[var(--accent)] px-6 text-sm font-black uppercase tracking-[0.12em] transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Continue
          </button>
        ) : (
          <button
            type="submit"
            className="btn-gradient-accent min-h-[52px] rounded-full border border-[var(--accent)] px-6 text-sm font-black uppercase tracking-[0.12em] transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Confirm Scope
          </button>
        )}
      </div>
    </form>
  );
}

type OptionGroupProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

function OptionGroup({ label, value, options, onChange }: OptionGroupProps) {
  return (
    <fieldset className="grid gap-2">
      <legend className="text-xs font-black uppercase tracking-[0.12em] text-white/58">{label}</legend>
      <div className="grid gap-2">
        {options.map((option) => {
          const selected = value === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`flex min-h-[46px] items-center gap-3 rounded-lg border px-3 text-left text-sm font-semibold transition hover:border-[var(--accent)] ${selected ? "border-[var(--accent)] bg-[rgba(242,177,70,0.1)] text-white" : "border-white/10 bg-white/[0.03] text-white/70"}`}
              aria-pressed={selected}
            >
              <span className={`grid h-5 w-5 place-items-center rounded-full border-2 ${selected ? "border-[var(--accent)]" : "border-white/24"}`}>
                <span className={`h-2 w-2 rounded-full ${selected ? "bg-[var(--accent)]" : "bg-transparent"}`} />
              </span>
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

type FlowInputProps = {
  id: keyof FlowState;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  inputMode?: "text" | "email" | "tel";
  required?: boolean;
};

function FlowInput({ id, label, value, onChange, error, type = "text", inputMode = "text", required = false }: FlowInputProps) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-xs font-black uppercase tracking-[0.12em] text-white/58">
        {label}
      </label>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="h-[52px] rounded-lg border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(242,177,70,0.18)]"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && <p id={`${id}-error`} className="text-sm font-bold text-[var(--accent)]">{error}</p>}
    </div>
  );
}

type SummaryRowProps = {
  label: string;
  value: string;
  onEdit: () => void;
};

function SummaryRow({ label, value, onEdit }: SummaryRowProps) {
  return (
    <div className="grid gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-4 md:grid-cols-[160px_1fr_auto] md:items-center">
      <p className="text-xs font-black uppercase tracking-[0.12em] text-white/44">{label}</p>
      <p className="text-sm font-semibold leading-6 text-white/82">{value}</p>
      <button type="button" onClick={onEdit} className="w-fit rounded-full border border-white/12 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white hover:border-[var(--accent)]">
        Edit
      </button>
    </div>
  );
}
