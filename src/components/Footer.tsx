"use client";

import { createT } from "@/lib/i18n";
import type { Locale } from "@/site-config";
import { siteConfig } from "@/site-config";

export default function Footer({
  locale,
  onLocaleChange,
}: {
  locale: Locale;
  onLocaleChange: (l: Locale) => void;
}) {
  const t = createT(locale);
  const year = new Date().getFullYear();

  const whatsappValid =
    siteConfig.whatsapp &&
    siteConfig.whatsapp.trim() !== "" &&
    !siteConfig.whatsapp.includes("XXXX");

  const telegramValid =
    siteConfig.telegram &&
    siteConfig.telegram.trim() !== "" &&
    !siteConfig.telegram.includes("your_telegram");

  const localeLabels: Record<string, string> = {
    en: "EN",
    fr: "FR",
    ka: "KA",
  };

  return (
    <footer className="bg-stone-900 text-stone-400">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top row */}
        <div className="flex justify-between items-start flex-wrap gap-8">
          {/* Left — branding & contact */}
          <div>
            <p className="text-white text-lg font-semibold">
              {siteConfig.propertyName}
            </p>
            <p className="text-stone-400 text-sm mt-1">
              {siteConfig.shortTagline}
            </p>

            <div className="mt-4 flex flex-col gap-1">
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm hover:text-white transition"
              >
                {siteConfig.email}
              </a>
              {whatsappValid && (
                <a
                  href={`https://wa.me/${siteConfig.whatsapp.replace(/\+/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-white transition"
                >
                  WhatsApp: {siteConfig.whatsapp}
                </a>
              )}
              {telegramValid && (
                <a
                  href={`https://t.me/${siteConfig.telegram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-white transition"
                >
                  Telegram: @{siteConfig.telegram}
                </a>
              )}
            </div>
          </div>

          {/* Right — language switcher */}
          <div className="flex gap-1">
            {siteConfig.locales.map((loc) => (
              <button
                key={loc}
                onClick={() => onLocaleChange(loc)}
                className={`rounded-lg px-3 py-1.5 text-sm transition ${
                  locale === loc
                    ? "bg-stone-700 text-white"
                    : "text-stone-500 hover:text-white"
                }`}
              >
                {localeLabels[loc] ?? loc.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-stone-800 mt-12 pt-8">
          {/* Bottom row */}
          <div className="flex justify-between items-center flex-wrap gap-4">
            <p className="text-sm">
              &copy; {year} {siteConfig.propertyName}. {t("footer.rights")}
            </p>
            <p className="text-sm text-stone-500">{t("footer.built_with")}</p>
            <div className="flex gap-4">
              <a href="#" className="text-sm hover:text-white transition">
                {t("footer.legal")}
              </a>
              <a href="#" className="text-sm hover:text-white transition">
                {t("footer.privacy")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
