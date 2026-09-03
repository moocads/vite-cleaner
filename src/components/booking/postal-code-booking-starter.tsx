"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ArrowRight, MapPin, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function normalizePostalCode(value: string) {
  const cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
  return cleaned.length > 3 ? `${cleaned.slice(0, 3)} ${cleaned.slice(3)}` : cleaned;
}

export function PostalCodeBookingStarter() {
  const router = useRouter();
  const [postalCode, setPostalCode] = useState("");
  const [error, setError] = useState("");
  const [showNotice, setShowNotice] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = normalizePostalCode(postalCode);

    if (!/^[A-Z]\d[A-Z] \d[A-Z]\d$/.test(normalized)) {
      setError("Enter a valid Canadian postal code.");
      return;
    }

    setError("");
    if (!normalized.startsWith("M")) {
      setShowNotice(true);
      return;
    }

    router.push(`/book?postal=${encodeURIComponent(normalized)}`);
  }

  return (
    <>
      <form onSubmit={submit} className="mt-8 max-w-[520px] rounded-[22px] border border-vite-line bg-vite-paper p-3 shadow-[0_14px_40px_-28px_rgba(15,48,100,0.45)]">
        <label htmlFor="hero-postal-code" className="sr-only">Postal code</label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="flex min-h-12 flex-1 items-center gap-3 rounded-[14px] bg-vite-surface px-4">
            <MapPin aria-hidden="true" className="size-5 shrink-0 text-vite-cobalt" strokeWidth={1.7} />
            <input
              id="hero-postal-code"
              value={postalCode}
              onChange={(event) => setPostalCode(normalizePostalCode(event.target.value))}
              placeholder="Enter postal code"
              autoComplete="postal-code"
              className="min-w-0 flex-1 bg-transparent py-3 text-sm uppercase text-vite-ink outline-none placeholder:normal-case placeholder:text-vite-muted"
            />
          </div>
          <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[14px] bg-vite-cobalt px-5 text-sm font-medium text-vite-paper transition-colors hover:bg-vite-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vite-cobalt">
            See times & prices
            <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.7} />
          </button>
        </div>
        {error ? <p className="px-2 pt-2 text-xs text-destructive" role="alert">{error}</p> : null}
        <p className="px-2 pt-2 text-xs leading-5 text-vite-muted">Check pickup availability or book a store drop-off.</p>
      </form>

      {showNotice ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-vite-navy/55 px-5 py-8 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="service-area-title">
          <div className="relative w-full max-w-lg rounded-[28px] bg-vite-paper p-7 shadow-2xl sm:p-9">
            <button type="button" aria-label="Close notice" onClick={() => setShowNotice(false)} className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-full border border-vite-line text-vite-navy hover:bg-vite-blue-soft">
              <X aria-hidden="true" className="size-5" />
            </button>
            <p className="text-xs font-medium text-vite-cobalt">SERVICE AREA NOTICE</p>
            <h2 id="service-area-title" className="mt-4 pr-10 font-display text-3xl leading-tight text-vite-navy">Pickup is not available in this area yet.</h2>
            <p className="mt-4 text-sm leading-6 text-vite-muted">You can still book a drop-off appointment at a nearby Vite location, or try another postal code.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => router.push(`/book?postal=${encodeURIComponent(postalCode)}&method=dropoff`)} className={cn(buttonVariants(), "h-12 rounded-full bg-vite-cobalt px-5 text-vite-paper hover:bg-vite-navy")}>Choose drop off</button>
              <button type="button" onClick={() => setShowNotice(false)} className={cn(buttonVariants({ variant: "outline" }), "h-12 rounded-full border-vite-cobalt bg-transparent px-5 text-vite-cobalt hover:bg-vite-blue-soft")}>Try another postal code</button>
              <Link href="/locations" className="inline-flex h-12 items-center justify-center text-sm font-medium text-vite-cobalt hover:text-vite-navy">View locations</Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
