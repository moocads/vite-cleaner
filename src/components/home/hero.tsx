import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { HeroImageCta } from "@/components/home/hero-image-cta";
import { PostalCodeBookingStarter } from "@/components/booking/postal-code-booking-starter";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-vite-surface">
      <div className="mx-auto grid min-h-[calc(100dvh-76px)] max-w-[1440px] items-center gap-10 px-5 py-10 sm:px-8 lg:min-h-[720px] lg:grid-cols-[560px_minmax(0,680px)] lg:gap-14 lg:px-[72px] lg:py-12">
        <div className="relative z-10 max-w-[560px]">
          <p className="mb-6 text-xs font-medium text-vite-cobalt">TORONTO GARMENT CARE</p>
          <h1 className="max-w-[540px] font-display text-[3.7rem] leading-[0.96] text-vite-cobalt sm:text-7xl lg:text-[72px] lg:leading-[80px]">
            Premium care, made effortless.
          </h1>
          <p className="mt-6 max-w-[520px] font-lead text-lg leading-[1.55] text-vite-ink lg:text-[19px]">
            Dry cleaning, alterations and convenient drop off options across three Toronto locations.
          </p>
          <PostalCodeBookingStarter />
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/locations"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-[52px] rounded-full border-vite-cobalt bg-transparent px-6 text-sm text-vite-cobalt hover:bg-vite-blue-soft hover:text-vite-navy",
              )}
            >
              Find a Location
              <MapPin aria-hidden="true" className="size-4" strokeWidth={1.7} />
            </Link>
          </div>
        </div>

        <div className="relative min-h-[460px] overflow-hidden rounded-[28px] shadow-[0_18px_50px_-28px_rgba(15,48,100,0.32)] sm:min-h-[560px] lg:min-h-[620px]">
          <Image
            src="/images/vite-store-interior.jpg"
            alt="The bright interior and reception counter of a Vite Cleaners store"
            fill
            priority
            unoptimized
            className="object-cover object-center"
          />
          <HeroImageCta />
        </div>
      </div>
    </section>
  );
}
