"use client";
import { motion } from "framer-motion";
import { createT, getArray } from "@/lib/i18n";
import type { Locale } from "@/site-config";

const icons = [
  // 0 — mountain
  <svg key="mountain" width={40} height={40} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-sage-600">
    <path d="M4 34 L16 10 L22 22 L26 16 L36 34 Z" />
    <path d="M16 10 L20 18" />
  </svg>,
  // 2 — hiking boot / path
  <svg key="hike" width={40} height={40} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-sage-600">
    <path d="M8 34 C12 28 16 26 20 20 C24 14 28 10 32 6" strokeLinecap="round" />
    <circle cx="10" cy="32" r="2" />
    <circle cx="20" cy="20" r="2" />
    <circle cx="30" cy="8" r="2" />
  </svg>,
  // 3 — thermometer / sun
  <svg key="sun" width={40} height={40} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-sage-600">
    <circle cx="20" cy="20" r="6" />
    <line x1="20" y1="4" x2="20" y2="10" strokeLinecap="round" />
    <line x1="20" y1="30" x2="20" y2="36" strokeLinecap="round" />
    <line x1="4" y1="20" x2="10" y2="20" strokeLinecap="round" />
    <line x1="30" y1="20" x2="36" y2="20" strokeLinecap="round" />
    <line x1="8.6" y1="8.6" x2="12.8" y2="12.8" strokeLinecap="round" />
    <line x1="27.2" y1="27.2" x2="31.4" y2="31.4" strokeLinecap="round" />
    <line x1="8.6" y1="31.4" x2="12.8" y2="27.2" strokeLinecap="round" />
    <line x1="27.2" y1="12.8" x2="31.4" y2="8.6" strokeLinecap="round" />
  </svg>,
  // 4 — road / car
  <svg key="car" width={40} height={40} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-sage-600">
    <path d="M8 28 L12 18 L28 18 L32 28" />
    <rect x="6" y="28" width="28" height="6" rx="2" />
    <circle cx="12" cy="34" r="2" />
    <circle cx="28" cy="34" r="2" />
    <line x1="20" y1="8" x2="20" y2="18" strokeLinecap="round" strokeDasharray="3 3" />
  </svg>,
];

export default function WhyThisPlace({ locale }: { locale: Locale }) {
  const t = createT(locale);
  const blocks = getArray(locale, "why.blocks") as { title: string; description: string }[];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display text-4xl font-semibold text-stone-900">
          {t("why.title")}
        </h2>
        <p className="text-lg text-stone-500 mt-3">
          {t("why.subtitle")}
        </p>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blocks.map((block, index) => (
            <motion.div
              key={index}
              className="bg-stone-50 rounded-2xl p-8"
              viewport={{ once: true }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {icons[index % icons.length]}
              <h3 className="text-xl font-semibold text-stone-900 mt-5">
                {block.title}
              </h3>
              <p className="text-stone-500 mt-3 leading-relaxed">
                {block.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
