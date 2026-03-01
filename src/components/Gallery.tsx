"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { createT } from "@/lib/i18n";
import type { Locale } from "@/site-config";

const galleryPhotos = [
  { src: "/photos/gallery-16.jpg", alt: "Bedroom with bed, balcony and mountain view" },
  { src: "/photos/gallery-20.jpg", alt: "Gudauri village at sunset with mountains" },
  { src: "/photos/gallery-17.jpg", alt: "Bathroom with teal herringbone tiles and brass fixtures" },
  { src: "/photos/gallery-9.jpg", alt: "Living room with armchairs and track lighting" },
  { src: "/photos/gallery-21.jpg", alt: "Coffee on the balcony with mountain panorama" },
  { src: "/photos/gallery-1.jpg", alt: "Apartment interior overview" },
  { src: "/photos/gallery-18.jpg", alt: "Shower with geometric patterned tiles" },
  { src: "/photos/gallery-14.jpg", alt: "Bedroom with natural light and balcony access" },
  { src: "/photos/gallery-11.jpg", alt: "Kitchen shelves with mugs and plants" },
  { src: "/photos/gallery-2.jpg", alt: "Apartment living space" },
  { src: "/photos/gallery-24.jpg", alt: "Breakfast on the balcony with village view" },
  { src: "/photos/gallery-15.jpg", alt: "Bedroom with floor lamp and armchairs" },
  { src: "/photos/gallery-19.jpg", alt: "Bathroom with sink, mirror and washing machine" },
  { src: "/photos/gallery-13.jpg", alt: "Dining area with plants and TV" },
  { src: "/photos/gallery-3.jpg", alt: "Apartment detail" },
  { src: "/photos/gallery-22.jpg", alt: "Wall-mounted Smart TV and heating" },
  { src: "/photos/gallery-10.jpg", alt: "Living room with mirror and reading lamp" },
  { src: "/photos/gallery-5.jpg", alt: "Balcony view" },
  { src: "/photos/gallery-4.jpg", alt: "Interior detail" },
  { src: "/photos/gallery-23.jpg", alt: "Plants and dining area overview" },
  { src: "/photos/gallery-6.jpg", alt: "Apartment detail" },
  { src: "/photos/gallery-7.jpg", alt: "Apartment detail" },
  { src: "/photos/gallery-8.jpg", alt: "Apartment detail" },
  { src: "/photos/gallery-12.jpg", alt: "Apartment detail" },
];

const COLS = 8;
const rowData = [
  { photos: galleryPhotos.slice(0, COLS), direction: "left" as const },
  { photos: galleryPhotos.slice(COLS, COLS * 2), direction: "right" as const },
  { photos: galleryPhotos.slice(COLS * 2, COLS * 3), direction: "left" as const },
];

function MarqueeRow({
  photos,
  direction,
  speed = 30,
  onPhotoClick,
  globalOffset,
}: {
  photos: typeof galleryPhotos;
  direction: "left" | "right";
  speed?: number;
  onPhotoClick: (index: number) => void;
  globalOffset: number;
}) {
  const duplicated = [...photos, ...photos];
  const animationName = direction === "left" ? "marquee-left" : "marquee-right";

  return (
    <div className="overflow-hidden">
      <div
        className="flex gap-3 hover:[animation-play-state:paused]"
        style={{
          animation: `${animationName} ${speed}s linear infinite`,
          width: "max-content",
        }}
      >
        {duplicated.map((photo, i) => {
          const realIndex = globalOffset + (i % photos.length);
          return (
            <div
              key={`${photo.src}-${i}`}
              className="group cursor-pointer overflow-hidden rounded-xl flex-shrink-0"
              style={{ width: "200px", height: "200px" }}
              onClick={() => onPhotoClick(realIndex)}
            >
              <div className="relative h-full w-full">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={200}
                  height={200}
                  sizes="200px"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface GalleryProps {
  locale: Locale;
}

export default function Gallery({ locale }: GalleryProps) {
  const t = createT(locale);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const isLightboxOpen = lightboxIndex !== null;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goToPrevious = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + galleryPhotos.length) % galleryPhotos.length : null
    );
  }, []);

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % galleryPhotos.length : null
    );
  }, []);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, closeLightbox, goToPrevious, goToNext]);

  useEffect(() => {
    if (isLightboxOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isLightboxOpen]);

  return (
    <section id="apartment" className="py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 mb-12">
        <h2 className="font-display text-4xl font-semibold text-stone-900">
          {t("gallery.title")}
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-stone-500">
          {t("gallery.subtitle")}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {rowData.map((row, rowIndex) => (
          <MarqueeRow
            key={rowIndex}
            photos={row.photos}
            direction={row.direction}
            speed={35}
            onPhotoClick={openLightbox}
            globalOffset={rowIndex * COLS}
          />
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lightbox-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            role="dialog"
            aria-modal="true"
            onClick={closeLightbox}
          >
            <button
              ref={closeButtonRef}
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              aria-label={t("gallery.close")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
              aria-label={t("gallery.previous")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
              aria-label={t("gallery.next")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <motion.img
              key={lightboxIndex}
              src={galleryPhotos[lightboxIndex].src}
              alt={galleryPhotos[lightboxIndex].alt}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="max-h-[85vh] max-w-5xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white/70">
              {t("gallery.photo_of", {
                current: lightboxIndex + 1,
                total: galleryPhotos.length,
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
