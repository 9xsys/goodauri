"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { createT } from "@/lib/i18n";
import type { Locale } from "@/site-config";

interface HeroParallaxProps {
  locale: Locale;
}

export default function HeroParallax({ locale }: HeroParallaxProps) {
  const t = createT(locale);
  const [offsetY, setOffsetY] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      rafRef.current = requestAnimationFrame(() => {
        // Cap the parallax offset so the image doesn't shift too far
        const scrollY = Math.min(window.scrollY, window.innerHeight);
        setOffsetY(scrollY * 0.3);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      aria-label="Hero section with mountain panorama"
      className="relative min-h-screen overflow-hidden"
    >
      {/* Parallax background image */}
      <div
        className="absolute inset-0 h-[120%] w-full"
        style={{
          top: "-10%",
          transform: `translateY(${offsetY}px)`,
          willChange: "transform",
        }}
      >
        <Image
          src="/photos/hero-mountains.jpg"
          alt="Gudauri mountains panoramic view"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
      >
        <h1 className="max-w-3xl font-display text-5xl font-bold leading-tight text-white md:text-7xl">
          {t("hero.headline")}
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-white/80 md:text-xl">
          {t("hero.subheadline")}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {/* Primary CTA */}
          <a
            href="https://www.booking.com/hotel/ge/goodauri-cosy-appartment.html"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-white px-8 py-4 font-semibold text-stone-900 transition hover:bg-stone-100"
          >
            {t("hero.cta_primary")}
          </a>

          {/* Secondary CTA */}
          <a
            href="#apartment"
            className="rounded-2xl border-2 border-white/60 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
          >
            {t("hero.cta_secondary")}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
