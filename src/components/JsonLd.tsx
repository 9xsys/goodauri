import { siteConfig } from "@/site-config";

export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    name: siteConfig.propertyName,
    description: siteConfig.shortTagline,
    url: siteConfig.siteUrl,
    image: `${siteConfig.siteUrl}/photos/hero-mountains.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gudauri",
      addressCountry: "GE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.coordinates.lat,
      longitude: siteConfig.coordinates.lng,
    },
    numberOfRooms: siteConfig.bedrooms,
    occupancy: {
      "@type": "QuantitativeValue",
      maxValue: siteConfig.maxGuests,
    },
    checkinTime: siteConfig.checkInTime,
    checkoutTime: siteConfig.checkOutTime,
    amenityFeature: siteConfig.amenities.map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a,
    })),
    sameAs: [
      "https://www.instagram.com/goodauri_/",
      "https://www.booking.com/hotel/ge/goodauri-cosy-appartment.html",
      "https://maps.app.goo.gl/gzAKxbgqnA4Tvg5P8",
    ],
    potentialAction: {
      "@type": "ReserveAction",
      target: "https://www.booking.com/hotel/ge/goodauri-cosy-appartment.html",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
