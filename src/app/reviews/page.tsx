import { PageShell, SectionHeading } from "@/components/page-shell";

export default function ReviewsPage() {
  return (
    <PageShell title="Customer feedback, clearly sourced." description="This page is prepared for verified Google reviews from Vite customers and store locations." eyebrow="REVIEWS">
      <section className="bg-vite-paper px-5 py-20 sm:px-8 lg:px-[72px] lg:py-24"><div className="mx-auto max-w-[1296px]"><SectionHeading title="Verified reviews will appear here before launch." description="Each published review should include the customer display name, rating, store or service context and Google source." /><div className="mt-12 grid gap-5 md:grid-cols-3">{["Customer quote", "Store or service", "Google review source"].map((item) => <div key={item} className="min-h-52 rounded-[24px] border border-vite-line bg-vite-surface p-7"><p className="font-display text-2xl text-vite-navy">{item}</p><p className="mt-4 text-sm leading-6 text-vite-muted">Awaiting verified client content.</p></div>)}</div></div></section>
    </PageShell>
  );
}
