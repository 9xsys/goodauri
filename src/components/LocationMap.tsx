"use client";

import { motion } from "framer-motion";
import { createT } from "@/lib/i18n";
import type { Locale } from "@/site-config";
import { siteConfig } from "@/site-config";

export default function LocationMap({ locale }: { locale: Locale }) {
  const t = createT(locale);

  const infoCards = [
    {
      key: "from_tbilisi",
      title: t("location.from_tbilisi"),
      detail: t("location.from_tbilisi_detail"),
      icon: (
        <svg
          width={32}
          height={32}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-sage-600"
        >
          <path d="M5 17h2a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2H5v5Z" />
          <path d="M14 17h2a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2h-2v5Z" />
          <path d="M5 17a7 7 0 0 1-2-5 9 9 0 0 1 18 0 7 7 0 0 1-2 5" />
          <path d="M12 3v2" />
        </svg>
      ),
    },
    {
      key: "from_airport",
      title: t("location.from_airport"),
      detail: t("location.from_airport_detail"),
      icon: (
        <svg
          width={32}
          height={32}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-sage-600"
        >
          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2Z" />
        </svg>
      ),
    },
    {
      key: "altitude",
      title: t("location.altitude"),
      detail: t("location.altitude_detail"),
      icon: (
        <svg
          width={32}
          height={32}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-sage-600"
        >
          <path d="m8 3 4 8 5-5 5 15H2L8 3Z" />
        </svg>
      ),
    },
    {
      key: "groceries",
      title: t("location.groceries"),
      detail: t("location.groceries_detail"),
      icon: (
        <svg
          width={32}
          height={32}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-sage-600"
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      ),
    },
  ];

  return (
    <section id="location" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display text-4xl font-semibold text-stone-900">
          {t("location.title")}
        </h2>
        <p className="text-lg text-stone-500 mt-3 max-w-3xl">
          {t("location.subtitle")}
        </p>

        <div className="mt-12 grid md:grid-cols-2 gap-12">
          {/* Left side — info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {infoCards.map((card, i) => (
              <motion.div
                key={card.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-stone-50 rounded-2xl p-6"
              >
                {card.icon}
                <h3 className="text-lg font-semibold text-stone-900 mt-3">
                  {card.title}
                </h3>
                <p className="text-stone-500 text-sm mt-2 leading-relaxed">
                  {card.detail}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right side — map */}
          <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
            <iframe
              src={siteConfig.mapEmbedUrl}
              className="w-full h-full"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              title="Map of Gudauri location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
