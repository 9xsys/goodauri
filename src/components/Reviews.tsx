"use client";
import { motion } from "framer-motion";
import { createT, getArray } from "@/lib/i18n";
import type { Locale } from "@/site-config";

const reviewKeys = ["placeholder_1", "placeholder_2", "placeholder_3"];

export default function Reviews({ locale }: { locale: Locale }) {
  const t = createT(locale);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display text-4xl font-semibold text-stone-900">
          {t("reviews.title")}
        </h2>
        <p className="text-lg text-stone-500 mt-3">
          {t("reviews.subtitle")}
        </p>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {reviewKeys.map((key, index) => (
            <motion.div
              key={key}
              className="bg-stone-50 rounded-2xl p-8"
              viewport={{ once: true }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-6xl text-sage-300 font-display leading-none select-none">
                &ldquo;
              </span>
              <p className="text-stone-700 text-lg leading-relaxed mt-2">
                {t(`reviews.${key}.text`)}
              </p>
              <p className="text-stone-500 mt-6 text-sm">
                {t(`reviews.${key}.author`)} · {t(`reviews.${key}.source`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
