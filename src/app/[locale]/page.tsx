import { siteConfig, type Locale } from "@/site-config";
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

export function generateStaticParams() {
  return siteConfig.locales.map((locale) => ({ locale }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;

  return (
    <>
      <Navbar locale={locale} />
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
      <Footer locale={locale} />
      <ContactButtons locale={locale} />
    </>
  );
}
