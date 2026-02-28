"use client";
import { motion } from "framer-motion";
import { createT } from "@/lib/i18n";
import type { Locale } from "@/site-config";

export default function BookingCTA({ locale }: { locale: Locale }) {
  const t = createT(locale);

  return (
    <section id="availability" className="py-24 bg-stone-50">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-4xl font-semibold text-stone-900">
            {t("booking.title")}
          </h2>
          <p className="text-lg text-stone-500 mt-3">
            {t("booking.subtitle")}
          </p>
          <a
            href="https://www.booking.com/hotel/ge/goodauri-cosy-appartment.html"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block rounded-2xl bg-blue-600 px-10 py-5 text-lg font-semibold text-white transition hover:bg-blue-700"
          >
            {t("booking.cta")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
