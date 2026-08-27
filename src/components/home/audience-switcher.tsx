"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BriefcaseBusiness,
  Building2,
  Heart,
  Snowflake,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type AudienceKey = "families" | "professionals" | "businesses" | "seasonal";

type Audience = {
  key: AudienceKey;
  label: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: LucideIcon;
};

const audiences = [
  {
    key: "families",
    label: "Families",
    description:
      "Care for school uniforms, occasionwear and the clothes your family reaches for every day.",
    image: "/images/audience-families.png",
    imageAlt: "A Toronto family relaxing while their clothing is cared for",
    icon: Heart,
  },
  {
    key: "professionals",
    label: "Professionals",
    description: "Keep suits, workwear and coats ready for the week ahead.",
    image: "/images/audience-professionals.png",
    imageAlt: "A Toronto professional preparing a suit for garment care",
    icon: BriefcaseBusiness,
  },
  {
    key: "businesses",
    label: "Local businesses",
    description:
      "Reliable garment and linen care for Toronto teams and hospitality partners.",
    image: "/images/audience-businesses.png",
    imageAlt: "A Vite team member serving a local Toronto business",
    icon: Building2,
  },
  {
    key: "seasonal",
    label: "Seasonal care",
    description: "Clean, protect and store winter garments between seasons.",
    image: "/images/audience-seasonal.png",
    imageAlt: "Toronto residents preparing winter coats for seasonal care",
    icon: Snowflake,
  },
] as const satisfies readonly [Audience, ...Audience[]];

export function AudienceSwitcher() {
  const [activeKey, setActiveKey] = useState<AudienceKey>("families");
  const reduceMotion = useReducedMotion();
  const activeAudience =
    audiences.find((audience) => audience.key === activeKey) ?? audiences[0];

  return (
    <section className="bg-vite-surface px-5 py-20 sm:px-8 lg:px-[72px] lg:py-24">
      <div className="mx-auto max-w-[1296px]">
        <h2 className="max-w-4xl font-display text-4xl leading-[1.02] text-vite-ink sm:text-5xl">
          More time for what matters in Toronto.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-vite-muted sm:text-lg">
          Choose a lifestyle to see how Vite fits into a Toronto week.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-[520px_minmax(0,1fr)] lg:gap-8">
          <div role="tablist" aria-label="Vite customer types" className="grid gap-3">
            {audiences.map((audience) => {
              const Icon = audience.icon;
              const isActive = audience.key === activeKey;

              return (
                <button
                  key={audience.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="audience-panel"
                  onClick={() => setActiveKey(audience.key)}
                  className={cn(
                    "grid min-h-[104px] grid-cols-[48px_1fr] items-center gap-5 rounded-[20px] border p-5 text-left transition-[background-color,border-color,transform] duration-300 active:translate-y-px sm:min-h-[124px]",
                    isActive
                      ? "border-vite-blue-mid bg-vite-blue-soft"
                      : "border-vite-line bg-vite-paper hover:border-vite-blue-mid hover:bg-white",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-12 items-center justify-center rounded-[14px] text-vite-cobalt",
                      isActive ? "bg-vite-paper" : "bg-[#e4ebf3]",
                    )}
                  >
                    <Icon aria-hidden="true" className="size-6" strokeWidth={1.7} />
                  </span>
                  <span>
                    {isActive ? (
                      <span className="mb-1 block text-[11px] font-medium text-vite-navy">
                        PERFECT FOR
                      </span>
                    ) : null}
                    <span className="block font-display text-xl leading-tight text-vite-ink">
                      {audience.label}
                    </span>
                    {isActive ? (
                      <span className="mt-2 block max-w-sm text-sm leading-5 text-vite-muted">
                        {audience.description}
                      </span>
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id="audience-panel"
            role="tabpanel"
            className="relative min-h-[420px] overflow-hidden rounded-[28px] bg-vite-blue-soft lg:min-h-[560px]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeAudience.key}
                initial={reduceMotion ? false : { opacity: 0, scale: 1.015 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={
                  reduceMotion
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.99 }
                }
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={activeAudience.image}
                  alt={activeAudience.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 744px, 100vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
