"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { orderOnlineUrl } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Locations", href: "/locations" },
  { label: "Pickup & Delivery", href: "/pickup-delivery" },
  { label: "Commercial", href: "/commercial" },
  { label: "Franchise", href: "/franchise" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-vite-line/70 bg-vite-paper/95 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:h-20 lg:px-[48px] xl:px-[72px]">
        <Link href="/" aria-label="Vite Cleaners home" className="shrink-0" onClick={() => setOpen(false)}>
          <Image src="/brand/horizontal-logo.svg" alt="Vite Cleaners" width={418} height={120} priority className="h-auto w-[118px] object-contain xl:w-[145px]" />
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-5 lg:flex xl:gap-7">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "whitespace-nowrap text-[13px] font-medium transition-colors hover:text-vite-cobalt focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vite-cobalt xl:text-sm",
                isActive(item.href) ? "text-vite-cobalt" : "text-vite-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href={orderOnlineUrl} className={cn(buttonVariants(), "hidden h-11 rounded-full bg-vite-cobalt px-5 text-sm text-vite-paper shadow-none hover:bg-vite-navy sm:inline-flex lg:h-12 lg:px-5")}>
            Order Online
            <ExternalLink aria-hidden="true" className="size-4" strokeWidth={1.7} />
          </Link>
          <button type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="flex size-11 items-center justify-center rounded-full border border-vite-line text-vite-navy transition-colors hover:bg-vite-blue-soft lg:hidden">
            {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav aria-label="Mobile navigation" className="border-t border-vite-line bg-vite-paper px-5 py-5 lg:hidden">
          <div className="mx-auto grid max-w-[1440px] gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-[14px] px-4 py-3 text-base font-medium transition-colors hover:bg-vite-blue-soft hover:text-vite-cobalt",
                  isActive(item.href) ? "bg-vite-blue-soft text-vite-cobalt" : "text-vite-ink",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link href={orderOnlineUrl} onClick={() => setOpen(false)} className="mt-3 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-vite-cobalt px-5 text-sm font-medium text-vite-paper sm:hidden">
              Order Online
              <ExternalLink aria-hidden="true" className="size-4" strokeWidth={1.7} />
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
