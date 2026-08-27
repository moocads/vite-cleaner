import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";
import { FinalCta, PageShell, SectionHeading } from "@/components/page-shell";
import { services } from "@/lib/site-data";

type ServicePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return services.map((service) => ({ slug: service.slug })); }

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  return { title: service?.title ?? "Service", description: service?.shortDescription };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  const Icon = service.icon;

  return (
    <PageShell title={service.title} description={service.shortDescription} eyebrow="VITE SERVICE" image={service.image} imageAlt={service.title}>
      <section className="bg-vite-paper px-5 py-20 sm:px-8 lg:px-[72px] lg:py-24">
        <div className="mx-auto grid max-w-[1296px] gap-12 lg:grid-cols-[1fr_420px] lg:gap-20">
          <div><Icon aria-hidden="true" className="size-8 text-vite-cobalt" strokeWidth={1.7} /><SectionHeading title="Thoughtful care from assessment to finish." description={service.description} /><Link href="/locations" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-vite-cobalt">Find a location <ArrowRight aria-hidden="true" className="size-4" /></Link></div>
          <div className="rounded-[24px] bg-vite-blue-soft p-7 sm:p-8"><h2 className="font-display text-2xl text-vite-navy">Common items</h2><ul className="mt-6 grid gap-4">{service.items.map((item) => <li key={item} className="flex items-center gap-3 text-sm text-vite-ink"><CheckCircle2 aria-hidden="true" className="size-5 text-vite-cobalt" strokeWidth={1.7} />{item}</li>)}</ul><p className="mt-7 text-xs leading-5 text-vite-muted">Final care method and pricing depend on fabric, construction, condition and requested finish.</p></div>
        </div>
      </section>
      <FinalCta title="Not sure which service fits?" description="Bring the item to a Vite store for an in-person assessment." label="Find a Location" href="/locations" />
    </PageShell>
  );
}
