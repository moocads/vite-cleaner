import Image from "next/image";
import { PageShell, SectionHeading } from "@/components/page-shell";

const guides = [
  { title: "Caring for coats through a Toronto winter", description: "A practical guide to salt, moisture and seasonal storage.", image: "/images/audience-seasonal.png" },
  { title: "When a garment needs dry cleaning", description: "Understand labels, fabrics and when professional assessment matters.", image: "/images/sustainable-care.png" },
  { title: "How professional finishing changes the result", description: "What pressing, shaping and final inspection contribute.", image: "/images/service-tracking.png" },
] as const;

export default function CareGuidePage() {
  return <PageShell title="Practical care for the clothes you keep." description="Guidance on fabrics, stains, seasonal storage and professional garment care." eyebrow="CARE GUIDE"><section className="bg-vite-paper px-5 py-20 sm:px-8 lg:px-[72px] lg:py-24"><div className="mx-auto max-w-[1296px]"><SectionHeading title="Toronto wardrobe care, explained clearly." /><div className="mt-12 grid gap-5 md:grid-cols-3">{guides.map((guide) => <article key={guide.title} className="overflow-hidden rounded-[24px] border border-vite-line bg-vite-surface"><div className="relative aspect-[4/3]"><Image src={guide.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" /></div><div className="p-6"><h2 className="font-display text-2xl leading-[1.15] text-vite-navy">{guide.title}</h2><p className="mt-4 text-sm leading-6 text-vite-muted">{guide.description}</p><p className="mt-6 text-xs font-medium text-vite-cobalt">Article content in preparation</p></div></article>)}</div></div></section></PageShell>;
}
