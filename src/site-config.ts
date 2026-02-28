export const siteConfig = {
  // ── Property details ─────────────────────────────────────
  propertyName: "Gudauri Mountain Apartment",
  // TODO: Replace with your actual tagline
  shortTagline: "A quiet base for summer in the Caucasus",
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
    lat: 42.4578,
    lng: 44.4733,
  },
  // TODO: Replace with your exact Google Maps embed URL or leave as-is
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11876.476896898773!2d44.46!3d42.46!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440d1e1b24ef01%3A0x8e7badf1e4fdb591!2sGudauri!5e0!3m2!1sen!2sge!4v1700000000000",

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
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://gudauri-apartment.vercel.app",
  ogImagePath: "/photos/og-image.jpg",

  // ── Supported locales ────────────────────────────────────
  locales: ["en", "fr", "ka"] as const,
  defaultLocale: "en" as const,
} as const;

export type Locale = (typeof siteConfig.locales)[number];
export type AmenityKey = (typeof siteConfig.amenities)[number];
