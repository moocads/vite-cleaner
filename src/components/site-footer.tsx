import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { locations, orderOnlineUrl, services } from "@/lib/site-data";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Care Guidance", href: "/care-guide" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-vite-navy px-5 pb-9 pt-16 text-vite-paper sm:px-8 lg:px-[72px] lg:pt-20">
      <div className="mx-auto max-w-[1296px]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,330px)_1fr] lg:gap-20">
          <div>
            <Image
              src="/brand/vite-reversed.png"
              alt="Vite Cleaners"
              width={170}
              height={58}
              className="h-auto w-[150px] object-contain"
            />
            <p className="mt-6 max-w-xs text-sm leading-6 text-vite-blue-soft/75">
              Professional garment care with convenient drop off and pickup options across Toronto and the GTA.
            </p>
            <Link
              href={orderOnlineUrl}
              className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-vite-paper transition-colors hover:text-vite-blue-soft"
            >
              Order Online
              <ExternalLink aria-hidden="true" className="size-4" strokeWidth={1.7} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
            <div>
              <h2 className="text-sm font-medium">Services</h2>
              <ul className="mt-4 grid gap-3">
                {services.slice(0, 5).map((service) => (
                  <li key={service.slug}>
                    <Link href={`/services/${service.slug}`} className="text-sm text-vite-blue-soft/70 hover:text-vite-paper">
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-medium">Visit</h2>
              <ul className="mt-4 grid gap-3">
                {locations.filter((location) => location.kind === "Store").map((location) => (
                  <li key={location.slug}>
                    <Link href="/locations" className="text-sm text-vite-blue-soft/70 hover:text-vite-paper">
                      {location.name}
                    </Link>
                  </li>
                ))}
                <li><Link href="/pickup-delivery" className="text-sm text-vite-blue-soft/70 hover:text-vite-paper">Drop Off & Pickup</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-medium">Business</h2>
              <ul className="mt-4 grid gap-3">
                <li><Link href="/commercial" className="text-sm text-vite-blue-soft/70 hover:text-vite-paper">Commercial Laundry</Link></li>
                <li><Link href="/franchise" className="text-sm text-vite-blue-soft/70 hover:text-vite-paper">Franchise</Link></li>
                <li><Link href="/how-it-works" className="text-sm text-vite-blue-soft/70 hover:text-vite-paper">How It Works</Link></li>
                <li><Link href="/pricing" className="text-sm text-vite-blue-soft/70 hover:text-vite-paper">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-medium">Company</h2>
              <ul className="mt-4 grid gap-3">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-vite-blue-soft/70 hover:text-vite-paper">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-vite-paper/15 pt-7 text-xs text-vite-blue-soft/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Vite Cleaners. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-vite-paper">Privacy</Link>
            <Link href="/terms" className="hover:text-vite-paper">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
