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

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What time is check-in and check-out?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Check-in from 14:00, check-out by 11:00. Flexible timing can be arranged if the apartment is free.",
        },
      },
      {
        "@type": "Question",
        name: "Is it cold at night in summer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Evenings drop to 8–12°C. The apartment has central heating and extra blankets. Bring a light jacket for outside.",
        },
      },
      {
        "@type": "Question",
        name: "Where can I buy groceries?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "There are small shops in Gudauri village. For a bigger selection, stop at a supermarket in Pasanauri or Tbilisi on the way up.",
        },
      },
      {
        "@type": "Question",
        name: "How do I get the keys?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We use a key lockbox for self check-in. You'll receive the code and detailed instructions by email before arrival.",
        },
      },
      {
        "@type": "Question",
        name: "Is parking available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, free parking is available right at the building. No reservation needed.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </>
  );
}
