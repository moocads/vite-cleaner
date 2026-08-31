import { PageShell } from "@/components/page-shell";

const faqs = [
  ["How do I choose a service?", "Bring the garment to a Vite store for assessment or begin with the service descriptions online."],
  ["Where are Vite stores located?", "Vite has stores on Sherbourne Street, Toronto Street and Bay Street."],
  ["How do drop off and pickup work?", "Book a drop off appointment, leave your garments at a Vite Store or BlueBox, and pick them up from a Vite Store or BlueBox after professional care."],
  ["Are specialty items accepted?", "Shoes, leather, suede, wedding dresses and heavily soiled items require review before service confirmation."],
  ["How is pricing confirmed?", "Pricing depends on the item, fabric, condition and requested finish. Some services require an assessment."],
  ["Does Vite serve businesses?", "Yes. Commercial Laundry offers recurring pickup, flexible volume and custom handling across the GTA."],
] as const;

export default function FaqPage() {
  return <PageShell title="Helpful answers before you begin." description="Find information about services, locations, drop off, pickup and garment assessment." eyebrow="FAQ"><section className="bg-vite-paper px-5 py-20 sm:px-8 lg:px-[72px] lg:py-24"><div className="mx-auto grid max-w-3xl gap-3">{faqs.map(([question, answer]) => <details key={question} className="rounded-[18px] border border-vite-line bg-vite-surface p-5 open:bg-vite-blue-soft"><summary className="cursor-pointer list-none font-display text-xl text-vite-navy">{question}</summary><p className="mt-4 text-sm leading-6 text-vite-muted">{answer}</p></details>)}</div></section></PageShell>;
}
