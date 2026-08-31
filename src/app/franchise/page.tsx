import Image from "next/image";
import { CheckCircle2, Map, ScanLine, Store, Users } from "lucide-react";
import { FinalCta, PageShell, SectionHeading } from "@/components/page-shell";

const support = [
  { title: "Brand and launch support", body: "A defined customer experience and practical guidance for opening a Vite location.", icon: Store },
  { title: "Operating system", body: "Processes designed to connect local service depots with centralized garment care.", icon: ScanLine },
  { title: "Training and guidance", body: "Support for service standards, daily operations and customer experience.", icon: Users },
  { title: "Territory planning", body: "A location and market discussion based on available franchise territories.", icon: Map },
] as const;

export default function FranchisePage() {
  return (
    <PageShell title="Build a Vite garment care business." description="Explore the model, operating support and path to becoming a Vite franchise partner." eyebrow="FRANCHISE" image="/images/vite-storefront-downtown.jpg" imageAlt="A Vite Cleaners storefront in a downtown business district">
      <section className="bg-vite-paper px-5 py-20 sm:px-8 lg:px-[72px] lg:py-24"><div className="mx-auto max-w-[1296px]"><SectionHeading title="A local service model backed by a connected care network." description="Franchise content follows the official Vite franchise package. Investment and financial details are shared only from approved materials." /><div className="mt-12 grid gap-5 md:grid-cols-2">{support.map((item) => { const Icon = item.icon; return <article key={item.title} className="rounded-[24px] border border-vite-line bg-vite-surface p-7"><Icon aria-hidden="true" className="size-7 text-vite-cobalt" strokeWidth={1.7} /><h2 className="mt-6 font-display text-2xl text-vite-navy">{item.title}</h2><p className="mt-3 text-sm leading-6 text-vite-muted">{item.body}</p></article>; })}</div></div></section>
      <section className="bg-vite-blue-soft px-5 py-20 sm:px-8 lg:px-[72px] lg:py-24"><div className="mx-auto grid max-w-[1296px] items-center gap-12 lg:grid-cols-[1fr_560px] lg:gap-20"><div><SectionHeading title="The franchise journey." /><ul className="mt-8 grid gap-5">{["Review the Vite franchise package", "Discuss territory and candidate fit", "Complete business and financial review", "Plan location, training and launch", "Open with ongoing operational support"].map((item) => <li key={item} className="flex items-center gap-3 text-sm text-vite-ink"><CheckCircle2 aria-hidden="true" className="size-5 text-vite-cobalt" strokeWidth={1.7} />{item}</li>)}</ul></div><div className="relative min-h-[460px] overflow-hidden rounded-[28px]"><Image src="/images/service-tracking.png" alt="A Vite specialist using the garment care operating system" fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" /></div></div></section>
      <FinalCta title="Interested in owning a Vite?" description="Request the official franchise package and begin a conversation with the Vite team." label="Get the Franchise Package" href="/contact?topic=franchise" />
    </PageShell>
  );
}
