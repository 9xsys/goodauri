"use client";

import { useState } from "react";
import type { Locale } from "@/site-config";
import { siteConfig } from "@/site-config";
import Navbar from "@/components/Navbar";
import HeroParallax from "@/components/HeroParallax";
import Gallery from "@/components/Gallery";
import WhyThisPlace from "@/components/WhyThisPlace";
import Amenities from "@/components/Amenities";
import BookingCTA from "@/components/BookingCTA";
import LocationMap from "@/components/LocationMap";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ContactButtons from "@/components/ContactButtons";

export default function Home() {
  const [locale, setLocale] = useState<Locale>(siteConfig.defaultLocale);

  return (
    <>
      <Navbar locale={locale} onLocaleChange={setLocale} />
      <main>
        <HeroParallax locale={locale} />
        <Gallery locale={locale} />
        <WhyThisPlace locale={locale} />
        <Amenities locale={locale} />
        <BookingCTA locale={locale} />
        <LocationMap locale={locale} />
        <Reviews locale={locale} />
        <FAQ locale={locale} />
      </main>
      <Footer locale={locale} onLocaleChange={setLocale} />
      <ContactButtons locale={locale} />
    </>
  );
}
