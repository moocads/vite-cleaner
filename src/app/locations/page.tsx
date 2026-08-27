import Image from "next/image";
import { LocationsExplorer } from "@/components/locations-explorer";
import { PageShell, SectionHeading } from "@/components/page-shell";

export default function LocationsPage() {
  return (
    <PageShell title="Vite care across Toronto." description="Choose one of three Toronto stores and open Google Maps for directions." eyebrow="LOCATIONS">
      <section className="bg-vite-paper px-5 py-20 sm:px-8 lg:px-[72px] lg:py-24">
        <div className="mx-auto max-w-[1296px]">
          <SectionHeading title="Find your nearest Vite." description="Store phone numbers and confirmed opening hours will be added before launch." />
          <div className="mt-12"><LocationsExplorer /></div>
          <p className="mt-6 flex items-start gap-3 text-xs leading-5 text-vite-muted">
            <Image src="/brand/vite-pin.svg" alt="" width={16} height={18} className="mt-0.5 h-[18px] w-auto shrink-0" />
            The Scarborough production facility is shown as an operations location, not a customer drop-off store.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
