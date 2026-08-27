"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";

export function CommercialInquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-[24px] border border-vite-blue-mid bg-vite-blue-soft p-8" role="status">
        <CheckCircle2 aria-hidden="true" className="size-8 text-vite-cobalt" strokeWidth={1.7} />
        <h3 className="mt-5 font-display text-3xl text-vite-navy">Your request is ready for review.</h3>
        <p className="mt-3 max-w-xl text-sm leading-6 text-vite-muted">
          This preview form is not connected to a live inbox yet. The production form endpoint will be added before launch.
        </p>
        <button type="button" onClick={() => setSubmitted(false)} className="mt-6 text-sm font-medium text-vite-cobalt underline underline-offset-4">
          Edit request
        </button>
      </div>
    );
  }

  const inputClass = "h-12 w-full rounded-[14px] border border-vite-line bg-vite-paper px-4 text-sm text-vite-ink outline-none transition-colors placeholder:text-vite-muted/70 focus:border-vite-cobalt focus:ring-2 focus:ring-vite-cobalt/20";

  return (
    <form onSubmit={handleSubmit} className="grid gap-5" aria-label="Commercial laundry inquiry">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Business name"><input required name="businessName" className={inputClass} autoComplete="organization" /></Field>
        <Field label="Industry"><select required name="industry" className={inputClass} defaultValue=""><option value="" disabled>Select an industry</option><option>Hospitality</option><option>Food Service</option><option>Health & Wellness</option><option>Beauty & Fitness</option><option>Care & Education</option><option>Other</option></select></Field>
        <Field label="Province"><input required name="province" className={inputClass} defaultValue="Ontario" autoComplete="address-level1" /></Field>
        <Field label="Postal code"><input required name="postalCode" className={inputClass} autoComplete="postal-code" /></Field>
        <Field label="Pickup frequency"><select required name="frequency" className={inputClass} defaultValue=""><option value="" disabled>Select frequency</option><option>Daily</option><option>Multiple times per week</option><option>Weekly</option><option>Biweekly</option><option>Monthly</option></select></Field>
        <Field label="Approximate weight per pickup"><input required name="weight" className={inputClass} placeholder="Example: 150 lbs" /></Field>
        <Field label="Contact name"><input required name="name" className={inputClass} autoComplete="name" /></Field>
        <Field label="Phone"><input required name="phone" type="tel" className={inputClass} autoComplete="tel" /></Field>
      </div>
      <Field label="Email"><input required name="email" type="email" className={inputClass} autoComplete="email" /></Field>
      <Field label="How can we help?">
        <textarea required name="details" rows={5} className="w-full rounded-[14px] border border-vite-line bg-vite-paper px-4 py-3 text-sm leading-6 text-vite-ink outline-none transition-colors placeholder:text-vite-muted/70 focus:border-vite-cobalt focus:ring-2 focus:ring-vite-cobalt/20" placeholder="Tell us about your items, schedule, locations and any handling requirements." />
      </Field>
      <button type="submit" className="h-[52px] w-full rounded-full bg-vite-cobalt px-6 text-sm font-medium text-vite-paper transition-all duration-300 hover:bg-vite-navy active:translate-y-px sm:w-fit">
        Request a Commercial Quote
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="grid gap-2 text-sm font-medium text-vite-ink"><span>{label}</span>{children}</label>;
}
