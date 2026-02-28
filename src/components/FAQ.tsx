"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createT, getArray } from "@/lib/i18n";
import type { Locale } from "@/site-config";

export default function FAQ({ locale }: { locale: Locale }) {
  const t = createT(locale);
  const items = getArray(locale, "faq.items") as { q: string; a: string }[];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-24 bg-stone-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-display text-4xl font-semibold text-stone-900 text-center">
          {t("faq.title")}
        </h2>

        <div className="mt-12 space-y-3">
          {items.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <motion.div
                key={index}
                className="bg-white rounded-2xl overflow-hidden"
                viewport={{ once: true }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="w-full text-left px-8 py-6 flex justify-between items-center"
                >
                  <span className="text-lg font-medium text-stone-900">
                    {item.q}
                  </span>
                  <motion.svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="text-stone-400 shrink-0 ml-4"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <path d="M5 7.5L10 12.5L15 7.5" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="px-8 pb-6 text-stone-600 leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
