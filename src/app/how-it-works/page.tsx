import { CalendarDays, PackageCheck, Shirt, Truck } from "lucide-react";
import { FinalCta, PageShell, SectionHeading } from "@/components/page-shell";

const process = [
  { title: "Choose", body: "Select a service, visit a store or continue through online ordering.", icon: CalendarDays },
  { title: "Handoff", body: "Drop off your garments or use an available pickup option.", icon: PackageCheck },
  { title: "Care", body: "Items are assessed, cleaned and finished for their material and construction.", icon: Shirt },
  { title: "Return", body: "Collect from your store or receive the order through delivery.", icon: Truck },
] as const;

export default function HowItWorksPage() {
  return <PageShell title="A clear path to better garment care." description="Every service begins with the item, the material and the result you need." eyebrow="HOW IT WORKS" image="/images/service-tracking.png" imageAlt="A garment care specialist checking an item"><section className="bg-vite-paper px-5 py-20 sm:px-8 lg:px-[72px] lg:py-24"><div className="mx-auto max-w-[1296px]"><SectionHeading title="Simple for you. Considered behind the scenes." /><div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{process.map((item) => { const Icon = item.icon; return <article key={item.title} className="border-l border-vite-line pl-6"><Icon aria-hidden="true" className="size-7 text-vite-cobalt" strokeWidth={1.7} /><h2 className="mt-6 font-display text-2xl text-vite-navy">{item.title}</h2><p className="mt-3 text-sm leading-6 text-vite-muted">{item.body}</p></article>; })}</div></div></section><FinalCta title="Choose the most convenient start." description="Visit a Toronto store or explore pickup and delivery options." label="Find a Location" href="/locations" /></PageShell>;
}
