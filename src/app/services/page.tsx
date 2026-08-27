import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell, SectionHeading } from "@/components/page-shell";
import { services } from "@/lib/site-data";

export default function ServicesPage() {
  return (
    <PageShell title="Care for every garment." description="Explore professional cleaning, laundry, alterations and specialty care available through the Vite network." eyebrow="SERVICES" image="/images/sustainable-care.png" imageAlt="Garments receiving professional care">
      <section className="bg-vite-paper px-5 py-20 sm:px-8 lg:px-[72px] lg:py-24">
        <div className="mx-auto max-w-[1296px]">
          <SectionHeading title="Choose the care you need." description="Specialty and heavily soiled items are reviewed before service confirmation." />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link key={service.slug} href={`/services/${service.slug}`} className="group flex flex-col overflow-hidden rounded-[24px] border border-vite-line bg-vite-surface transition-all duration-500 hover:-translate-y-1 hover:border-vite-blue-mid">
                  <div className="relative aspect-[4/3] overflow-hidden"><Image src={service.image} alt={service.title} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.025]" /></div>
                  <div className="flex flex-1 flex-col p-6"><Icon aria-hidden="true" className="size-6 text-vite-cobalt" strokeWidth={1.7} /><h2 className="mt-5 font-display text-2xl text-vite-navy">{service.title}</h2><p className="mt-3 text-sm leading-6 text-vite-muted">{service.shortDescription}</p><span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-vite-cobalt">View service <ArrowRight aria-hidden="true" className="size-4" /></span></div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
