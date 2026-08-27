import { PackageCheck, Shirt, Truck } from "lucide-react";
import { PageShell, FinalCta, SectionHeading } from "@/components/page-shell";
import { orderOnlineUrl } from "@/lib/site-data";

const steps = [
  { title: "Choose an available pickup", description: "Continue through the external online ordering platform.", icon: Truck },
  { title: "Prepare your garments", description: "Place items together and include any care notes requested during ordering.", icon: PackageCheck },
  { title: "Professional care", description: "Garments are assessed, cleaned and finished for the selected service.", icon: Shirt },
  { title: "Delivery back", description: "Finished items return according to the option confirmed with your order.", icon: Truck },
] as const;

export default function PickupDeliveryPage() {
  return (
    <PageShell title="Pickup and delivery around your week." description="A convenient route from your door to professional garment care and back again." eyebrow="PICKUP & DELIVERY" image="/images/audience-families.png" imageAlt="A family enjoying time at home">
      <section className="bg-vite-paper px-5 py-20 sm:px-8 lg:px-[72px] lg:py-24"><div className="mx-auto max-w-[1296px]"><SectionHeading title="From collection to finished return." description="Coverage, fees, minimum order and available windows will follow the confirmed external ordering rules." /><div className="mt-12 grid gap-5 md:grid-cols-2">{steps.map((step) => { const Icon = step.icon; return <article key={step.title} className="rounded-[24px] border border-vite-line bg-vite-surface p-7"><Icon aria-hidden="true" className="size-6 text-vite-cobalt" strokeWidth={1.7} /><h2 className="mt-6 font-display text-2xl text-vite-navy">{step.title}</h2><p className="mt-3 text-sm leading-6 text-vite-muted">{step.description}</p></article>; })}</div></div></section>
      <FinalCta title="Ready to check availability?" description="Continue to the online ordering platform once the final external link is connected." label="Order Online" href={orderOnlineUrl} />
    </PageShell>
  );
}
