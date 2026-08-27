"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function HeroImageCta() {
  const [isActive, setIsActive] = useState(false);

  return (
    <Link
      href="/services"
      aria-label="Explore services"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      className={cn(
        "group absolute bottom-5 right-5 isolate flex h-[116px] items-center justify-end overflow-hidden rounded-full text-vite-paper outline-none ring-offset-4 ring-offset-vite-surface transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:ring-2 focus-visible:ring-vite-cobalt sm:bottom-8 sm:right-8 sm:h-[132px]",
        isActive ? "w-[228px] sm:w-[244px]" : "w-[116px] sm:w-[132px]",
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-vite-cobalt/90 mix-blend-multiply"
      />
      <span className="relative flex w-full items-center justify-end gap-4 px-8 sm:px-9">
        <span
          className={cn(
            "whitespace-nowrap text-sm font-medium transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:text-[15px]",
            isActive ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0",
          )}
        >
          Explore services
        </span>
        <ArrowDownRight
          aria-hidden="true"
          className="size-7 shrink-0 sm:size-8"
          strokeWidth={1.5}
        />
      </span>
    </Link>
  );
}
