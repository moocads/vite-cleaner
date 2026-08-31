import Image from "next/image";
import { CalendarDays, ExternalLink, MapPin, PackageCheck, Shirt } from "lucide-react";
import { PageShell, FinalCta, SectionHeading } from "@/components/page-shell";
import { bluebitsUrl } from "@/lib/site-data";

const steps = [
  { title: "Book a drop off appointment", description: "Vite Store or BlueBox", icon: CalendarDays },
  { title: "Drop off at your nearest Vite Location", description: "Vite Store or BlueBox", icon: MapPin },
  { title: "Professional Care", description: "Your garments receive professional care.", icon: Shirt },
  { title: "Pick up at your nearest Vite Location", description: "Vite Store or BlueBox", icon: PackageCheck },
] as const;

export default function PickupDeliveryPage() {
  return (
    <PageShell title="Drop off and pick up around your week." description="Book a drop off appointment, leave your garments at a Vite Store or BlueBox, and pick them up after professional care." eyebrow="DROP OFF & PICKUP" image="/images/vite-storefront-bay-bloor.jpg" imageAlt="The Vite Cleaners storefront at Bay and Bloor in Toronto">
      <section className="bg-vite-paper px-5 py-20 sm:px-8 lg:px-[72px] lg:py-24">
        <div className="mx-auto max-w-[1296px]">
          <SectionHeading title="Four simple steps from drop off to pickup." />
          <div className="mt-12 grid gap-5 md:grid-cols-2">{steps.map((step) => { const Icon = step.icon; return <article key={step.title} className="rounded-[24px] border border-vite-line bg-vite-surface p-7"><Icon aria-hidden="true" className="size-6 text-vite-cobalt" strokeWidth={1.7} /><h2 className="mt-6 font-display text-2xl text-vite-navy">{step.title}</h2><p className="mt-3 text-sm leading-6 text-vite-muted">{step.description}</p></article>; })}</div>
          <div className="mt-12 grid items-center gap-8 rounded-[28px] bg-vite-blue-soft p-7 sm:p-9 lg:grid-cols-[1fr_auto] lg:p-10">
            <div>
              <p className="text-xs font-medium text-vite-cobalt">BLUEBOX SMART LOCKERS</p>
              <h2 className="mt-4 font-display text-3xl text-vite-navy sm:text-4xl">A convenient BlueBox drop off option.</h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-vite-muted">BlueBox smart lockers are provided by Bluebits. Visit Bluebits to learn more about the secure smart locker service.</p>
            </div>
            <a href={bluebitsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-5 rounded-[18px] border border-vite-line bg-vite-paper px-6 py-5 transition-colors hover:border-vite-blue-mid" aria-label="Visit Bluebits to learn about BlueBox smart lockers">
              <Image src="/brand/bluebits-logo.png" alt="BlueBox" width={512} height={114} unoptimized className="h-auto w-[154px]" />
              <ExternalLink aria-hidden="true" className="size-5 shrink-0 text-vite-cobalt" />
            </a>
          </div>
        </div>
      </section>
      <FinalCta title="Choose your nearest drop off location." description="Visit a Vite Store or use an available BlueBox smart locker." label="Find a Location" href="/locations" />
    </PageShell>
  );
}
