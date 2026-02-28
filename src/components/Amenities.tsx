"use client";
import { motion } from "framer-motion";
import { createT, getArray } from "@/lib/i18n";
import type { Locale } from "@/site-config";
import { siteConfig } from "@/site-config";

const amenityIcons: Record<string, React.ReactNode> = {
  wifi: (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-sage-600 shrink-0">
      <path d="M2 8.5C5.6 4.9 9.6 3 12 3s6.4 1.9 10 5.5" strokeLinecap="round" />
      <path d="M5.5 12C7.8 9.7 9.8 8.5 12 8.5s4.2 1.2 6.5 3.5" strokeLinecap="round" />
      <path d="M8.5 15.5C9.8 14.2 10.8 13.5 12 13.5s2.2.7 3.5 2" strokeLinecap="round" />
      <circle cx="12" cy="18" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  workspace: (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-sage-600 shrink-0">
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <line x1="8" y1="20" x2="16" y2="20" strokeLinecap="round" />
      <line x1="12" y1="16" x2="12" y2="20" />
    </svg>
  ),
  kitchen: (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-sage-600 shrink-0">
      <path d="M7 2v8a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3V2" strokeLinecap="round" />
      <line x1="10" y1="13" x2="10" y2="22" strokeLinecap="round" />
      <path d="M17 2v4a2 2 0 0 0 2 2h0V2" strokeLinecap="round" />
      <line x1="19" y1="8" x2="19" y2="22" strokeLinecap="round" />
    </svg>
  ),
  washer: (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-sage-600 shrink-0">
      <rect x="3" y="2" width="18" height="20" rx="2" />
      <circle cx="12" cy="14" r="5" />
      <circle cx="12" cy="14" r="2" />
      <circle cx="7" cy="5" r="1" fill="currentColor" stroke="none" />
      <circle cx="10" cy="5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  heating: (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-sage-600 shrink-0">
      <path d="M12 2C12 2 8 6.5 8 11a4 4 0 0 0 8 0C16 6.5 12 2 12 2Z" />
      <path d="M12 9c0 0-2 2-2 4a2 2 0 0 0 4 0c0-2-2-4-2-4Z" />
      <line x1="8" y1="19" x2="8" y2="22" strokeLinecap="round" />
      <line x1="12" y1="18" x2="12" y2="22" strokeLinecap="round" />
      <line x1="16" y1="19" x2="16" y2="22" strokeLinecap="round" />
    </svg>
  ),
  hotWater: (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-sage-600 shrink-0">
      <path d="M12 3C12 3 7 8 7 13a5 5 0 0 0 10 0C17 8 12 3 12 3Z" />
      <path d="M10 5 L10 3" strokeLinecap="round" />
      <path d="M14 5 L14 3" strokeLinecap="round" />
    </svg>
  ),
  parking: (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-sage-600 shrink-0">
      <circle cx="12" cy="12" r="10" />
      <path d="M10 16V8h3a3 3 0 0 1 0 6h-3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  mountainView: (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-sage-600 shrink-0">
      <path d="M2 20L8 8l4 7 4-11 6 16" strokeLinejoin="round" />
    </svg>
  ),
  balcony: (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-sage-600 shrink-0">
      <rect x="4" y="3" width="16" height="12" rx="1" />
      <line x1="4" y1="15" x2="4" y2="21" strokeLinecap="round" />
      <line x1="20" y1="15" x2="20" y2="21" strokeLinecap="round" />
      <line x1="4" y1="15" x2="20" y2="15" strokeLinecap="round" />
      <line x1="12" y1="15" x2="12" y2="21" strokeLinecap="round" />
    </svg>
  ),
  tv: (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-sage-600 shrink-0">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="8" y1="22" x2="16" y2="22" strokeLinecap="round" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  ),
  elevator: (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-sage-600 shrink-0">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="12" y1="6" x2="12" y2="18" />
      <path d="M8 9l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 15l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  airConditioning: (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-sage-600 shrink-0">
      <path d="M12 2v20M12 2l4 4M12 2L8 6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 8l4 2-4 2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 12l-4 2 4 2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 12h20" strokeLinecap="round" />
    </svg>
  ),
};

export default function Amenities({ locale }: { locale: Locale }) {
  const t = createT(locale);
  const amenities = [...siteConfig.amenities];

  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display text-4xl font-semibold text-stone-900">
          {t("amenities.title")}
        </h2>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {amenities.map((key, index) => (
            <motion.div
              key={key}
              className="flex items-center gap-3 bg-white rounded-xl p-4"
              viewport={{ once: true }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {amenityIcons[key] ?? (
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-sage-600 shrink-0">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12h8" strokeLinecap="round" />
                </svg>
              )}
              <span className="text-stone-700 text-sm font-medium">
                {t(`amenities.${key}`)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
