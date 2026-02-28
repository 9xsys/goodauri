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
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://www.booking.com/hotel/ge/goodauri-cosy-appartment.html"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-sage-600 px-10 py-5 text-lg font-semibold text-white transition hover:bg-sage-700"
            >
              {t("booking.cta")}
            </a>
            <a
              href="https://wa.me/995599002879"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-sage-600 px-10 py-5 text-lg font-semibold text-white transition hover:bg-sage-700"
            >
              WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
