import { CheckCircle2 } from "lucide-react";
import { FinalCta, PageShell, SectionHeading } from "@/components/page-shell";

const groups = [
  { title: "Dry Cleaning", items: ["Shirts and blouses", "Pants and skirts", "Dresses", "Suits and jackets", "Coats and sweaters"] },
  { title: "Laundry", items: ["Shirt laundry", "Wash & fold", "Towels", "Bed sheets", "Household laundry"] },
  { title: "Specialist Services", items: ["Alterations", "Wedding dress care", "Leather and suede", "Shoes", "Specialty garments"] },
] as const;

export default function PricingPage() {
  return (
    <PageShell title="Pricing with the right context." description="Garment, fabric, condition and finish all shape the final price. Confirmed item rates will be published before launch." eyebrow="PRICING">
      <section className="bg-vite-paper px-5 py-20 sm:px-8 lg:px-[72px] lg:py-24">
        <div className="mx-auto max-w-[1296px]"><SectionHeading title="How Vite pricing works." description="Every item is assessed before care. Specialty services and alterations may require a quote." /><div className="mt-12 grid gap-5 md:grid-cols-3">{groups.map((group) => <section key={group.title} className="rounded-[24px] border border-vite-line bg-vite-surface p-7"><h2 className="font-display text-2xl text-vite-navy">{group.title}</h2><ul className="mt-6 grid gap-4">{group.items.map((item) => <li key={item} className="flex items-center gap-3 text-sm text-vite-muted"><CheckCircle2 aria-hidden="true" className="size-5 text-vite-cobalt" strokeWidth={1.7} />{item}</li>)}</ul><p className="mt-7 border-t border-vite-line pt-5 text-xs leading-5 text-vite-muted">Final rates pending client confirmation.</p></section>)}</div></div>
      </section>
      <FinalCta title="Need an exact price?" description="Visit a Vite location so the team can assess the item and confirm the right service." label="Find a Location" href="/locations" />
    </PageShell>
  );
}
