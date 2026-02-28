"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site-config";
import type { Locale } from "@/site-config";

interface NavbarProps {
  locale: Locale;
  onLocaleChange: (l: Locale) => void;
}

const navLinks = [
  { key: "nav.apartment", href: "#apartment" },
  { key: "nav.availability", href: "#availability" },
  { key: "nav.location", href: "#location" },
  { key: "nav.faq", href: "#faq" },
] as const;

const localeLabels: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  ka: "KA",
};

export default function Navbar({ locale, onLocaleChange }: NavbarProps) {
  const t = createT(locale);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 32);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-16 transition-all duration-300",
        scrolled
          ? "bg-stone-50/95 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        {/* Left: Property name */}
        <a
          href="#"
          className={cn(
            "text-sm font-medium tracking-wide transition-colors",
            scrolled ? "text-stone-800" : "text-white"
          )}
        >
          {siteConfig.propertyName}
        </a>

        {/* Center: Desktop nav links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.key}>
              <a
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:opacity-80",
                  scrolled ? "text-stone-700" : "text-white/90"
                )}
              >
                {t(link.key)}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: Language switcher (desktop) + Hamburger (mobile) */}
        <div className="flex items-center gap-3">
          {/* Desktop language switcher */}
          <div className="hidden items-center gap-1 md:flex">
            {siteConfig.locales.map((loc) => (
              <button
                key={loc}
                onClick={() => onLocaleChange(loc)}
                className={cn(
                  "rounded-lg px-2.5 py-1 text-xs font-semibold transition-all",
                  locale === loc
                    ? scrolled
                      ? "bg-stone-800 text-white"
                      : "bg-white text-stone-900"
                    : scrolled
                      ? "text-stone-500 hover:text-stone-800"
                      : "text-white/70 hover:text-white"
                )}
              >
                {localeLabels[loc]}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className={cn(
              "relative flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:hidden",
              scrolled ? "text-stone-800" : "text-white"
            )}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <div className="flex w-5 flex-col items-center gap-[5px]">
              <span
                className={cn(
                  "block h-[2px] w-5 rounded-full transition-all duration-300",
                  scrolled ? "bg-stone-800" : "bg-white",
                  mobileOpen && "translate-y-[7px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "block h-[2px] w-5 rounded-full transition-all duration-300",
                  scrolled ? "bg-stone-800" : "bg-white",
                  mobileOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "block h-[2px] w-5 rounded-full transition-all duration-300",
                  scrolled ? "bg-stone-800" : "bg-white",
                  mobileOpen && "-translate-y-[7px] -rotate-45"
                )}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-stone-200/60 bg-stone-50/95 shadow-lg backdrop-blur-md md:hidden"
          >
            <div className="mx-auto max-w-7xl px-6 py-5">
              {/* Nav links */}
              <ul className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <li key={link.key}>
                    <a
                      href={link.href}
                      onClick={closeMobile}
                      className="block rounded-lg px-3 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-100"
                    >
                      {t(link.key)}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Language switcher */}
              <div className="mt-4 flex items-center gap-2 border-t border-stone-200 pt-4">
                {siteConfig.locales.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      onLocaleChange(loc);
                      closeMobile();
                    }}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-xs font-semibold transition-all",
                      locale === loc
                        ? "bg-stone-800 text-white"
                        : "text-stone-500 hover:text-stone-800"
                    )}
                  >
                    {localeLabels[loc]}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
