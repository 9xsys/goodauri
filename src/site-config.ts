export const siteConfig = {
  // ── Property details ─────────────────────────────────────
  propertyName: "Goodauri Mountain Apartment",
  shortTagline: "A cosy apartment in the Georgian mountains",
  maxGuests: 4,
  bedrooms: 1,
  beds: 1,
  sofaBeds: 1,
  bathrooms: 1,
  // TODO: Replace with actual area
  areaSqm: 45,

  // ── Booking rules ────────────────────────────────────────
  minNights: 3,
  checkInTime: "14:00",
  checkOutTime: "11:00",
  responseTimeHours: 24,
  // TODO: Set your nightly rate
  pricePerNight: 35,
  currency: "USD",

  // ── Contact ──────────────────────────────────────────────
  email: "" as string,
  whatsapp: "+995599002879",
  telegram: "" as string,

  // ── Location ─────────────────────────────────────────────
  coordinates: {
    lat: 42.4682331,
    lng: 44.4900456,
  },
  mapEmbedUrl:
    "https://maps.google.com/maps?q=42.4682331,44.4900456&z=16&output=embed",
  mapLink: "https://maps.app.goo.gl/gzAKxbgqnA4Tvg5P8",

  // ── Amenities (icon keys map to component icons) ─────────
  amenities: [
    "kitchen",
    "washer",
    "heating",
    "hotWater",
    "parking",
    "mountainView",
    "balcony",
    "tv",
    "elevator",
    "airConditioning",
  ] as const,

  // ── SEO ──────────────────────────────────────────────────
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://goodauri.com",
  ogImagePath: "/photos/og-image.jpg",

  // ── Supported locales ────────────────────────────────────
  locales: ["en", "fr", "ka"] as const,
  defaultLocale: "en" as const,
} as const;

export type Locale = (typeof siteConfig.locales)[number];
export type AmenityKey = (typeof siteConfig.amenities)[number];
