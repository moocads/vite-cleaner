import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PageShellProps = {
  title: string;
  description: string;
  eyebrow?: string;
  image?: string;
  imageAlt?: string;
  children: ReactNode;
};

export function PageShell({ title, description, eyebrow, image, imageAlt = "", children }: PageShellProps) {
  return (
    <main className="min-h-[100dvh] overflow-x-clip bg-vite-paper pt-[76px] lg:pt-20">
      <SiteHeader />
      <section className="bg-vite-surface px-5 py-12 sm:px-8 lg:px-[72px] lg:py-16">
        <div className={cn("mx-auto max-w-[1296px]", image && "grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_560px] lg:gap-16")}>
          <div className="max-w-3xl">
            {eyebrow ? <p className="mb-5 text-xs font-medium text-vite-cobalt">{eyebrow}</p> : null}
            <h1 className="font-display text-5xl leading-[0.98] text-vite-cobalt sm:text-6xl lg:text-[68px]">{title}</h1>
            <p className="mt-6 max-w-2xl font-lead text-lg leading-8 text-vite-muted">{description}</p>
          </div>
          {image ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px]">
              <Image src={image} alt={imageAlt} fill priority sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
            </div>
          ) : null}
        </div>
      </section>
      {children}
      <SiteFooter />
    </main>
  );
}

export function SectionHeading({ title, description }: { title: string; description?: string }) {
  return (
    <div className="max-w-3xl">
      <h2 className="font-display text-4xl leading-[1.03] text-vite-ink sm:text-5xl">{title}</h2>
      {description ? <p className="mt-4 max-w-2xl text-base leading-7 text-vite-muted">{description}</p> : null}
    </div>
  );
}

export function FinalCta({
  title,
  description,
  label,
  href,
}: {
  title: string;
  description: string;
  label: string;
  href: string;
}) {
  return (
    <section className="bg-vite-cobalt px-5 py-16 text-vite-paper sm:px-8 lg:px-[72px] lg:py-20">
      <div className="mx-auto grid max-w-[1296px] items-end gap-8 lg:grid-cols-[1fr_auto]">
        <div>
          <h2 className="max-w-3xl font-display text-4xl leading-[1.03] sm:text-5xl">{title}</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-vite-blue-soft">{description}</p>
        </div>
        <Link href={href} className={cn(buttonVariants(), "h-[52px] rounded-full bg-vite-paper px-6 text-vite-navy hover:bg-vite-blue-soft")}>
          {label}
          <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.7} />
        </Link>
      </div>
    </section>
  );
}
