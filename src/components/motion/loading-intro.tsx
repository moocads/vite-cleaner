"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type IntroPhase = "holding" | "liquid" | "fading" | "complete";

export function LoadingIntro() {
  const [phase, setPhase] = useState<IntroPhase>("holding");
  const reduceMotion = useReducedMotion() === true;

  useEffect(() => {
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const liquidDelay = reduceMotion ? 0 : 3000;
    const fadeDelay = reduceMotion ? 180 : 4450;
    const completeDelay = reduceMotion ? 520 : 4860;

    root.style.overflow = "hidden";

    const liquidTimer = window.setTimeout(() => {
      setPhase(reduceMotion ? "holding" : "liquid");
    }, liquidDelay);

    const fadeTimer = window.setTimeout(() => {
      setPhase("fading");
    }, fadeDelay);

    const completeTimer = window.setTimeout(() => {
      setPhase("complete");
      root.style.overflow = previousOverflow;
    }, completeDelay);

    return () => {
      window.clearTimeout(liquidTimer);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(completeTimer);
      root.style.overflow = previousOverflow;
    };
  }, [reduceMotion]);

  if (phase === "complete") {
    return null;
  }

  const isLiquid = phase === "liquid";
  const isFading = phase === "fading";

  return (
    <motion.div
      role="status"
      aria-label="Vite Cleaners is loading"
      className="pointer-events-none fixed inset-y-0 left-0 -right-6 z-[100] isolate overflow-hidden bg-vite-cobalt"
      animate={{ opacity: isFading ? 0 : 1 }}
      transition={{ duration: reduceMotion ? 0.28 : 0.38, ease: [0.4, 0, 1, 1] }}
    >
      {isLiquid && !reduceMotion ? (
        <video
          aria-hidden="true"
          autoPlay
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          onEnded={() => setPhase("fading")}
        >
          <source src="/media/vite-liquid-intro.mp4" type="video/mp4" />
        </video>
      ) : null}

      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,48,100,0.12)_72%,rgba(15,48,100,0.3)_100%)]"
        animate={{ opacity: isLiquid ? 0.3 : 1 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={
          reduceMotion
            ? { opacity: isFading ? 0 : 1 }
            : isLiquid || isFading
              ? { opacity: 0, scale: 0.86 }
              : { opacity: [0.72, 1, 0.72], scale: [0.96, 1, 0.96] }
        }
        transition={
          isLiquid || isFading
            ? { duration: 0.28, ease: [0.4, 0, 1, 1] }
            : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <Image
          src="/brand/vertical-logo.svg"
          alt=""
          width={262}
          height={253}
          priority
          className="h-auto w-[124px] brightness-0 invert sm:w-[156px]"
        />
      </motion.div>
    </motion.div>
  );
}
