import type { Metadata } from "next";

import { ContactForm } from "@/components/layout/ContactForm";

import workStyles from "@/styles/work-page.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Send a message to Tyler Vea — creative technologist and brand strategist.",
};

export default function ContactPage() {
  return (
    <div>
      <header className={workStyles.header}>
        <h1 className="display-lg text-[var(--text-primary)]">Contact</h1>
        <p className="body-md mt-3 max-w-xl text-[var(--text-muted)]">
          Use the form below to reach out about projects or collaborations.
        </p>
      </header>
      <ContactForm />
    </div>
  );
}
