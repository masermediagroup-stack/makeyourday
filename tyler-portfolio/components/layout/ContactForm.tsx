"use client";

import type { FormEvent } from "react";

import { site } from "@/data/site";

import formStyles from "@/styles/contact-form.module.css";

export function ContactForm() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const first = String(fd.get("firstName") ?? "").trim();
    const last = String(fd.get("lastName") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    const subject = encodeURIComponent("Portfolio inquiry");
    const body = encodeURIComponent(
      `Name: ${first} ${last}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form
      className={formStyles.form}
      onSubmit={handleSubmit}
      aria-label="Contact form"
    >
      <div className={formStyles.flex}>
        <label htmlFor="contact-first-name">
          <input
            id="contact-first-name"
            name="firstName"
            required
            type="text"
            className={formStyles.input}
            autoComplete="given-name"
            placeholder=" "
          />
          <span>first name</span>
        </label>

        <label htmlFor="contact-last-name">
          <input
            id="contact-last-name"
            name="lastName"
            required
            type="text"
            className={formStyles.input}
            autoComplete="family-name"
            placeholder=" "
          />
          <span>last name</span>
        </label>
      </div>

      <label htmlFor="contact-email">
        <input
          id="contact-email"
          name="email"
          required
          type="email"
          className={formStyles.input}
          autoComplete="email"
          placeholder=" "
        />
        <span>email</span>
      </label>

      <label htmlFor="contact-phone">
        <input
          id="contact-phone"
          name="phone"
          required
          type="tel"
          className={formStyles.input}
          autoComplete="tel"
          placeholder=" "
        />
        <span>contact number</span>
      </label>

      <label htmlFor="contact-message">
        <textarea
          id="contact-message"
          name="message"
          required
          rows={3}
          className={formStyles.input01}
          placeholder=" "
        />
        <span>message</span>
      </label>

      <button type="submit" className={formStyles.fancy}>
        <span className={formStyles.topKey} aria-hidden />
        <span className={formStyles.text}>submit</span>
        <span className={formStyles.bottomKey1} aria-hidden />
        <span className={formStyles.bottomKey2} aria-hidden />
      </button>
    </form>
  );
}
