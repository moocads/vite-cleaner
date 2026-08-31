import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CircleCheckBig,
  ExternalLink,
  Leaf,
  PackageCheck,
  Route,
  Scissors,
  Shirt,
  Sparkles,
  Store,
  Truck,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { LocationsExplorer } from "@/components/locations-explorer";
import { SiteFooter } from "@/components/site-footer";
import { buttonVariants } from "@/components/ui/button";
import { getGoogleMapsApiKey } from "@/lib/maps";
import { bluebitsUrl, orderOnlineUrl, services } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const trustPoints = [
  { title: "Professional garment care", icon: Shirt },
  { title: "Three Toronto stores", icon: Store },
  { title: "Drop off and pickup", icon: Truck },
  { title: "Fabric-aware processes", icon: Leaf },
] as const;

function TrustStrip() {
  return (
    <section className="bg-vite-navy text-vite-paper">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-px bg-vite-paper/15 sm:grid-cols-4">
        {trustPoints.map((point, index) => {
          const Icon = point.icon;
          return (
            <Reveal key={point.title} delay={index * 0.04} className="flex min-h-28 items-center gap-4 bg-vite-navy px-5 py-6 sm:px-7 lg:px-9">
              <Icon aria-hidden="true" className="size-5 shrink-0 text-vite-blue-soft" strokeWidth={1.7} />
              <p className="text-sm font-medium leading-5">{point.title}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function HowItWorks() {
  const actions = [
    { title: "Book a drop off appointment", description: "Choose a Vite Store or BlueBox.", icon: CalendarDays },
    { title: "Drop off at your nearest Vite Location", description: "Use a Vite Store or BlueBox.", icon: PackageCheck },
    { title: "Professional Care", description: "Your garments receive professional care.", icon: Sparkles },
    { title: "Pick up at your nearest Vite Location", description: "Return to a Vite Store or BlueBox.", icon: Truck },
  ] as const;

  return (
    <section id="how-it-works" className="bg-vite-paper px-5 py-20 sm:px-8 lg:px-[72px] lg:py-24">
      <div className="mx-auto max-w-[1296px]">
        <Reveal>
          <h2 className="max-w-3xl font-display text-4xl leading-[1.03] text-vite-ink sm:text-5xl">Garment care, without the guesswork.</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-vite-muted">A clear path from handoff to a carefully finished return.</p>
        </Reveal>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Reveal key={action.title} delay={index * 0.05} className="relative border-l border-vite-line pl-6">
                <span className="flex size-12 items-center justify-center rounded-[14px] bg-vite-blue-soft text-vite-cobalt">
                  <Icon aria-hidden="true" className="size-6" strokeWidth={1.7} />
                </span>
                <h3 className="mt-6 font-display text-xl text-vite-navy">{action.title}</h3>
                <p className="mt-3 text-sm leading-6 text-vite-muted">{action.description}</p>
              </Reveal>
            );
          })}
        </div>
        <Link href="/how-it-works" className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-vite-cobalt hover:text-vite-navy">
          See the full process <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.7} />
        </Link>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="bg-vite-surface px-5 py-20 sm:px-8 lg:px-[72px] lg:py-24">
      <div className="mx-auto max-w-[1296px]">
        <Reveal>
          <h2 className="max-w-3xl font-display text-4xl leading-[1.03] text-vite-ink sm:text-5xl">Care for every part of your wardrobe.</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-vite-muted">From everyday laundry to specialist assessment, choose the care your garments need.</p>
        </Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            const wide = index < 2;
            return (
              <Reveal key={service.slug} delay={(index % 3) * 0.04} className={wide ? "lg:col-span-6" : "lg:col-span-3"}>
                <Link href={`/services/${service.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-vite-line bg-vite-paper transition-all duration-500 hover:-translate-y-1 hover:border-vite-blue-mid">
                  <div className={cn("relative overflow-hidden", wide ? "aspect-[16/9]" : "aspect-[4/3]")}>
                    <Image src={service.image} alt={service.title} fill sizes={wide ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 100vw"} className="object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="flex size-10 items-center justify-center rounded-[12px] bg-vite-blue-soft text-vite-cobalt"><Icon aria-hidden="true" className="size-5" strokeWidth={1.7} /></span>
                    <h3 className="mt-5 font-display text-2xl text-vite-navy">{service.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-vite-muted">{service.shortDescription}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-medium text-vite-cobalt">View service <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.7} /></span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PricingPreview() {
  const pricing = [
    { title: "Dry Cleaning", detail: "Item-based pricing", icon: Sparkles },
    { title: "Wash & Fold", detail: "Priced by weight", icon: Shirt },
    { title: "Alterations", detail: "Quoted after assessment", icon: Scissors },
  ] as const;
  return (
    <section className="bg-vite-paper px-5 py-20 sm:px-8 lg:px-[72px] lg:py-24">
      <div className="mx-auto max-w-[1296px]">
        <Reveal>
          <h2 className="font-display text-4xl leading-[1.03] text-vite-ink sm:text-5xl">Clear guidance before we begin.</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-vite-muted">Pricing depends on the garment, fabric, condition and requested finish. Confirmed rates will be added before launch.</p>
        </Reveal>
        <div className="mt-12 grid overflow-hidden rounded-[24px] border border-vite-line bg-vite-surface md:grid-cols-3">
          {pricing.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 0.05} className="border-b border-vite-line p-7 last:border-b-0 md:border-b-0 md:border-l md:first:border-l-0 lg:p-9">
                <Icon aria-hidden="true" className="size-6 text-vite-cobalt" strokeWidth={1.7} />
                <h3 className="mt-6 font-display text-2xl text-vite-navy">{item.title}</h3>
                <p className="mt-2 text-sm text-vite-muted">{item.detail}</p>
              </Reveal>
            );
          })}
        </div>
        <Link href="/pricing" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-vite-cobalt hover:text-vite-navy">View pricing approach <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.7} /></Link>
      </div>
    </section>
  );
}

function LocationsMap() {
  const googleMapsApiKey = getGoogleMapsApiKey();

  return (
    <section id="locations" className="bg-vite-blue-soft px-5 py-20 sm:px-8 lg:px-[72px] lg:py-24">
      <div className="mx-auto max-w-[1296px]">
        <Reveal>
          <h2 className="font-display text-4xl leading-[1.03] text-vite-ink sm:text-5xl">Three Toronto stores. One connected care network.</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-vite-muted">Choose a convenient store, then open Google Maps for directions.</p>
        </Reveal>
        <div className="mt-12"><LocationsExplorer compact apiKey={googleMapsApiKey} /></div>
        <Link href="/locations" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-vite-cobalt hover:text-vite-navy">View location details <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.7} /></Link>
      </div>
    </section>
  );
}

function PickupDelivery() {
  return (
    <section className="bg-vite-paper px-5 py-20 sm:px-8 lg:px-[72px] lg:py-24">
      <div className="mx-auto grid max-w-[1296px] items-center gap-10 lg:grid-cols-[minmax(0,620px)_1fr] lg:gap-16">
        <Reveal className="relative min-h-[440px] overflow-hidden rounded-[28px] lg:min-h-[560px]">
          <Image src="/images/vite-storefront-bay-bloor.jpg" alt="The Vite Cleaners storefront at Bay and Bloor in Toronto" fill sizes="(min-width: 1024px) 620px, 100vw" className="object-cover" />
        </Reveal>
        <Reveal>
          <span className="flex size-12 items-center justify-center rounded-[14px] bg-vite-blue-soft text-vite-cobalt"><Route aria-hidden="true" className="size-6" strokeWidth={1.7} /></span>
          <h2 className="mt-7 font-display text-4xl leading-[1.03] text-vite-ink sm:text-5xl">Drop off and pickup, made simple.</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-vite-muted">Book a drop off appointment, leave your garments at a Vite Store or BlueBox, and pick them up after professional care.</p>
          <div className="mt-7 grid gap-3">
            {["Book a drop off appointment", "Drop off at your nearest Vite Location", "Professional Care", "Pick up at your nearest Vite Location"].map((item) => <p key={item} className="flex items-start gap-3 text-sm leading-6 text-vite-ink"><CircleCheckBig aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-vite-cobalt" strokeWidth={1.7} />{item}</p>)}
          </div>
          <a href={bluebitsUrl} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-4 rounded-[16px] border border-vite-line bg-vite-surface px-5 py-4 transition-colors hover:border-vite-blue-mid" aria-label="Visit Bluebits to learn about BlueBox smart lockers">
            <Image src="/brand/bluebits-logo.png" alt="BlueBox" width={512} height={114} unoptimized className="h-auto w-[132px]" />
            <span className="text-xs leading-5 text-vite-muted">BlueBox smart lockers <ExternalLink aria-hidden="true" className="ml-1 inline size-3.5 text-vite-cobalt" /></span>
          </a>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/pickup-delivery" className={cn(buttonVariants(), "h-[52px] rounded-full bg-vite-cobalt px-6 text-vite-paper hover:bg-vite-navy")}>See how it works</Link>
            <Link href="/locations" className={cn(buttonVariants({ variant: "outline" }), "h-[52px] rounded-full border-vite-cobalt bg-transparent px-6 text-vite-cobalt hover:bg-vite-blue-soft")}>Find a Location <ArrowRight aria-hidden="true" className="size-4" /></Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="bg-vite-surface px-5 py-20 sm:px-8 lg:px-[72px] lg:py-24">
      <div className="mx-auto grid max-w-[1296px] gap-6 lg:grid-cols-[1fr_420px]">
        <Reveal className="rounded-[28px] bg-vite-navy p-8 text-vite-paper sm:p-10 lg:p-12">
          <h2 className="max-w-2xl font-display text-4xl leading-[1.03] sm:text-5xl">Real feedback belongs here.</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-vite-blue-soft/80">Verified Google reviews will replace the current sample copy before the website launches.</p>
          <Link href="/reviews" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-vite-paper hover:text-vite-blue-soft">Review section details <ArrowRight aria-hidden="true" className="size-4" /></Link>
        </Reveal>
        <Reveal delay={0.06} className="rounded-[28px] border border-vite-line bg-vite-paper p-8 sm:p-10">
          <p className="text-sm font-medium text-vite-cobalt">LAUNCH REQUIREMENT</p>
          <ul className="mt-7 grid gap-5 text-sm leading-6 text-vite-muted">
            <li>Verified customer quote</li><li>Customer display name</li><li>Store or service context</li><li>Google review source</li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function CommercialTeaser() {
  return (
    <section className="bg-vite-paper px-5 py-20 sm:px-8 lg:px-[72px] lg:py-24">
      <div className="mx-auto grid max-w-[1296px] overflow-hidden rounded-[28px] bg-vite-blue-soft lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal className="flex flex-col justify-center p-8 sm:p-10 lg:p-14">
          <p className="text-xs font-medium text-vite-cobalt">COMMERCIAL LAUNDRY</p>
          <h2 className="mt-5 font-display text-4xl leading-[1.03] text-vite-ink sm:text-5xl">Laundry operations built around your business.</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-vite-muted">Flexible recurring pickup, custom handling and preferred commercial rates across the GTA.</p>
          <Link href="/commercial" className={cn(buttonVariants(), "mt-8 h-[52px] w-fit rounded-full bg-vite-cobalt px-6 text-vite-paper hover:bg-vite-navy")}>Explore Commercial Laundry <ArrowRight aria-hidden="true" className="size-4" /></Link>
        </Reveal>
        <Reveal delay={0.06} className="relative min-h-[440px] lg:min-h-[600px]">
          <Image src="/images/commercial-laundry-gta.png" alt="A professional commercial laundry facility processing linens" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
        </Reveal>
      </div>
    </section>
  );
}

function CareGuide() {
  const articles = [
    { title: "Caring for coats through a Toronto winter", image: "/images/audience-seasonal.png" },
    { title: "When a garment needs dry cleaning", image: "/images/sustainable-care.png" },
    { title: "How professional finishing changes the result", image: "/images/service-tracking.png" },
  ] as const;
  return (
    <section className="bg-vite-surface px-5 py-20 sm:px-8 lg:px-[72px] lg:py-24">
      <div className="mx-auto max-w-[1296px]">
        <Reveal><h2 className="font-display text-4xl leading-[1.03] text-vite-ink sm:text-5xl">Care guidance for Toronto wardrobes.</h2></Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {articles.map((article, index) => <Reveal key={article.title} delay={index * 0.05}><article className="group overflow-hidden rounded-[24px] border border-vite-line bg-vite-paper"><div className="relative aspect-[4/3] overflow-hidden"><Image src={article.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.025]" /></div><div className="p-6"><h3 className="font-display text-2xl leading-[1.15] text-vite-navy">{article.title}</h3><Link href="/care-guide" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-vite-cobalt">Read guide <ArrowRight aria-hidden="true" className="size-4" /></Link></div></article></Reveal>)}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const questions = [
    ["How do I know which service I need?", "Bring the garment to a Vite store for assessment. The team can recommend the appropriate care method."],
    ["Do all stores provide the same services?", "Core services are available across the network. Specialty items may need confirmation before acceptance."],
    ["Where can I see current pricing?", "A confirmed price list is being prepared. Final pricing may vary by garment, fabric and condition."],
    ["How do drop off and pickup work?", "Book a drop off appointment, leave your garments at a Vite Store or BlueBox, and pick them up after professional care."],
  ] as const;
  return (
    <section className="bg-vite-paper px-5 py-20 sm:px-8 lg:px-[72px] lg:py-24">
      <div className="mx-auto grid max-w-[1296px] gap-10 lg:grid-cols-[380px_1fr] lg:gap-16">
        <Reveal><h2 className="font-display text-4xl leading-[1.03] text-vite-ink sm:text-5xl">Questions before your first visit?</h2><Link href="/faq" className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-vite-cobalt">View all FAQs <ArrowRight aria-hidden="true" className="size-4" /></Link></Reveal>
        <div className="grid gap-3">{questions.map(([question, answer]) => <details key={question} className="group rounded-[18px] border border-vite-line bg-vite-surface p-5 open:bg-vite-blue-soft"><summary className="cursor-pointer list-none font-display text-lg text-vite-navy">{question}</summary><p className="mt-4 max-w-2xl text-sm leading-6 text-vite-muted">{answer}</p></details>)}</div>
      </div>
    </section>
  );
}

function FranchiseTeaser() {
  return (
    <section className="bg-vite-navy px-5 py-16 text-vite-paper sm:px-8 lg:px-[72px] lg:py-20">
      <div className="mx-auto grid max-w-[1296px] items-end gap-8 lg:grid-cols-[1fr_auto]">
        <Reveal><h2 className="max-w-3xl font-display text-4xl leading-[1.03] sm:text-5xl">Bring Vite garment care to a new community.</h2><p className="mt-4 max-w-2xl text-base leading-7 text-vite-blue-soft/80">Explore the franchise model, operating support and the path to becoming a Vite franchise partner.</p></Reveal>
        <Reveal delay={0.06}><Link href="/franchise" className={cn(buttonVariants(), "h-[52px] rounded-full bg-vite-paper px-6 text-vite-navy hover:bg-vite-blue-soft")}>Explore Franchise <ArrowRight aria-hidden="true" className="size-4" /></Link></Reveal>
      </div>
    </section>
  );
}

function FinalOrderCta() {
  return (
    <section className="bg-vite-cobalt px-5 py-16 text-vite-paper sm:px-8 lg:px-[72px] lg:py-20">
      <div className="mx-auto grid max-w-[1296px] items-end gap-8 lg:grid-cols-[1fr_auto]">
        <div><h2 className="font-display text-4xl leading-[1.03] sm:text-5xl">Ready to give your wardrobe better care?</h2><p className="mt-4 text-base text-vite-blue-soft">Start online or find the Vite location nearest to you.</p></div>
        <div className="flex flex-wrap gap-3"><Link href={orderOnlineUrl} className={cn(buttonVariants(), "h-[52px] rounded-full bg-vite-paper px-6 text-vite-navy hover:bg-vite-blue-soft")}>Order Online <ExternalLink aria-hidden="true" className="size-4" /></Link><Link href="/locations" className={cn(buttonVariants({ variant: "outline" }), "h-[52px] rounded-full border-vite-paper bg-transparent px-6 text-vite-paper hover:bg-vite-navy hover:text-vite-paper")}>Find a Location</Link></div>
      </div>
    </section>
  );
}

export function HomepageSections() {
  return <><TrustStrip /><HowItWorks /><Services /><PricingPreview /><LocationsMap /><PickupDelivery /><Reviews /><CommercialTeaser /><CareGuide /><Faq /><FranchiseTeaser /><FinalOrderCta /><SiteFooter /></>;
}
