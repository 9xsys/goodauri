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
  email: "booking@example.com", // TODO: Replace with real email
  // Include country code. Leave empty string to hide button.
  whatsapp: "+995599002879",
  telegram: "your_telegram", // TODO: Replace (username without @)

  // ── Location ─────────────────────────────────────────────
  coordinates: {
    lat: 42.4682331,
    lng: 44.4900456,
  },
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2969!2d44.4900456!3d42.4682331!3m2!1i1024!2i768!4f13.1!3m2!1m1!1s0x4044f9db204ff40d%3A0x10ca0aa8303dffe8!5e0!3m2!1sen!2sge",
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
